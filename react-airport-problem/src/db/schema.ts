import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  pgView,
  type AnyPgColumn,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const flightTypeEnum = pgEnum('flight_type', ['arrival', 'departure', 'towing']);

export const aircrafts = pgTable('aircrafts', {
  id: text('id').primaryKey(),
  registration: text('registration').notNull().unique(),
  wakeCategory: text('wake_category').notNull(), // 'narrow' | 'wide'
});

export const stands = pgTable('stands', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  // MARS support: a parent wide-body stand and its narrow-body sub-stands are mutually exclusive.
  parentStandId: text('parent_stand_id').references((): AnyPgColumn => stands.id),
  maxWakeCategory: text('max_wake_category').notNull(), // 'narrow' | 'wide'
});

export const flights = pgTable('flights', {
  id: text('id').primaryKey(),
  flightNumber: text('flight_number').notNull(),
  flightType: flightTypeEnum('flight_type').notNull(),
  aircraftId: text('aircraft_id')
    .notNull()
    .references(() => aircrafts.id),
  standId: text('stand_id')
    .notNull()
    .references(() => stands.id),
  blockStart: timestamp('block_start', { withTimezone: false }).notNull(),
  blockEnd: timestamp('block_end', { withTimezone: false }).notNull(),
  deletedAt: timestamp('deleted_at', { withTimezone: false }),
  createdAt: timestamp('created_at', { withTimezone: false }).notNull().defaultNow(),
});

// Reusable "active" view — soft-deleted rows excluded.
export const flightsActive = pgView('flights_active').as((qb) =>
  qb.select().from(flights).where(sql`${flights.deletedAt} IS NULL`),
);

// Planned stand closures (e.g. maintenance, repainting). A stand is unavailable
// for the half-open interval [start_at, end_at). These also occupy the stand
// for conflict-detection purposes.
export const standUnavailability = pgTable('stand_unavailability', {
  id: text('id').primaryKey(),
  standId: text('stand_id')
    .notNull()
    .references(() => stands.id),
  startAt: timestamp('start_at', { withTimezone: false }).notNull(),
  endAt: timestamp('end_at', { withTimezone: false }).notNull(),
  reason: text('reason').notNull(),
});

export type Flight = typeof flights.$inferSelect;
export type NewFlight = typeof flights.$inferInsert;
export type Stand = typeof stands.$inferSelect;
export type Aircraft = typeof aircrafts.$inferSelect;
export type StandUnavailability = typeof standUnavailability.$inferSelect;
