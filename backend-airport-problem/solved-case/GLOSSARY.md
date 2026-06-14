# Domain Glossary

> Read this once before starting. None of the terminology below is something
> we expect you to already know — it's the airport vocabulary your future
> teammates will use day-to-day. Knowing it helps you read the code; it is
> **not** something you'll be graded on.

## The setting in one paragraph

An airport has a row of aircraft parking spots called **stands** along its
terminal building. A stand is just a labelled patch of tarmac with markings,
chocks, and a jet bridge or stair. Aircraft arrive, **block in** to a stand,
sit there for a while (passengers off, cleaning, fuel, passengers on), and
then **block out** to take off. The job of *ground operations* is to make
sure two aircraft never need the same stand at the same time. Your service
helps them check that.

---

## Stand

A parking position for one aircraft. Identified by a code like `A1`, `B2`,
`G14`. A stand has a maximum aircraft size it can fit (a narrow-body like
an Airbus A320, or a wide-body like a Boeing 777).

```
        terminal building
   ╔═══════════════════════════╗
   ║   ║   ║   ║   ║   ║   ║   ║      ← gates (boarding doors)
   ╚═══╩═══╩═══╩═══╩═══╩═══╩═══╝
       │   │   │   │   │   │
     ┌─┘   │   │   │   │   └─┐
     │     │   │   │   │     │        ← apron / tarmac
   ┌─┴─┐ ┌─┴─┐ ┌─┴─┐ ┌─┴─┐ ┌─┴─┐
   │B2 │ │B3 │ │A1 │ │C4 │ │C5 │      ← stands
   │ ✈ │ │   │ │   │ │ ✈ │ │   │
   └───┘ └───┘ └───┘ └───┘ └───┘
```

> **Stand ≠ gate.** A *gate* is the door inside the terminal where
> passengers board; a *stand* is the parking spot on the tarmac outside. In
> small airports they're 1:1; in this assignment we only model stands.

In the database: the `stands` table.

---

## Wake category (narrow-body vs wide-body)

Aircraft are roughly classified by size:

| Category | Examples | Approx. footprint |
|---|---|---|
| **narrow-body** | Airbus A320, Boeing 737 | one aisle, ~150 seats |
| **wide-body** | Boeing 777, Airbus A350 | two aisles, ~300+ seats |

In the schema this is `aircrafts.wake_category` (`'narrow' | 'wide'`) and
`stands.max_wake_category` (the largest category the stand can accept).

For this assignment, treat "wake category" as just "size class". You don't
need to enforce that a wide-body can't be assigned to a narrow-body stand —
only the conflict-detection rules in the README matter.

---

## MARS stand (Multi-Aircraft Ramp System)

A clever bit of airport engineering: **one large stand** that can be used
**either** as a single wide-body parking spot **or** as two side-by-side
narrow-body spots. It's a way to flex capacity without building more tarmac.

The schema models this with a self-foreign-key on `stands.parent_stand_id`:

- `parentStandId = NULL` → top-level stand (regular or MARS parent)
- `parentStandId = 'A1'` → a child sub-stand of MARS parent `A1`

Only **one** of `{ parent, all children }` can be in use at a time:

```
Configuration 1 — ONE wide-body uses the parent stand A1.
┌─────────────────────────────────────┐
│                A1                   │
│    ┌─────────────────────────┐      │
│    │     ✈  (wide-body)      │      │
│    │   Boeing 777 / A350     │      │
│    └─────────────────────────┘      │
└─────────────────────────────────────┘
   children A1L and A1R are NOT usable while A1 is occupied.

Configuration 2 — TWO narrow-bodies use the child stands.
┌─────────────────────────────────────┐
│                A1                   │
│   ┌────────────┐   ┌────────────┐   │
│   │    A1L     │   │    A1R     │   │
│   │  ✈ narrow  │   │  ✈ narrow  │   │
│   │   A320     │   │    737     │   │
│   └────────────┘   └────────────┘   │
└─────────────────────────────────────┘
   parent A1 is NOT usable while either child is occupied.
```

Your conflict detector must respect this mutual exclusion. The seed loads
exactly one MARS group: parent `A1` with children `A1L` and `A1R`.

---

## Block time, block-in, block-out

