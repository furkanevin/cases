# Decisions

> Fill in each section with a short answer (a paragraph each is plenty). We
> will discuss these with you in the interview.

## 1. Boundary semantics

Why do back-to-back flights not conflict? Where in your code is that decided?
What would change if a customer asked for a 5-minute mandatory gap between
consecutive flights on the same stand?

Stand occupancy is `[blockStart, blockEnd)` — half-open. So a flight ending
at 11:00 and one starting at 11:00 don't overlap: at the instant 11:00 the
stand is already free.

The decision lives in `src/lib/conflicts.ts`, in the `lt`/`gt` predicates.
The original code used `lte`/`gte`, which made the boundary inclusive on
both sides and flagged back-to-back flights as conflicting. That was the
bug. I also switched the query from `flights` to the `flights_active` view
so soft-deleted rows are excluded by the schema instead of being filtered
in every caller — the view exists for exactly this reason and the init
SQL has a comment pointing to it.

If a 5-minute gap were ever required, I wouldn't change the overlap check
itself — I'd just widen the proposed window by the gap before passing it
in. Something like padding `q.blockStart` and `q.blockEnd` by 5 minutes on
each side, then running the same `lt`/`gt` query. With `GAP_MIN = 0` the
behaviour collapses back to today's, so it stays a one-line constant and
nothing else has to move.

## 2. MARS stands

How does your code handle MARS stands? Walk through what happens when a
wide-body lands on parent stand `A1` while a narrow-body is already parked
on child stand `A1L`.

`findAllocationConflicts` first calls `resolveMarsGroup(standId)` to expand
the request into the set of stands that share the physical area. The rule
is asymmetric:

- asking about a parent (or standalone) → self + all children
- asking about a child                  → self + parent (siblings excluded)

Two narrow-bodies on `A1L` and `A1R` is the legal MARS configuration, so
siblings must NOT block each other.

For the walkthrough — wide-body proposes `A1` while a narrow-body is parked
on `A1L`:

1. `resolveMarsGroup('A1')` returns `['A1', 'A1L', 'A1R']`.
2. The flight query uses `inArray(standId, [...])` plus the half-open
   overlap predicate, finds the active flight on `A1L`, and returns it in
   `flightConflicts`.
3. The unavailability query runs over the same group; nothing matches.
4. The caller sees a non-empty `flightConflicts` and refuses the booking.

The reverse — child request while parent is occupied — works by the same
mechanism: `resolveMarsGroup('A1L')` returns `['A1L', 'A1']`, the parent's
flight is found.

## 3. Timezones

Where in your code does timezone conversion happen? What breaks if this
service is deployed on a server whose system timezone is not
`Asia/Singapore`?

There is effectively no conversion today. `parseIsoToUtc` is just
`new Date(input)` and `formatUtcAsIso` is `d.toISOString()`. This is
correct only when API clients send ISO-8601 strings that include an offset
(`...+08:00` or `...Z`) — `new Date()` interprets those as absolute UTC
instants regardless of the host timezone.

The trap is naive strings without an offset, e.g. `"2026-05-04T08:00:00"`.
`new Date()` then resolves them in the **system local time** of whatever
machine the process is running on. On a UTC server that string becomes
08:00 UTC; on a Singapore server it becomes 00:00 UTC; on a US server
something else again. Same input, different stored instant.

What breaks: a flight a controller booked for "08:00" appears at the wrong
clock time when read back; conflict windows shift by 8 hours; tests pass
locally but production drifts. Two practical fixes — pick one:

1. Reject naive strings at the boundary. Validate with a regex/zod schema
   that requires an offset, or
2. Interpret naive strings explicitly as `Asia/Singapore` using a tz-aware
   library (e.g. `date-fns-tz` `zonedTimeToUtc(input, 'Asia/Singapore')`).

I'd lean on option 1 — it forces the contract instead of guessing for the
client — and document it in the OpenAPI spec.

## 4. Concurrency

Two ops controllers hit `POST /flights/check-allocation` for the same stand
at the same instant, both get a clean result, and both then `POST /flights`.

a. Walk through what your code and the database do today. Be specific about
   *which* statement runs in which order on each connection.

b. If the outcome is wrong, sketch a fix in code (5–20 lines is plenty —
   show the SQL, lock primitive, or constraint you'd add). You don't have
   to wire it in, but the sketch must be concrete enough to compile.

**(a)** Today the system is racy. There is no DB constraint that forbids
two flights overlapping on the same stand, and the read in
`findAllocationConflicts` does not lock anything. So:

```
Conn A:  SELECT … flights_active WHERE stand_id = 'B2' AND … overlap …  → []
Conn B:  SELECT … flights_active WHERE stand_id = 'B2' AND … overlap …  → []
Conn A:  INSERT INTO flights (… stand_id='B2', 10:00–11:00 …)            → ok
Conn B:  INSERT INTO flights (… stand_id='B2', 10:30–11:30 …)            → ok
```

Both inserts succeed and the stand now has two overlapping bookings. This
is the classic TOCTOU race — the world changes between *check* and *use*.
`POST /flights/check-allocation` is read-only and useful as a hint, but it
cannot be the source of truth for the eventual write.

**(b)** The fix has to live where the write happens. The cleanest answer
is a Postgres exclusion constraint, which makes the invariant impossible
to violate at all:

```sql
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE flights ADD CONSTRAINT flights_no_overlap
  EXCLUDE USING gist (
    stand_id WITH =,
    tsrange(block_start, block_end, '[)') WITH &&
  ) WHERE (deleted_at IS NULL);
```

`POST /flights` then catches the unique-violation-style error and maps it
to a 409. No application-side lock needed for the same-stand case.

The constraint does not cover MARS cross-stand exclusion, because EXCLUDE
only sees one row's columns at a time. For that I would wrap the check
plus insert in a transaction holding a per-MARS-group advisory lock so any
other writer queues:

```ts
await db.transaction(async (tx) => {
  const groupIds = await resolveMarsGroup(tx, body.standId);
  const lockKey = groupIds.sort().join('|');
  await tx.execute(sql`SELECT pg_advisory_xact_lock(hashtext(${lockKey}))`);

  const { flightConflicts } = await findAllocationConflicts(tx, { … });
  if (flightConflicts.length > 0) throw new ConflictError();

  await tx.insert(flights).values(row);
});
```

The advisory lock is released at COMMIT, costs ~nothing, and serialises
only the writers that actually share a MARS group — readers of
`/check-allocation` are unaffected.
