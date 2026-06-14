import { describe, it, expect, beforeAll } from 'vitest';
import { db } from '../src/db/client';
import { flights, stands, aircrafts, standUnavailability } from '../src/db/schema';
import { findConflicts } from '../src/lib/conflicts';

const T = (iso: string) => new Date(iso + 'Z');

beforeAll(async () => {
  await db.delete(standUnavailability);
  await db.delete(flights);
  await db.delete(stands);
  await db.delete(aircrafts);

  await db.insert(aircrafts).values([
    { id: 'tac-1', registration: 'T-AAA', wakeCategory: 'narrow' },
    { id: 'tac-2', registration: 'T-BBB', wakeCategory: 'narrow' },
  ]);

  await db.insert(stands).values([
    { id: 'TS1', name: 'TS1', parentStandId: null, maxWakeCategory: 'narrow' },
  ]);

  await db.insert(flights).values([
    {
      id: 'tf-1',
      flightNumber: 'T100',
      flightType: 'arrival',
      aircraftId: 'tac-1',
      standId: 'TS1',
      blockStart: T('2026-05-03T10:00:00'),
      blockEnd:   T('2026-05-03T11:00:00'),
    },
    // Soft-deleted flight on the same stand at a different window — must be
    // ignored entirely by findConflicts (domain rule 4).
    {
      id: 'tf-deleted',
      flightNumber: 'T999',
      flightType: 'arrival',
      aircraftId: 'tac-2',
      standId: 'TS1',
      blockStart: T('2026-05-03T06:00:00'),
      blockEnd:   T('2026-05-03T07:00:00'),
      deletedAt:  T('2026-05-02T00:00:00'),
    },
  ]);
});

describe('findConflicts', () => {
  it('detects a clear overlap on the same stand', async () => {
    const result = await findConflicts(db, {
      standId: 'TS1',
      blockStart: T('2026-05-03T10:30:00'),
      blockEnd:   T('2026-05-03T11:30:00'),
    });
    expect(result.map((r) => r.id)).toEqual(['tf-1']);
  });

  it('returns no conflicts when the proposed window is on a different stand', async () => {
    const result = await findConflicts(db, {
      standId: 'OTHER',
      blockStart: T('2026-05-03T10:30:00'),
      blockEnd:   T('2026-05-03T11:30:00'),
    });
    expect(result).toEqual([]);
  });

  it('does not flag back-to-back flights as conflicting (one ends at 11:00, next starts at 11:00)', async () => {
    // This is the FAILING test that pinpoints the bug. The current implementation
    // uses closed-closed comparison and incorrectly flags this case.
    const result = await findConflicts(db, {
      standId: 'TS1',
      blockStart: T('2026-05-03T11:00:00'),
      blockEnd:   T('2026-05-03T12:00:00'),
    });
    expect(result).toEqual([]);
  });

  it('respects excludeFlightId (used when validating an in-flight UPDATE)', async () => {
    const result = await findConflicts(db, {
      standId: 'TS1',
      blockStart: T('2026-05-03T10:30:00'),
      blockEnd:   T('2026-05-03T11:30:00'),
      excludeFlightId: 'tf-1',
    });
    expect(result).toEqual([]);
  });

  it('does not return soft-deleted flights (domain rule 4)', async () => {
    // tf-deleted occupies TS1 at 06:00–07:00 but has deletedAt set.
    // The current implementation queries the `flights` table directly
    // and therefore returns soft-deleted rows. This test pinpoints the
    // soft-delete bug — fix it without breaking the other tests.
    const result = await findConflicts(db, {
      standId: 'TS1',
      blockStart: T('2026-05-03T06:30:00'),
      blockEnd:   T('2026-05-03T06:45:00'),
    });
    expect(result).toEqual([]);
  });
});
