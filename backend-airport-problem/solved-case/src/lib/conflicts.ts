import { and, eq, lt, gt, ne, inArray } from 'drizzle-orm';
import type { DB } from '../db/client';
import {
  flightsActive,
  stands,
  standUnavailability,
  type Flight,
  type StandUnavailability,
} from '../db/schema';

export interface ConflictQuery {
  standId: string;
  blockStart: Date;
  blockEnd: Date;
  excludeFlightId?: string;
}

export interface AllocationConflicts {
  flightConflicts: Flight[];
  unavailabilities: StandUnavailability[];
}

/**
 * Returns the set of existing flights that conflict with the proposed window
 * on the given stand. Single-stand check — does not expand MARS groups.
 *
 * Stand occupancy is half-open `[blockStart, blockEnd)` (domain rule 1) — a
 * flight ending at T and another starting at T do not conflict. Reads from
 * `flights_active`, which already excludes soft-deleted rows (domain rule 4).
 */
export async function findConflicts(db: DB, q: ConflictQuery): Promise<Flight[]> {
  const conditions = [
    eq(flightsActive.standId, q.standId),
    lt(flightsActive.blockStart, q.blockEnd),
    gt(flightsActive.blockEnd, q.blockStart),
  ];

  if (q.excludeFlightId) {
    conditions.push(ne(flightsActive.id, q.excludeFlightId));
  }

  return db
    .select()
    .from(flightsActive)
    .where(and(...conditions));
}

/**
 * Resolves the MARS exclusion set for `standId` (domain rule 2).
 *
 * The rule is "parent ↔ any child are mutually exclusive" — siblings are NOT.
 * Two narrow-bodies on different child stands is the legal MARS configuration,
 * so a flight on `A1L` must not block a request for `A1R`.
 *
 *   - parent / standalone → self + all of its children
 *   - child stand         → self + parent only
 */
async function resolveMarsGroup(db: DB, standId: string): Promise<string[]> {
  const [self] = await db.select().from(stands).where(eq(stands.id, standId));
  if (!self) return [standId];

  if (self.parentStandId === null) {
    const children = await db
      .select({ id: stands.id })
      .from(stands)
      .where(eq(stands.parentStandId, self.id));
    return [self.id, ...children.map((c) => c.id)];
  }

  return [self.id, self.parentStandId];
}

/**
 * Full conflict check for a proposed allocation. Returns flights AND planned
 * stand closures that would clash with the window, expanded across the MARS
 * exclusion group so a wide-body on the parent and a narrow-body on a child
 * are correctly seen as conflicting (domain rules 2, 3, 5).
 */
export async function findAllocationConflicts(
  db: DB,
  q: ConflictQuery,
): Promise<AllocationConflicts> {
  const groupIds = await resolveMarsGroup(db, q.standId);

  const flightConditions = [
    inArray(flightsActive.standId, groupIds),
    lt(flightsActive.blockStart, q.blockEnd),
    gt(flightsActive.blockEnd, q.blockStart),
  ];
  if (q.excludeFlightId) {
    flightConditions.push(ne(flightsActive.id, q.excludeFlightId));
  }

  const [flightConflicts, unavailabilities] = await Promise.all([
    db
      .select()
      .from(flightsActive)
      .where(and(...flightConditions)),
    db
      .select()
      .from(standUnavailability)
      .where(
        and(
          inArray(standUnavailability.standId, groupIds),
          lt(standUnavailability.startAt, q.blockEnd),
          gt(standUnavailability.endAt, q.blockStart),
        ),
      ),
  ]);

  return { flightConflicts, unavailabilities };
}
