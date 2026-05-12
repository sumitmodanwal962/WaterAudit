"""
Migration script — adds missing columns to existing tables and creates new ones.
Run once: python migrate.py
"""
import os
from sqlalchemy import text
from database import engine

# ── 1. Add missing columns to users ──────────────────────────────────────────
ALTER_USERS = [
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW()",
    "ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW()",
]

# ── 2. Create projects table (IF NOT EXISTS) ─────────────────────────────────
CREATE_PROJECTS = """
CREATE TABLE IF NOT EXISTS projects (
    id                  SERIAL PRIMARY KEY,
    owner_id            INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title               TEXT NOT NULL,
    location            TEXT,
    description         TEXT,
    scope               TEXT,
    project_type        TEXT,
    population          INTEGER,
    capacity            TEXT,
    status              TEXT NOT NULL DEFAULT 'active',
    lead_auditor_name   TEXT,
    lead_auditor_email  TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
"""

# ── 3. Create updated_at trigger for projects ─────────────────────────────────
CREATE_TRIGGER_FN = """
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
"""

CREATE_TRIGGER = """
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'trg_projects_updated_at'
    ) THEN
        CREATE TRIGGER trg_projects_updated_at
        BEFORE UPDATE ON projects
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
END;
$$;
"""

# ── 4. Create data_inputs table (IF NOT EXISTS) ──────────────────────────────
CREATE_DATA_INPUTS = """
CREATE TABLE IF NOT EXISTS data_inputs (
    id                  SERIAL PRIMARY KEY,
    project_id          INTEGER NOT NULL UNIQUE REFERENCES projects(id) ON DELETE CASCADE,
    data_values         JSONB DEFAULT '{}',
    validation_scores   JSONB DEFAULT '{}',
    modal_answers       JSONB DEFAULT '{}',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
"""

CREATE_DATA_INPUT_TRIGGER = """
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'trg_data_inputs_updated_at'
    ) THEN
        CREATE TRIGGER trg_data_inputs_updated_at
        BEFORE UPDATE ON data_inputs
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
END;
$$;
"""

def run_migrations():
    with engine.begin() as conn:
        print("Adding created_at and updated_at to users...")
        for stmt in ALTER_USERS:
            conn.execute(text(stmt))
            print(f"  ✓ OK")

        print("Creating projects table if not exists…")
        conn.execute(text(CREATE_PROJECTS))
        print("  ✓ OK")

        conn.execute(text(CREATE_TRIGGER_FN))
        conn.execute(text(CREATE_TRIGGER))
        print("  ✓ OK")

        print("Creating data_inputs table if not exists…")
        conn.execute(text(CREATE_DATA_INPUTS))
        conn.execute(text(CREATE_DATA_INPUT_TRIGGER))
        print("  ✓ OK")

if __name__ == "__main__":
    run_migrations()
    print("\n✅ Migration complete!")
