import { describe, it, expect, beforeAll } from 'vitest';
import { createApp } from '../src/app';
import { db } from '../src/db/client';
import { flights, stands, aircrafts, standUnavailability } from '../src/db/schema';

const app = createApp();
const T = (iso: string) => new Date(iso + 'Z');

type CheckAllocationBody = {
  standId: string;
  blockStart: string;
  blockEnd: string;
  excludeFlightId?: string;
};

type CheckAllocationResponse = {
  flightConflicts: Array<{ id: string; standId: string }>;
  unavailabilities: Array<{ id: string; standId: string }>;
};

async function check(body: CheckAllocationBody): Promise<{
  status: number;
  json: CheckAllocationResponse;
}> {
  const res = await app.request('/flights/check-allocation', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as CheckAllocationResponse;
  return { status: res.status, json };
}

beforeAll(async () => {
  await db.delete(standUnavailability);
  await db.delete(flights);
  await db.delete(stands);
  await db.delete(aircrafts);

  await db.insert(aircrafts).values([
    { id: 'cac-1', registration: 'C-AAA', wakeCategory: 'narrow' },
    { id: 'cac-2', registration: 'C-BBB', wakeCategory: 'narrow' },
    { id: 'cac-3', registration: 'C-WID', wakeCategory: 'wide' },
  ]);

  // Standalone stand + a MARS group (parent CMA1, children CMA1L, CMA1R).
  await db.insert(stands).values([
    { id: 'CS1',   name: 'CS1',   parentStandId: null,    maxWakeCategory: 'narrow' },
    { id: 'CMA1',  name: 'CMA1',  parentStandId: null,    maxWakeCategory: 'wide'   },
    { id: 'CMA1L', name: 'CMA1L', parentStandId: 'CMA1',  maxWakeCategory: 'narrow' },
    { id: 'CMA1R', name: 'CMA1R', parentStandId: 'CMA1',  maxWakeCategory: 'narrow' },
  ]);

  await db.insert(flights).values([
    // Plain occupant on CS1: 10:00–11:00.
    {
      id: 'cf-cs1',
      flightNumber: 'CC100',
      flightType: 'arrival',
      aircraftId: 'cac-1',
      standId: 'CS1',
      blockStart: T('2026-05-10T10:00:00'),
      blockEnd:   T('2026-05-10T11:00:00'),
    },
    // Soft-deleted on CS1 — must be ignored.
    {
      id: 'cf-cs1-deleted',
      flightNumber: 'CC900',
      flightType: 'arrival',
      aircraftId: 'cac-1',
      standId: 'CS1',
      blockStart: T('2026-05-10T13:00:00'),
      blockEnd:   T('2026-05-10T14:00:00'),
      deletedAt:  T('2026-05-09T00:00:00'),
    },
    // Towing on CS1 — must count as occupying.
    {
      id: 'cf-cs1-tow',
      flightNumber: 'TOW01',
      flightType: 'towing',
      aircraftId: 'cac-2',
      standId: 'CS1',
      blockStart: T('2026-05-10T15:00:00'),
      blockEnd:   T('2026-05-10T15:30:00'),
    },
    // Wide-body on parent CMA1: 09:00–10:00.
    {
      id: 'cf-mars-parent',
      flightNumber: 'CC500',
      flightType: 'arrival',
      aircraftId: 'cac-3',
      standId: 'CMA1',
      blockStart: T('2026-05-10T09:00:00'),
      blockEnd:   T('2026-05-10T10:00:00'),
    },
    // Narrow-body on child CMA1L: 12:00–13:00.
    {
      id: 'cf-mars-child',
      flightNumber: 'CC600',
      flightType: 'arrival',
      aircraftId: 'cac-1',
      standId: 'CMA1L',
      blockStart: T('2026-05-10T12:00:00'),
      blockEnd:   T('2026-05-10T13:00:00'),
    },
  ]);

  // Planned closure on CMA1R: 16:00–18:00.
  await db.insert(standUnavailability).values([
    {
      id: 'csu-1',
      standId: 'CMA1R',
      startAt: T('2026-05-10T16:00:00'),
      endAt:   T('2026-05-10T18:00:00'),
      reason: 'repaint',
    },
  ]);
});

describe('POST /flights/check-allocation', () => {
  it('returns no conflicts when the stand is free', async () => {
    const { status, json } = await check({
      standId: 'CS1',
      blockStart: T('2026-05-10T20:00:00').toISOString(),
      blockEnd:   T('2026-05-10T21:00:00').toISOString(),
    });
    expect(status).toBe(200);
    expect(json.flightConflicts).toEqual([]);
    expect(json.unavailabilities).toEqual([]);
  });

  it('flags a flight overlapping on the same stand', async () => {
    const { json } = await check({
      standId: 'CS1',
      blockStart: T('2026-05-10T10:30:00').toISOString(),
      blockEnd:   T('2026-05-10T11:30:00').toISOString(),
    });
    expect(json.flightConflicts.map((f) => f.id)).toEqual(['cf-cs1']);
  });

  it('does not flag back-to-back flights (half-open boundary)', async () => {
    const { json } = await check({
      standId: 'CS1',
      blockStart: T('2026-05-10T11:00:00').toISOString(),
      blockEnd:   T('2026-05-10T12:00:00').toISOString(),
    });
    expect(json.flightConflicts).toEqual([]);
  });

  it('ignores soft-deleted flights (domain rule 4)', async () => {
    const { json } = await check({
      standId: 'CS1',
      blockStart: T('2026-05-10T13:15:00').toISOString(),
      blockEnd:   T('2026-05-10T13:45:00').toISOString(),
    });
    expect(json.flightConflicts).toEqual([]);
  });

  it('counts towing flights as conflicts (domain rule 3)', async () => {
    const { json } = await check({
      standId: 'CS1',
      blockStart: T('2026-05-10T15:10:00').toISOString(),
      blockEnd:   T('2026-05-10T15:20:00').toISOString(),
    });
    expect(json.flightConflicts.map((f) => f.id)).toEqual(['cf-cs1-tow']);
  });

  it('respects excludeFlightId for in-place updates', async () => {
    const { json } = await check({
      standId: 'CS1',
      blockStart: T('2026-05-10T10:30:00').toISOString(),
      blockEnd:   T('2026-05-10T11:30:00').toISOString(),
      excludeFlightId: 'cf-cs1',
    });
    expect(json.flightConflicts).toEqual([]);
  });

  describe('MARS rules (domain rule 2)', () => {
    it('parent occupied blocks the child', async () => {
      const { json } = await check({
        standId: 'CMA1L',
        blockStart: T('2026-05-10T09:30:00').toISOString(),
        blockEnd:   T('2026-05-10T09:45:00').toISOString(),
      });
      expect(json.flightConflicts.map((f) => f.id)).toEqual(['cf-mars-parent']);
    });

    it('child occupied blocks the parent', async () => {
      const { json } = await check({
        standId: 'CMA1',
        blockStart: T('2026-05-10T12:15:00').toISOString(),
        blockEnd:   T('2026-05-10T12:45:00').toISOString(),
      });
      expect(json.flightConflicts.map((f) => f.id)).toEqual(['cf-mars-child']);
    });

    it('child occupied does not block the sibling', async () => {
      // CMA1L is occupied 12:00–13:00; CMA1R should still be free.
      // (Two narrow-bodies on different children is the legal MARS configuration.)
      const { json } = await check({
        standId: 'CMA1R',
        blockStart: T('2026-05-10T12:15:00').toISOString(),
        blockEnd:   T('2026-05-10T12:45:00').toISOString(),
      });
      expect(json.flightConflicts).toEqual([]);
    });
  });

  describe('Stand unavailability (domain rule 5)', () => {
    it('returns overlapping unavailability in its own field', async () => {
      const { json } = await check({
        standId: 'CMA1R',
        blockStart: T('2026-05-10T16:30:00').toISOString(),
        blockEnd:   T('2026-05-10T17:00:00').toISOString(),
      });
      expect(json.flightConflicts).toEqual([]);
      expect(json.unavailabilities.map((u) => u.id)).toEqual(['csu-1']);
    });

    it("a child's closure surfaces when checking the parent (MARS)", async () => {
      const { json } = await check({
        standId: 'CMA1',
        blockStart: T('2026-05-10T16:30:00').toISOString(),
        blockEnd:   T('2026-05-10T17:00:00').toISOString(),
      });
      expect(json.unavailabilities.map((u) => u.id)).toEqual(['csu-1']);
    });

    it('does not flag a closure that ends exactly when the window starts', async () => {
      // Closure on CMA1R is [16:00, 18:00). A request starting at 18:00 is fine.
      const { json } = await check({
        standId: 'CMA1R',
        blockStart: T('2026-05-10T18:00:00').toISOString(),
        blockEnd:   T('2026-05-10T19:00:00').toISOString(),
      });
      expect(json.unavailabilities).toEqual([]);
    });
  });

  describe('Validation', () => {
    it('returns 400 when blockEnd is not after blockStart', async () => {
      const res = await app.request('/flights/check-allocation', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          standId: 'CS1',
          blockStart: T('2026-05-10T10:00:00').toISOString(),
          blockEnd:   T('2026-05-10T10:00:00').toISOString(),
        }),
      });
      expect(res.status).toBe(400);
    });

    it('returns 400 when standId is missing', async () => {
      const res = await app.request('/flights/check-allocation', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          blockStart: T('2026-05-10T10:00:00').toISOString(),
          blockEnd:   T('2026-05-10T11:00:00').toISOString(),
        }),
      });
      expect(res.status).toBe(400);
    });
  });
});
