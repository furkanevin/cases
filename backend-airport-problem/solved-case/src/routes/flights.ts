import { Hono } from 'hono';
import { z } from 'zod';
import { eq, isNull } from 'drizzle-orm';
import { db } from '../db/client';
import { flights, standUnavailability, type NewFlight } from '../db/schema';
import { parseIsoToUtc, formatUtcAsIso } from '../lib/time';
import { findConflicts, findAllocationConflicts } from '../lib/conflicts';
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

function serializeUnavailability(u: typeof standUnavailability.$inferSelect) {
  return {
    id: u.id,
    standId: u.standId,
    startAt: formatUtcAsIso(u.startAt),
    endAt: formatUtcAsIso(u.endAt),
    reason: u.reason,
  };
}

const CheckAllocationBody = z.object({
  standId: z.string().min(1),
  blockStart: z.string(),
  blockEnd: z.string(),
  excludeFlightId: z.string().optional(),
});

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

flightsRoutes.post('/check-allocation', async (c) => {
  const parsed = CheckAllocationBody.safeParse(await c.req.json());
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

  const body = parsed.data;
  const blockStart = parseIsoToUtc(body.blockStart);
  const blockEnd = parseIsoToUtc(body.blockEnd);
  if (!(blockStart < blockEnd)) {
    return c.json({ error: 'blockStart must be before blockEnd' }, 400);
  }

  const { flightConflicts, unavailabilities } = await findAllocationConflicts(db, {
    standId: body.standId,
    blockStart,
    blockEnd,
    excludeFlightId: body.excludeFlightId,
  });

  return c.json(
    {
      flightConflicts: flightConflicts.map(serialize),
      unavailabilities: unavailabilities.map(serializeUnavailability),
    },
    200,
  );
});

flightsRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id');
  await db.update(flights).set({ deletedAt: new Date() }).where(eq(flights.id, id));
  return c.body(null, 204);
});
