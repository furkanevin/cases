import { describe, it, expect, beforeAll } from 'vitest';
import { createApp } from '../src/app';
import { db } from '../src/db/client';
import { flights, stands, aircrafts, standUnavailability } from '../src/db/schema';

const app = createApp();
const T = (iso: string) => new Date(iso + 'Z');

beforeAll(async () => {
  await db.delete(standUnavailability);
  await db.delete(flights);
  await db.delete(stands);
  await db.delete(aircrafts);
  await db.insert(aircrafts).values([
    { id: 'sac-1', registration: 'S-AAA', wakeCategory: 'narrow' },
  ]);
  await db.insert(stands).values([
    { id: 'SS1', name: 'SS1', parentStandId: null, maxWakeCategory: 'narrow' },
  ]);
  await db.insert(flights).values([
    {
      id: 'sf-1',
      flightNumber: 'S1',
      flightType: 'arrival',
      aircraftId: 'sac-1',
      standId: 'SS1',
      blockStart: T('2026-05-05T08:00:00'),
      blockEnd:   T('2026-05-05T09:00:00'),
    },
  ]);
});

describe('GET /stands', () => {
  it('returns the seeded stand', async () => {
    const res = await app.request('/stands');
    expect(res.status).toBe(200);
    const body = (await res.json()) as { stands: { id: string }[] };
    expect(body.stands.find((s) => s.id === 'SS1')).toBeTruthy();
  });
});

describe('GET /stands/:id/utilization', () => {
  it('returns 60 minutes occupied for the seeded flight', async () => {
    const from = T('2026-05-05T07:00:00').toISOString();
    const to = T('2026-05-05T10:00:00').toISOString();
    const res = await app.request(
      `/stands/SS1/utilization?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as { occupiedMinutes: number };
    expect(body.occupiedMinutes).toBe(60);
  });
});
