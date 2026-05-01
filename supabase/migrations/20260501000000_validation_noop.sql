-- Validation no-op migration for deployment pipeline test (2026-05-01).
-- Idempotent: creates and immediately drops a temp table. Safe to re-run.
-- Kept in repo as a marker that pipeline was validated end-to-end.

CREATE TABLE IF NOT EXISTS pipeline_validation_temp (id int);
DROP TABLE IF EXISTS pipeline_validation_temp;
