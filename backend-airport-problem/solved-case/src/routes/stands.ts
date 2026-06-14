import { Hono } from 'hono';
import { and, eq, gte, lte, ne } from 'drizzle-orm';
import { db } from '../db/client';
import { stands, flights } from '../db/schema';
import { parseIsoToUtc } from '../lib/time';

export const standsRoutes = new Hono();

standsRoutes.get('/', async (c) => {
  const rows = await db.select().from(stands);
  return c.json({ stands: rows });
});

// Returns the total occupied minutes for a stand within a window.
// We exclude towing flights here — they're short, numerous, and noisy in the
// utilization chart that consumes this endpoint.
standsRoutes.get('/:id/utilization', async (c) => {
  const standId = c.req.param('id');
  const fromIso = c.req.query('from');
  const toIso = c.req.query('to');
  if (!fromIso || !toIso) return c.json({ error: 'from and to required' }, 400);

  const from = parseIsoToUtc(fromIso);
  const to = parseIsoToUtc(toIso);

  const rows = await db
    .select()
    .from(flights)
    .where(
      and(
        eq(flights.standId, standId),
        gte(flights.blockEnd, from),
        lte(flights.blockStart, to),
        ne(flights.flightType, 'towing'),
      ),
    );

  const minutes = rows.reduce(
    (sum, f) =>
      sum +
      Math.max(
        0,
        (Math.min(f.blockEnd.getTime(), to.getTime()) -
          Math.max(f.blockStart.getTime(), from.getTime())) /
          60000,
      ),
    0,
  );
  return c.json({ standId, from: fromIso, to: toIso, occupiedMinutes: minutes });
});
