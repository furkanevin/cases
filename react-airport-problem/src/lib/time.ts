/**
 * Time helpers.
 *
 * NOTE: This service receives ISO-8601 timestamps from the API and stores them
 * as `timestamp without time zone` in the database. All operational times are
 * Asia/Singapore (UTC+8, no DST). The DB stores UTC.
 */

// Parses an ISO-8601 timestamp from the API and returns a Date in UTC.
export function parseIsoToUtc(input: string): Date {
  return new Date(input);
}

// Formats a UTC Date for API output as ISO-8601.
export function formatUtcAsIso(d: Date): string {
  return d.toISOString();
}
