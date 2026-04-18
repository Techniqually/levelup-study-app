-- Runs after migrations on `supabase db reset` / `supabase db seed`.
-- This PoC keeps fixtures in migrations where they belong; add INSERTs here
-- only for local-only dev data (never secrets). No-op keeps the CLI quiet.
select 1;
