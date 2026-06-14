import { Hono } from 'hono';
import { z } from 'zod';
import { eq, isNull } from 'drizzle-orm';
import { db } from '../db/client';
import { flights, type NewFlight } from '../db/schema';
import { parseIsoToUtc, formatUtcAsIso } from '../lib/time';
import { findConflicts } from '../lib/conflicts';
import { randomUUID } from 'node:crypto';

export const flightsRoutes = new Hono();

const CreateFlightBody = z.object({
  flightNumber: z.string().min(1),
  flightType: z.enum(['arrival', 'departure', 'towing']),
  aircraftId: z.string(),
  standId: z.string(),
  blockStart: z.string(),
  blockEnd: z.string(),
});

function serialize(f: typeof flights.$inferSelect) {
  return {
    id: f.id,
    flightNumber: f.flightNumber,
    flightType: f.flightType,
    aircraftId: f.aircraftId,
    standId: f.standId,
    blockStart: formatUtcAsIso(f.blockStart),
    blockEnd: formatUtcAsIso(f.blockEnd),
  };
}

flightsRoutes.get('/', async (c) => {
  const rows = await db.select().from(flights).where(isNull(flights.deletedAt));
  return c.json({ flights: rows.map(serialize) });
});

flightsRoutes.post('/', async (c) => {
  const parsed = CreateFlightBody.safeParse(await c.req.json());
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

  const body = parsed.data;
  const blockStart = parseIsoToUtc(body.blockStart);
  const blockEnd = parseIsoToUtc(body.blockEnd);

  const conflicts = await findConflicts(db, {
    standId: body.standId,
    blockStart,
    blockEnd,
  });
  if (conflicts.length > 0) {
    return c.json({ error: 'stand_conflict', conflicts: conflicts.map(serialize) }, 409);
  }

  const row: NewFlight = {
    id: randomUUID(),
    flightNumber: body.flightNumber,
    flightType: body.flightType,
    aircraftId: body.aircraftId,
    standId: body.standId,
    blockStart,
    blockEnd,
  };
  const [created] = await db.insert(flights).values(row).returning();
  return c.json(serialize(created!), 201);
});

// FEATURE TO IMPLEMENT — this stub returns 501. The candidate's job is to
// replace it so it satisfies all five domain rules in README.md.
flightsRoutes.post('/check-allocation', (c) =>
  c.json({ error: 'not_implemented' }, 501),
);

flightsRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id');
  await db.update(flights).set({ deletedAt: new Date() }).where(eq(flights.id, id));
  return c.body(null, 204);
});
