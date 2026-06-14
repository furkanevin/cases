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
    { id: 'fac-1', registration: 'F-AAA', wakeCategory: 'narrow' },
  ]);
  await db.insert(stands).values([
    { id: 'FS1', name: 'FS1', parentStandId: null, maxWakeCategory: 'narrow' },
  ]);
});

describe('GET /flights', () => {
  it('returns an array', async () => {
    const res = await app.request('/flights');
    expect(res.status).toBe(200);
    const body = (await res.json()) as { flights: unknown[] };
    expect(Array.isArray(body.flights)).toBe(true);
  });
});

describe('POST /flights', () => {
  it('creates a flight when the stand is free', async () => {
    const res = await app.request('/flights', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        flightNumber: 'F1',
        flightType: 'arrival',
        aircraftId: 'fac-1',
        standId: 'FS1',
        blockStart: T('2026-05-04T08:00:00').toISOString(),
        blockEnd:   T('2026-05-04T09:00:00').toISOString(),
      }),
    });
    expect(res.status).toBe(201);
  });

  it('returns 409 when the stand is occupied at an overlapping time', async () => {
    const res = await app.request('/flights', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        flightNumber: 'F2',
        flightType: 'arrival',
        aircraftId: 'fac-1',
        standId: 'FS1',
        blockStart: T('2026-05-04T08:30:00').toISOString(),
        blockEnd:   T('2026-05-04T09:30:00').toISOString(),
      }),
    });
    expect(res.status).toBe(409);
  });
});

describe('POST /flights/check-allocation (stub)', () => {
  it('responds 501 — this is the endpoint the candidate must implement', async () => {
    const res = await app.request('/flights/check-allocation', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        standId: 'FS1',
        blockStart: T('2026-05-04T10:00:00').toISOString(),
        blockEnd:   T('2026-05-04T11:00:00').toISOString(),
      }),
    });
    expect(res.status).toBe(501);
  });
});
