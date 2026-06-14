import { and, eq, lte, gte, ne } from 'drizzle-orm';
import type { DB } from '../db/client';
import { flights, type Flight } from '../db/schema';

export interface ConflictQuery {
  standId: string;
  blockStart: Date;
  blockEnd: Date;
  excludeFlightId?: string;
}

/**
 * Returns the set of existing flights that conflict with the proposed window.
 *
 * Two flights on the same stand conflict when their occupied windows overlap.
 * Stands are exclusive on [start, end] (closed). A flight ending at 11:00 and
 * another starting at 11:00 are considered conflicting under this rule.
 */
export async function findConflicts(db: DB, q: ConflictQuery): Promise<Flight[]> {
  const conditions = [
    eq(flights.standId, q.standId),
    // Closed-closed overlap: existingStart <= proposedEnd AND existingEnd >= proposedStart.
    lte(flights.blockStart, q.blockEnd),
    gte(flights.blockEnd, q.blockStart),
  ];

  if (q.excludeFlightId) {
    conditions.push(ne(flights.id, q.excludeFlightId));
  }

  return db
    .select()
    .from(flights)
    .where(and(...conditions));
}
