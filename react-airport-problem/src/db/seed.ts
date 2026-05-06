import { db, sqlClient } from './client';
import { aircrafts, stands, flights, standUnavailability } from './schema';

// All times are stored as UTC (no offset). Operational rule: API I/O is in
// Asia/Singapore (UTC+8, no DST). For seed clarity these are written as the
// UTC instants directly; do not infer a local time from them.
const T = (iso: string) => new Date(iso + 'Z');

async function seed() {
  await db.delete(standUnavailability);
  await db.delete(flights);
  await db.delete(stands);
  await db.delete(aircrafts);

  await db.insert(aircrafts).values([
    { id: 'ac-001', registration: '9V-AAA', wakeCategory: 'narrow' },
    { id: 'ac-002', registration: '9V-AAB', wakeCategory: 'narrow' },
    { id: 'ac-003', registration: '9V-WID', wakeCategory: 'wide' },
    { id: 'ac-004', registration: '9V-TOW', wakeCategory: 'narrow' },
  ]);

  await db.insert(stands).values([
    // MARS group: parent A1 (wide-body) with two sub-stands A1L and A1R (narrow-body each).
    // Either the parent is occupied by ONE wide-body, or up to TWO narrow-bodies on the children.
    { id: 'A1',  name: 'A1',  parentStandId: null,  maxWakeCategory: 'wide' },
    { id: 'A1L', name: 'A1L', parentStandId: 'A1', maxWakeCategory: 'narrow' },
    { id: 'A1R', name: 'A1R', parentStandId: 'A1', maxWakeCategory: 'narrow' },
    // Standalone stands.
    { id: 'B2',  name: 'B2',  parentStandId: null,  maxWakeCategory: 'narrow' },
    { id: 'B3',  name: 'B3',  parentStandId: null,  maxWakeCategory: 'narrow' },
  ]);

  await db.insert(flights).values([
    // Pair on B2 — back-to-back: one ends 11:00, next starts 11:00. Should NOT conflict.
    {
      id: 'fl-back-1',
      flightNumber: 'AC100',
      flightType: 'arrival',
      aircraftId: 'ac-001',
      standId: 'B2',
      blockStart: T('2026-05-03T10:00:00'),
      blockEnd:   T('2026-05-03T11:00:00'),
    },
    {
      id: 'fl-back-2',
      flightNumber: 'AC101',
      flightType: 'departure',
      aircraftId: 'ac-002',
      standId: 'B2',
      blockStart: T('2026-05-03T11:00:00'),
      blockEnd:   T('2026-05-03T12:00:00'),
    },

    // Soft-deleted flight on B3 — must NOT count as a conflict.
    {
      id: 'fl-deleted',
      flightNumber: 'AC900',
      flightType: 'arrival',
      aircraftId: 'ac-001',
      standId: 'B3',
      blockStart: T('2026-05-03T10:00:00'),
      blockEnd:   T('2026-05-03T12:00:00'),
      deletedAt:  T('2026-05-02T08:00:00'),
    },

    // MARS exclusivity: a wide-body parked on parent A1 from 14:00 to 16:00.
    // A narrow-body trying to park on A1L between 15:00 and 16:00 MUST conflict.
    {
      id: 'fl-mars-parent',
      flightNumber: 'AC500',
      flightType: 'arrival',
      aircraftId: 'ac-003',
      standId: 'A1',
      blockStart: T('2026-05-03T14:00:00'),
      blockEnd:   T('2026-05-03T16:00:00'),
    },

    // Towing flight on B2 — counts as occupying the stand. Buggy seed pair above
    // doesn't overlap this; the towing case is exercised by tests instead.
    {
      id: 'fl-tow-1',
      flightNumber: 'TOW01',
      flightType: 'towing',
      aircraftId: 'ac-004',
      standId: 'B2',
      blockStart: T('2026-05-03T13:00:00'),
      blockEnd:   T('2026-05-03T13:20:00'),
    },
  ]);

  // Planned stand closures. A1L is closed for repainting on 2026-05-04 between
  // 08:00 and 18:00. Any allocation request hitting A1L (or its parent A1
  // under MARS rules) in that window must surface this as a conflict.
  await db.insert(standUnavailability).values([
    {
      id: 'su-001',
      standId: 'A1L',
      startAt: T('2026-05-04T08:00:00'),
      endAt:   T('2026-05-04T18:00:00'),
      reason: 'repaint',
    },
  ]);

  console.log('[seed] done');
}

seed()
  .then(() => sqlClient.end())
  .catch(async (e) => {
    console.error(e);
    await sqlClient.end();
    process.exit(1);
  });
