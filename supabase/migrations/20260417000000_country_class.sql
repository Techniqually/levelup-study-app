-- Country / class scaffolding (Singapore O-Level stays the POC; rest are placeholders).
-- Strategy: content paths stay flat (<subject>/...). User profile carries country_code +
-- class_code, and entitlements become structured rows per (country, class, subject).
-- The legacy user_entitlements.entitlements text[] is kept in sync via trigger so existing
-- client code keeps working untouched.

-- 1. Profile: country + class columns (default to the current POC).
alter table public.profiles
  add column if not exists country_code text not null default 'sg',
  add column if not exists class_code   text not null default 'olevel';

alter table public.profiles drop constraint if exists profiles_country_check;
alter table public.profiles
  add constraint profiles_country_check check (country_code ~ '^[a-z]{2,3}$');

alter table public.profiles drop constraint if exists profiles_class_check;
alter table public.profiles
  add constraint profiles_class_check check (class_code ~ '^[a-z0-9_]{2,20}$');

-- Make sure the sign-up trigger still sets defaults explicitly (guards against NULLs).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, display_name, avatar_url, country_code, class_code)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_user_meta_data->>'country_code', 'sg'),
    coalesce(new.raw_user_meta_data->>'class_code',   'olevel')
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

-- 2. Catalog: countries, classes, subjects (one active row per POC combo).
create table if not exists public.catalog_countries (
  country_code text primary key,
  display_name text not null,
  sort_order   int  not null default 0,
  is_active    boolean not null default true
);
alter table public.catalog_countries enable row level security;
drop policy if exists catalog_countries_read on public.catalog_countries;
create policy catalog_countries_read on public.catalog_countries
  for select to anon, authenticated using (true);

insert into public.catalog_countries (country_code, display_name, sort_order, is_active) values
  ('sg', 'Singapore', 1, true),
  ('hk', 'Hong Kong', 2, false),
  ('in', 'India',     3, false),
  ('us', 'USA',       4, false)
on conflict (country_code) do nothing;

create table if not exists public.catalog_classes (
  country_code text not null references public.catalog_countries(country_code) on delete cascade,
  class_code   text not null,
  display_name text not null,
  sort_order   int  not null default 0,
  is_active    boolean not null default true,
  primary key (country_code, class_code)
);
alter table public.catalog_classes enable row level security;
drop policy if exists catalog_classes_read on public.catalog_classes;
create policy catalog_classes_read on public.catalog_classes
  for select to anon, authenticated using (true);

insert into public.catalog_classes (country_code, class_code, display_name, sort_order, is_active) values
  ('sg','p4',     'Primary 4',                 10, false),
  ('sg','p5',     'Primary 5',                 11, false),
  ('sg','p6',     'Primary 6',                 12, false),
  ('sg','psle',   'PSLE',                      13, false),
  ('sg','s1',     'Secondary 1',               20, false),
  ('sg','s2',     'Secondary 2',               21, false),
  ('sg','s3',     'Secondary 3',               22, false),
  ('sg','s4',     'Secondary 4',               23, false),
  ('sg','olevel', 'O-Level',                   30, true),
  ('sg','alevel', 'A-Level',                   40, false)
on conflict (country_code, class_code) do nothing;

create table if not exists public.catalog_subjects (
  country_code text not null,
  class_code   text not null,
  subject_slug text not null,
  display_name text not null,
  sort_order   int  not null default 0,
  is_active    boolean not null default true,
  primary key (country_code, class_code, subject_slug),
  foreign key (country_code, class_code) references public.catalog_classes(country_code, class_code) on delete cascade
);
alter table public.catalog_subjects enable row level security;
drop policy if exists catalog_subjects_read on public.catalog_subjects;
create policy catalog_subjects_read on public.catalog_subjects
  for select to anon, authenticated using (true);

insert into public.catalog_subjects (country_code, class_code, subject_slug, display_name, sort_order, is_active) values
  ('sg','olevel','chemistry','O-Level Chemistry', 1, true),
  ('sg','olevel','physics',  'O-Level Physics',   2, true),
  ('sg','olevel','geography','O-Level Geography', 3, true)
