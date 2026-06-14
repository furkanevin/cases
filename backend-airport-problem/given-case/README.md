# Aerocity International Airport — Stand Allocation Service

> A take-home backend exercise. Plan for **6–10 hours**. Submit by zipping the
> directory and emailing it back, or pushing it to a private repo and sharing
> access. We grade your code, your tests, and your `DECISIONS.md`.

## The Setting

You've joined **AeroOps Ground Services**, the operator that runs ground
operations at the (fictional) **Aerocity International Airport (AIA)**. Ops
controllers can't allocate aircraft stands without conflicts. You are
inheriting a small Node/TypeScript service that another developer started.
Production is in our region; **all operational times are in `Asia/Singapore`
(UTC+8, no daylight savings)**. The database stores UTC.

There are three things to do:

1. **Fix one failing test** (the bug).
2. **Implement one missing endpoint** (the feature).
3. **Fill in `DECISIONS.md`** with answers to four short questions.

We will read your code carefully and discuss your `DECISIONS.md` in the
follow-up interview. **A passing test suite is necessary but not sufficient.**

> **First time working on airport software?** Read [`GLOSSARY.md`](./GLOSSARY.md)
> first — it explains what a *stand* is, what *MARS* means, what *block time*
> is, and the rest of the vocabulary the code uses. It has visuals. It takes
> ~5 minutes to read. **You will not be graded on aviation knowledge** —
> only on what you do with the rules in this README.

## Quick domain primer

If you read nothing else from the glossary, know these five things:

- A **stand** is an aircraft parking spot on the tarmac (not a runway, not a
  passenger gate). Each stand has an ID like `A1` or `B2`.
- A **MARS stand** is one big parking spot that can be used as either *one
  wide-body* (parent stand) or *two narrow-bodies* (sub-stands). Parent and
  children are mutually exclusive.
- **Block time** is the interval `[block_start, block_end)` during which an
  aircraft physically occupies its stand.
- A **towing** flight is an aircraft being moved between stands without
  passengers. It still occupies a stand.
- A **stand unavailability** is a planned closure of a stand (e.g. for
  maintenance). The stand is unusable during that window, just as if a
  flight were parked there.

## Setup

```bash
docker compose up -d            # starts Postgres on :55432
cp .env.example .env
bun install
bun run db:push                 # applies the schema
bun run test                    # one test fails — that's the bug
bun run db:seed                 # loads demo data for manual exploration
bun run dev                     # starts the server on :8080
```

You need **Bun ≥ 1.0** and **Docker**.

> **Note:** the test suite resets the DB between runs (each test file owns its
> fixtures), so always re-run `bun run db:seed` if you want the demo data back
> for manual `curl`-ing.

## Domain Rules

These are the only rules that govern the service. Read them twice.

1. A flight occupies its assigned stand for the half-open interval
   `[blockStart, blockEnd)`. Back-to-back flights — one ends at `T`, the next
   starts at `T` — do **not** conflict.
2. **MARS stands.** Some stands have a parent + two sub-stands. The parent
   accepts one wide-body; the sub-stands each accept one narrow-body. A parent
   stand and any of its sub-stands are mutually exclusive at any given moment.
   The schema models this with `stands.parent_stand_id`.
3. **Towing flights** (`flightType = 'towing'`) occupy the stand and **must**
   be considered when checking for conflicts.
4. **Soft-deleted flights** (`deletedAt IS NOT NULL`) must **not** be
   considered.
5. **Stand unavailability** rows (`stand_unavailability` table) describe
   planned stand closures (maintenance, repainting, etc). They occupy the
   stand for `[start_at, end_at)` and **must** be surfaced as conflicts. They
   are not flights, but they block allocation just like one.
6. All API timestamps are in **`Asia/Singapore`** (UTC+8, no DST). The DB
   stores UTC.

## Task 1 — Fix the failing tests

Run `bun run test`. **Two tests fail.** Both are in `findConflicts`:

- one about back-to-back flights (`10:00–11:00` and `11:00–12:00` on the
  same stand should not conflict),
- one about soft-deleted flights still being returned.

Make both pass. Trust your reading of the code — you may need to change
more than just the line each failing test points at.

## Task 2 — Implement the missing endpoint

Replace the `POST /flights/check-allocation` stub in
`src/routes/flights.ts`.

```
POST /flights/check-allocation
Content-Type: application/json

Body:    { "standId": string,
           "blockStart": ISO-8601,
           "blockEnd": ISO-8601,
           "excludeFlightId"?: string }

200 OK:  { "flightConflicts":   Flight[],
           "unavailabilities":  StandUnavailability[] }
```

It must satisfy **all six** domain rules above. The response separates
flight conflicts from stand unavailabilities so the caller can render them
differently. Add tests that cover the behaviours it depends on. There is
more than one valid implementation strategy — pick one, and explain it in
`DECISIONS.md`.

## Task 3 — Fill in `DECISIONS.md`

The file is empty except for four headings. Answer all four. Concise is good
— a paragraph each is plenty. We will discuss them in the interview, so don't
write anything you can't defend.

## What we look at, in order

1. Does the failing test now pass, and do all tests still pass?
2. Does `POST /flights/check-allocation` satisfy every domain rule, including
   the less-obvious ones?
3. Did you add tests for the cases your code depends on?
4. Are your `DECISIONS.md` answers honest and defensible?
5. Code quality: clarity, naming, type safety, restraint. We don't reward
   over-engineering.

## What we don't grade

- Frontend, deployment, CI, authentication.
- Performance optimisation beyond not writing accidentally quadratic code.
- Comprehensive coverage. Targeted tests beat exhaustive ones.

## A note on AI tools

You may use any tool you like, including AI assistants. We grade what you
ship and what you can explain. If you can't defend a line of code in the
interview, that line of code hurts your application more than it would have
helped you to write it manually.

---

**Submission:** zip the directory (with `node_modules/` excluded) or share a
private repo link. Include the `DECISIONS.md` you filled in.
