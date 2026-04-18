-- subject_entitlements (introduced in 20260417000000_country_class.sql) is now
-- the canonical source for what a user has paid for. The legacy
-- user_entitlements.entitlements text[] column + sync trigger are dropped here.
--
-- Stripe metadata (customer id / last event id / last session id) stays on
-- user_entitlements as a thin sidecar table, since it is per-user not per-subject.
--
-- POC has no production users — no data migration is performed beyond what
-- the structured-entitlements backfill (in 20260417000000) already did.

-- 1. Drop trigger that mirrored array <-> structured rows.
drop trigger if exists trg_subject_ent_sync on public.subject_entitlements;
drop function if exists public.subject_entitlements_after_change();
drop function if exists public.rebuild_user_entitlements_array(uuid);

-- 2. Drop the array column + the now-unused helper that read it.
alter table public.user_entitlements drop column if exists entitlements;

-- 2b. `storage.objects` policy `study_materials_read` (from 20260417031000)
-- still ORs in `user_has_entitlement(...)`. Drop + recreate the policy *before*
-- dropping the function so migration applies cleanly on fresh resets.
drop policy if exists study_materials_read on storage.objects;

create policy study_materials_read on storage.objects
  for select to authenticated
  using (
    bucket_id = 'study-materials'
    and (
      split_part(name, '/', 1) = 'shared'
      or name ~ '^[a-z0-9_-]+/topics-manifest\.json$'
      or name ~ '^[a-z0-9_-]+/infographics-info\.md$'
      or name ~ '^[a-z0-9_-]+/infographics-images\.js$'
      or split_part(name, '/', 2) = 'images'
      or split_part(name, '/', 2) = 'free'
      or exists (
        select 1 from public.profiles p
        where p.user_id = (select auth.uid())
          and public.user_has_subject_entitlement(
                p.user_id,
                p.country_code,
                p.class_code,
                split_part(name, '/', 1)
              )
      )
    )
  );

drop function if exists public.user_has_entitlement(uuid, text);

-- 3. Tighten the columns we keep so they match how the API + webhook now use them.
alter table public.user_entitlements
  alter column updated_at set default now();

-- 4. Add a convenience RPC the client can call to get its full entitlement set
--    in one round-trip (replaces the legacy "select entitlements from user_entitlements").
create or replace function public.my_subject_entitlements()
returns table (
  country_code text,
  class_code   text,
  subject_slug text,
  access_to    timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select country_code, class_code, subject_slug, access_to
  from public.subject_entitlements
  where user_id = (select auth.uid())
    and (access_to is null or access_to > now())
$$;

grant execute on function public.my_subject_entitlements() to authenticated;