on conflict (country_code, class_code, subject_slug) do nothing;

-- 3. Structured entitlements (row per subject; '__all__' = everything in that country+class).
create table if not exists public.subject_entitlements (
  user_id      uuid not null references auth.users(id) on delete cascade,
  country_code text not null,
  class_code   text not null,
  subject_slug text not null,
  access_from  timestamptz,
  access_to    timestamptz,
  source       text,
  created_at   timestamptz not null default now(),
  primary key (user_id, country_code, class_code, subject_slug)
);
alter table public.subject_entitlements enable row level security;
drop policy if exists subject_ent_select_own on public.subject_entitlements;
create policy subject_ent_select_own on public.subject_entitlements
  for select to authenticated using ((select auth.uid()) = user_id);

-- 4. Backfill from legacy user_entitlements.entitlements array (SG O-Level only).
insert into public.subject_entitlements (user_id, country_code, class_code, subject_slug, access_from, access_to, source)
select
  ue.user_id, 'sg', 'olevel',
  (case ent
    when 'olevel_chem' then 'chemistry'
    when 'olevel_phys' then 'physics'
    when 'olevel_geo'  then 'geography'
    when 'olevel_all'  then '__all__'
  end) as slug,
  ue.access_from, ue.access_to, 'backfill'
from public.user_entitlements ue,
     unnest(ue.entitlements) as ent
where ent in ('olevel_chem','olevel_phys','olevel_geo','olevel_all')
on conflict (user_id, country_code, class_code, subject_slug) do nothing;

-- 5. Structured check helper.
create or replace function public.user_has_subject_entitlement(
  p_user_id uuid, p_country text, p_class text, p_subject text
) returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.subject_entitlements
    where user_id = p_user_id
      and country_code = p_country
      and class_code   = p_class
      and (subject_slug = p_subject or subject_slug = '__all__')
      and (access_to is null or access_to > now())
  );
$$;

-- 6. Keep legacy user_entitlements.entitlements[] in sync from structured rows.
--    (So existing hub/auth-client code reading the array keeps working.)
create or replace function public.rebuild_user_entitlements_array(p_user_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_arr    text[];
  v_max_to timestamptz;
begin
  select
    array_remove(array_agg(distinct (
      case
        when class_code = 'olevel' and subject_slug = 'chemistry' then 'olevel_chem'
        when class_code = 'olevel' and subject_slug = 'physics'   then 'olevel_phys'
        when class_code = 'olevel' and subject_slug = 'geography' then 'olevel_geo'
        when class_code = 'olevel' and subject_slug = '__all__'   then 'olevel_all'
        else null
      end
    )), null),
    max(access_to)
  into v_arr, v_max_to
  from public.subject_entitlements
  where user_id = p_user_id
    and country_code = 'sg';

  insert into public.user_entitlements (user_id, entitlements, access_to)
  values (p_user_id, coalesce(v_arr, '{}'), v_max_to)
  on conflict (user_id) do update
    set entitlements = excluded.entitlements,
        access_to    = excluded.access_to,
        updated_at   = now();
end;
$$;

create or replace function public.subject_entitlements_after_change()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (tg_op = 'DELETE') then
    perform public.rebuild_user_entitlements_array(old.user_id);
    return old;
  else
    perform public.rebuild_user_entitlements_array(new.user_id);
    return new;
  end if;
end;
$$;
drop trigger if exists trg_subject_ent_sync on public.subject_entitlements;
create trigger trg_subject_ent_sync
  after insert or update or delete on public.subject_entitlements
  for each row execute function public.subject_entitlements_after_change();

-- 7. Storage RLS: content paths stay flat. Entitlement is derived via the user's
--    profile country/class pair. Shared/manifest/free-preview paths still open to all.
drop policy if exists study_materials_read on storage.objects;
create policy study_materials_read on storage.objects
  for select to authenticated
  using (
    bucket_id = 'study-materials'
    and (
      split_part(name, '/', 1) = 'shared'
      or name ~ '^[a-z0-9_-]+/topics-manifest\.json$'
      or name ~ '^[a-z0-9_-]+/infographics-info\.md$'
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