When an aircraft parks at a stand and the wheels are chocked, that's
**block-in**. When the chocks come off and it pushes back, that's
**block-out**. The interval between is the **block time** — the period the
stand is physically occupied.

In the schema:

| Field | Meaning |
|---|---|
| `flights.block_start` | block-in instant (wheels chocked at the stand) |
| `flights.block_end`   | block-out instant (chocks off, ready to leave) |

A stand is occupied for `[block_start, block_end)` — half-open. Read the
README for why the boundary matters (it's the bug).

```
   stand B2 timeline (one day):

   00:00 ─────────────────────────────────────────── 23:59
                                                     
              ┌──── flight AC100 ─────┐
              │  block_start = 10:00  │
              │  block_end   = 11:00  │
              └───────────────────────┘
                                      ┌──── flight AC101 ─────┐
                                      │  block_start = 11:00  │
                                      │  block_end   = 12:00  │
                                      └───────────────────────┘

   AC100 ends exactly when AC101 starts. Under half-open semantics
   `[start, end)`, this is fine — the stand is free at the instant 11:00.
```

---

## Flight type — arrival, departure, towing

Each `flights` row has a `flight_type`:

- `arrival` — the aircraft just landed and is now occupying the stand.
- `departure` — the aircraft is at the stand and will soon push back.
- `towing` — the aircraft is being **moved between stands without
  passengers**, usually by a tow truck. This happens when an aircraft needs
  to go to maintenance, or when ops needs to free up a stand for a different
  flight. A towing "flight" still parks at a destination stand for some
  duration, so it **still counts** for stand-conflict purposes. (The
  README's domain rule 3 reinforces this. There is a related trap — see
  the comment on `/stands/:id/utilization`.)

---

## Stand unavailability

A planned closure of a stand for reasons other than a flight. Examples:

- repainting the markings,
- jet-bridge maintenance,
- a fuel-spill clean-up,
- a tactical closure to keep a contingency spot free.

In the schema: the `stand_unavailability` table, with columns
`(stand_id, start_at, end_at, reason)`. A stand with an active row in this
table for `[start_at, end_at)` is treated as occupied for the purposes of
allocation, even though no aircraft is parked there. Domain rule 5 in the
README codifies this.

```
   stand A1L on 2026-05-04:

   00:00 ─────────── 08:00 ═══════════════════ 18:00 ─────── 23:59
                                ▒▒▒▒▒▒▒▒▒▒▒▒
                                stand_unavailability
                                reason = 'repaint'
                       ↑                       ↑
                       start_at                end_at

   No flight is parked here, but ops cannot allocate any flight to A1L
   between 08:00 and 18:00. Under MARS rules, this also constrains the
   parent A1 (one wide-body would still need both children free).
```

---

## Ground operations / ops controllers

The humans who allocate stands. They sit at workstations watching a
real-time view of the apron and use tools like the one you're building to
ask questions like "is stand A1 free between 14:00 and 16:00?". They
operate under time pressure — a 30-second-stale answer can cause real
delays.

This matters because: the README mentions "30 ops users hit this endpoint
at peak", which is the prompt for the concurrency question in
`DECISIONS.md`.

---

## Soft delete

Standard backend pattern, included here for completeness: rows are not
physically removed from the database. Instead, a `deleted_at` column is set
to the deletion timestamp. Queries that should ignore deleted rows must
filter on `deleted_at IS NULL`. The schema includes a database `VIEW` that
already does this filtering — see `flights_active`.

---

## Asia/Singapore (UTC+8, no DST)

The fictional Aerocity International Airport sits in the `Asia/Singapore`
IANA timezone. Two practical implications:

- The **API** speaks `Asia/Singapore` (UTC+8). When a controller's screen
  shows "14:00", that's local time at the airport.
- The **DB** stores `timestamp without time zone` columns assumed to be UTC.

Singapore does **not** observe daylight savings, so the offset is a
permanent `+08:00`. You don't need to handle DST transitions, but you do
need to handle the offset correctly.

---

## What does this service actually do?

In one sentence: given an existing set of flights with stand assignments,
detect whether a *proposed* new flight would conflict with any of them on
the same stand (or, for MARS, on the same physical area).

That's the whole job. Everything else in the codebase is plumbing.
