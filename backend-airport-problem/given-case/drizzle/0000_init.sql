CREATE TYPE flight_type AS ENUM ('arrival', 'departure', 'towing');

CREATE TABLE aircrafts (
  id TEXT PRIMARY KEY,
  registration TEXT NOT NULL UNIQUE,
  wake_category TEXT NOT NULL
);

CREATE TABLE stands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  parent_stand_id TEXT REFERENCES stands(id),
  max_wake_category TEXT NOT NULL
);

CREATE TABLE flights (
  id TEXT PRIMARY KEY,
  flight_number TEXT NOT NULL,
  flight_type flight_type NOT NULL,
  aircraft_id TEXT NOT NULL REFERENCES aircrafts(id),
  stand_id TEXT NOT NULL REFERENCES stands(id),
  block_start TIMESTAMP NOT NULL,
  block_end TIMESTAMP NOT NULL,
  deleted_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX flights_stand_block_idx ON flights (stand_id, block_start, block_end);
CREATE INDEX flights_deleted_at_idx ON flights (deleted_at);

-- "Active" view used by code paths that should never see soft-deleted rows.
-- (Conflict detection is one such code path. Hint: prefer this view over filtering manually.)
CREATE VIEW flights_active AS
  SELECT * FROM flights WHERE deleted_at IS NULL;

-- Planned stand closures (e.g. maintenance, repainting). A stand is unavailable
-- for the half-open interval [start_at, end_at).
CREATE TABLE stand_unavailability (
  id TEXT PRIMARY KEY,
  stand_id TEXT NOT NULL REFERENCES stands(id),
  start_at TIMESTAMP NOT NULL,
  end_at TIMESTAMP NOT NULL,
  reason TEXT NOT NULL
);

CREATE INDEX stand_unavailability_stand_window_idx
  ON stand_unavailability (stand_id, start_at, end_at);
