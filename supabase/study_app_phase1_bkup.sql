
-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;


create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  device_id text not null,
  user_id uuid null,
  display_name text null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (project_id, device_id)
);

create table if not exists public.event_log (
  id bigserial primary key,
  project_id uuid not null references public.projects(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  source_app text not null default 'study-app',
  event_type text not null,
  event_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.study_topic_stats (
  project_id uuid not null references public.projects(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  subject_id text not null,
  topic_id text not null,
  seen int not null default 0,
  correct int not null default 0,
  mastery int not null default 0,
  streak int not null default 0,
  last_result text null,
  mastered_until timestamptz null,
  updated_at timestamptz not null default now(),
  primary key (project_id, profile_id, subject_id, topic_id)
);

create table if not exists public.study_quiz_attempts (
  id bigserial primary key,
  project_id uuid not null references public.projects(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  subject_id text not null,
  topic_id text not null,
  mode text not null,
  score_pct int not null check (score_pct between 0 and 100),
  xp_delta int not null default 0,
  duration_sec int not null default 0,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.study_xp_ledger (
  id bigserial primary key,
  project_id uuid not null references public.projects(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  client_event_id text null,
  delta int not null,
  reason text not null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.study_reward_purchases (
  id bigserial primary key,
  project_id uuid not null references public.projects(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  client_purchase_id text null,
  reward_id text not null,
  reward_label text not null,
  xp_cost int not null check (xp_cost > 0),
  coupon_code text null,
  purchased_at timestamptz not null default now(),
  claimed_at timestamptz null
);

create table if not exists public.study_daily_counters (
  project_id uuid not null references public.projects(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  day date not null,
  reward_id text not null,
  count int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (project_id, profile_id, day, reward_id)
);

create table if not exists public.study_question_misses (
  id bigserial primary key,
  project_id uuid not null references public.projects(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  subject_id text not null,
  topic_id text not null,
  question_key text not null,
  miss_count int not null default 1,
  last_missed_at timestamptz not null default now(),
  unique (project_id, profile_id, subject_id, topic_id, question_key)
);

create index if not exists idx_profiles_project_device on public.profiles(project_id, device_id);
create index if not exists idx_eventlog_project_profile_created on public.event_log(project_id, profile_id, created_at desc);
create index if not exists idx_topicstats_project_subject_topic on public.study_topic_stats(project_id, subject_id, topic_id);
create index if not exists idx_attempts_project_profile_created on public.study_quiz_attempts(project_id, profile_id, created_at desc);
create index if not exists idx_xpledger_project_profile_created on public.study_xp_ledger(project_id, profile_id, created_at desc);
create index if not exists idx_purchases_project_profile_created on public.study_reward_purchases(project_id, profile_id, purchased_at desc);

insert into public.projects (code, name)
values ('study-app', 'Study App')
on conflict (code) do nothing;

alter table public.projects enable row level security;
alter table public.profiles enable row level security;
alter table public.event_log enable row level security;
alter table public.study_topic_stats enable row level security;
alter table public.study_quiz_attempts enable row level security;
alter table public.study_xp_ledger enable row level security;
alter table public.study_reward_purchases enable row level security;
alter table public.study_daily_counters enable row level security;
alter table public.study_question_misses enable row level security;

drop policy if exists projects_select_all on public.projects;
create policy projects_select_all on public.projects
for select to anon, authenticated
using (true);

drop policy if exists profiles_select_own_device on public.profiles;
create policy profiles_select_own_device on public.profiles
for select to anon, authenticated
using (device_id = coalesce(current_setting('request.headers', true), '{}')::jsonb ->> 'x-device-id');

drop policy if exists profiles_insert_own_device on public.profiles;
create policy profiles_insert_own_device on public.profiles
for insert to anon, authenticated
with check (device_id = coalesce(current_setting('request.headers', true), '{}')::jsonb ->> 'x-device-id');

drop policy if exists profiles_update_own_device on public.profiles;
create policy profiles_update_own_device on public.profiles
for update to anon, authenticated
using (device_id = coalesce(current_setting('request.headers', true), '{}')::jsonb ->> 'x-device-id')
with check (device_id = coalesce(current_setting('request.headers', true), '{}')::jsonb ->> 'x-device-id');

do $$
declare
  t text;
begin
  foreach t in array array[
    'event_log',
    'study_topic_stats',
    'study_quiz_attempts',
    'study_xp_ledger',
    'study_reward_purchases',
    'study_daily_counters',
    'study_question_misses'
  ]
  loop
    execute format('drop policy if exists %I_select_own on public.%I', t, t);
    execute format(
      'create policy %I_select_own on public.%I
       for select to anon, authenticated
       using (
         exists (
           select 1 from public.profiles p
           where p.id = %I.profile_id
             and p.project_id = %I.project_id
             and p.device_id = coalesce(current_setting(''request.headers'', true), ''{}'')::jsonb ->> ''x-device-id''
         )
       )',
      t, t, t, t
    );

    execute format('drop policy if exists %I_insert_own on public.%I', t, t);
    execute format(
      'create policy %I_insert_own on public.%I
       for insert to anon, authenticated
       with check (
         exists (
           select 1 from public.profiles p
           where p.id = %I.profile_id
             and p.project_id = %I.project_id
             and p.device_id = coalesce(current_setting(''request.headers'', true), ''{}'')::jsonb ->> ''x-device-id''
         )
       )',
      t, t, t, t
    );

    execute format('drop policy if exists %I_update_own on public.%I', t, t);
    execute format(
      'create policy %I_update_own on public.%I
       for update to anon, authenticated
       using (
         exists (
           select 1 from public.profiles p
           where p.id = %I.profile_id
             and p.project_id = %I.project_id
             and p.device_id = coalesce(current_setting(''request.headers'', true), ''{}'')::jsonb ->> ''x-device-id''
         )
       )
       with check (
         exists (
           select 1 from public.profiles p
           where p.id = %I.profile_id
             and p.project_id = %I.project_id
             and p.device_id = coalesce(current_setting(''request.headers'', true), ''{}'')::jsonb ->> ''x-device-id''
         )
       )',
      t, t, t, t, t, t
    );
  end loop;
end $$;

create or replace function public.study_purchase_reward(
  p_project_code text,
  p_device_id text,
  p_reward_id text,
  p_reward_label text,
  p_xp_cost int,
  p_daily_max int
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_project_id uuid;
  v_profile_id uuid;
  v_existing_student_id text;
  v_generated_student_id text;
  v_today date := (now() at time zone 'utc')::date;
  v_used int;
  v_balance int;
  v_purchase_id bigint;
  v_coupon text;
begin
  if p_xp_cost <= 0 then
    return jsonb_build_object('ok', false, 'error', 'invalid_xp_cost');
  end if;
  if p_daily_max < 1 then
    return jsonb_build_object('ok', false, 'error', 'invalid_daily_max');
  end if;

  select id into v_project_id from public.projects where code = p_project_code;
  if v_project_id is null then
    return jsonb_build_object('ok', false, 'error', 'project_not_found');
  end if;

  select id, student_id into v_profile_id, v_existing_student_id
  from public.profiles
  where project_id = v_project_id
    and device_id = p_device_id
  limit 1;

  if v_profile_id is null then
    v_generated_student_id := 'student-' || left(md5(coalesce(p_device_id, gen_random_uuid()::text)), 12);
    insert into public.profiles(project_id, device_id, student_id, meta)
    values (
      v_project_id,
      p_device_id,
      v_generated_student_id,
      jsonb_build_object('studentId', v_generated_student_id, 'lastDeviceId', p_device_id)
    )
    returning id into v_profile_id;
  elsif coalesce(v_existing_student_id, '') = '' then
    v_generated_student_id := 'student-' || left(md5(coalesce(p_device_id, v_profile_id::text)), 12);
    update public.profiles
    set student_id = v_generated_student_id,
        meta = coalesce(meta, '{}'::jsonb)
          || jsonb_build_object('studentId', v_generated_student_id, 'lastDeviceId', p_device_id)
    where id = v_profile_id;
  end if;

  insert into public.study_daily_counters(project_id, profile_id, day, reward_id, count)
  values (v_project_id, v_profile_id, v_today, p_reward_id, 0)
  on conflict (project_id, profile_id, day, reward_id) do nothing;

  select count into v_used
  from public.study_daily_counters
  where project_id = v_project_id
    and profile_id = v_profile_id
    and day = v_today
    and reward_id = p_reward_id
  for update;

  if v_used >= p_daily_max then
    return jsonb_build_object('ok', false, 'error', 'daily_limit_reached', 'used', v_used, 'dailyMax', p_daily_max);
  end if;

  select coalesce(sum(delta), 0) into v_balance
  from public.study_xp_ledger
  where project_id = v_project_id and profile_id = v_profile_id;

  if v_balance < p_xp_cost then
    return jsonb_build_object('ok', false, 'error', 'insufficient_xp', 'balance', v_balance, 'cost', p_xp_cost);
  end if;

  insert into public.study_xp_ledger(project_id, profile_id, delta, reason, meta)
  values (v_project_id, v_profile_id, -p_xp_cost, 'reward_purchase', jsonb_build_object('reward_id', p_reward_id, 'label', p_reward_label));

  update public.study_daily_counters
  set count = count + 1, updated_at = now()
  where project_id = v_project_id
    and profile_id = v_profile_id
    and day = v_today
    and reward_id = p_reward_id;

  v_coupon := substring(md5(random()::text || clock_timestamp()::text || p_reward_id), 1, 10);
  insert into public.study_reward_purchases(project_id, profile_id, reward_id, reward_label, xp_cost, coupon_code)
  values (v_project_id, v_profile_id, p_reward_id, p_reward_label, p_xp_cost, v_coupon)
  returning id into v_purchase_id;

  return jsonb_build_object('ok', true, 'purchase_id', v_purchase_id, 'coupon_code', v_coupon);
end;
$$;

create index if not exists idx_profiles_meta_student_id
on public.profiles ((meta->>'studentId'));

revoke all on function public.study_purchase_reward(text, text, text, text, int, int) from public;
grant execute on function public.study_purchase_reward(text, text, text, text, int, int) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Single-script upgrade pack (student identity + idempotent sync + admin tools)
-- ---------------------------------------------------------------------------

alter table public.profiles
  add column if not exists student_id text;

update public.profiles
set student_id = coalesce(
  nullif(meta->>'studentId', ''),
  'student-' || left(md5(coalesce(device_id, id::text)), 12)
)
where coalesce(student_id, '') = '';

alter table public.profiles
  alter column student_id set not null;

create unique index if not exists uq_profiles_project_student
  on public.profiles(project_id, student_id);

create index if not exists idx_profiles_project_student
  on public.profiles(project_id, student_id);

alter table public.study_xp_ledger
  add column if not exists client_event_id text;

create unique index if not exists uq_xp_ledger_client_event
  on public.study_xp_ledger(project_id, profile_id, client_event_id);

alter table public.study_reward_purchases
  add column if not exists client_purchase_id text;

create unique index if not exists uq_reward_purchase_client_id
  on public.study_reward_purchases(project_id, profile_id, client_purchase_id);

drop policy if exists profiles_select_own_device on public.profiles;
drop policy if exists profiles_insert_own_device on public.profiles;
drop policy if exists profiles_update_own_device on public.profiles;
drop policy if exists profiles_select_own_identity on public.profiles;
drop policy if exists profiles_insert_own_identity on public.profiles;
drop policy if exists profiles_update_own_identity on public.profiles;

create policy profiles_select_own_identity on public.profiles
for select to anon, authenticated
using (
  student_id = coalesce(current_setting('request.headers', true), '{}')::jsonb ->> 'x-student-id'
  or device_id = coalesce(current_setting('request.headers', true), '{}')::jsonb ->> 'x-device-id'
);

create policy profiles_insert_own_identity on public.profiles
for insert to anon, authenticated
with check (
  student_id = coalesce(current_setting('request.headers', true), '{}')::jsonb ->> 'x-student-id'
  or device_id = coalesce(current_setting('request.headers', true), '{}')::jsonb ->> 'x-device-id'
);

create policy profiles_update_own_identity on public.profiles
for update to anon, authenticated
using (
  student_id = coalesce(current_setting('request.headers', true), '{}')::jsonb ->> 'x-student-id'
  or device_id = coalesce(current_setting('request.headers', true), '{}')::jsonb ->> 'x-device-id'
)
with check (
  student_id = coalesce(current_setting('request.headers', true), '{}')::jsonb ->> 'x-student-id'
  or device_id = coalesce(current_setting('request.headers', true), '{}')::jsonb ->> 'x-device-id'
);

do $$
declare
  t text;
begin
  foreach t in array array[
    'event_log',
    'study_topic_stats',
    'study_quiz_attempts',
    'study_xp_ledger',
    'study_reward_purchases',
    'study_daily_counters',
    'study_question_misses'
  ]
  loop
    execute format('drop policy if exists %I_select_own on public.%I', t, t);
    execute format(
      'create policy %I_select_own on public.%I
       for select to anon, authenticated
       using (
         exists (
           select 1 from public.profiles p
           where p.id = %I.profile_id
             and p.project_id = %I.project_id
             and (
               p.student_id = coalesce(current_setting(''request.headers'', true), ''{}'')::jsonb ->> ''x-student-id''
               or p.device_id = coalesce(current_setting(''request.headers'', true), ''{}'')::jsonb ->> ''x-device-id''
             )
         )
       )',
      t, t, t, t
    );

    execute format('drop policy if exists %I_insert_own on public.%I', t, t);
    execute format(
      'create policy %I_insert_own on public.%I
       for insert to anon, authenticated
       with check (
         exists (
           select 1 from public.profiles p
           where p.id = %I.profile_id
             and p.project_id = %I.project_id
             and (
               p.student_id = coalesce(current_setting(''request.headers'', true), ''{}'')::jsonb ->> ''x-student-id''
               or p.device_id = coalesce(current_setting(''request.headers'', true), ''{}'')::jsonb ->> ''x-device-id''
             )
         )
       )',
      t, t, t, t
    );

    execute format('drop policy if exists %I_update_own on public.%I', t, t);
    execute format(
      'create policy %I_update_own on public.%I
       for update to anon, authenticated
       using (
         exists (
           select 1 from public.profiles p
           where p.id = %I.profile_id
             and p.project_id = %I.project_id
             and (
               p.student_id = coalesce(current_setting(''request.headers'', true), ''{}'')::jsonb ->> ''x-student-id''
               or p.device_id = coalesce(current_setting(''request.headers'', true), ''{}'')::jsonb ->> ''x-device-id''
             )
         )
       )
       with check (
         exists (
           select 1 from public.profiles p
           where p.id = %I.profile_id
             and p.project_id = %I.project_id
             and (
               p.student_id = coalesce(current_setting(''request.headers'', true), ''{}'')::jsonb ->> ''x-student-id''
               or p.device_id = coalesce(current_setting(''request.headers'', true), ''{}'')::jsonb ->> ''x-device-id''
             )
         )
       )',
      t, t, t, t, t, t
    );
  end loop;
end $$;

create or replace function public.study_purchase_reward_v2(
  p_project_code text,
  p_student_id text,
  p_student_name text,
  p_device_id text,
  p_reward_id text,
  p_reward_label text,
  p_xp_cost int,
  p_daily_max int
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_project_id uuid;
  v_profile_id uuid;
  v_today date := (now() at time zone 'utc')::date;
  v_used int;
  v_balance int;
  v_purchase_id bigint;
  v_coupon text;
begin
  if p_xp_cost <= 0 then
    return jsonb_build_object('ok', false, 'error', 'invalid_xp_cost');
  end if;
  if p_daily_max < 1 then
    return jsonb_build_object('ok', false, 'error', 'invalid_daily_max');
  end if;
  if coalesce(trim(p_student_id), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'student_id_required');
  end if;

  select id into v_project_id from public.projects where code = p_project_code;
  if v_project_id is null then
    return jsonb_build_object('ok', false, 'error', 'project_not_found');
  end if;

  insert into public.profiles(project_id, student_id, device_id, display_name, meta)
  values (
    v_project_id,
    p_student_id,
    coalesce(nullif(p_device_id, ''), 'unknown-device'),
    nullif(p_student_name, ''),
    jsonb_build_object('studentId', p_student_id, 'lastDeviceId', p_device_id)
  )
  on conflict (project_id, student_id) do update
    set device_id = excluded.device_id,
        display_name = coalesce(excluded.display_name, public.profiles.display_name),
        meta = coalesce(public.profiles.meta, '{}'::jsonb)
          || jsonb_build_object('studentId', p_student_id, 'lastDeviceId', p_device_id)
  returning id into v_profile_id;

  insert into public.study_daily_counters(project_id, profile_id, day, reward_id, count)
  values (v_project_id, v_profile_id, v_today, p_reward_id, 0)
  on conflict (project_id, profile_id, day, reward_id) do nothing;

  select count into v_used
  from public.study_daily_counters
  where project_id = v_project_id
    and profile_id = v_profile_id
    and day = v_today
    and reward_id = p_reward_id
  for update;

  if v_used >= p_daily_max then
    return jsonb_build_object('ok', false, 'error', 'daily_limit_reached', 'used', v_used, 'dailyMax', p_daily_max);
  end if;

  select coalesce(sum(delta), 0) into v_balance
  from public.study_xp_ledger
  where project_id = v_project_id and profile_id = v_profile_id;

  if v_balance < p_xp_cost then
    return jsonb_build_object('ok', false, 'error', 'insufficient_xp', 'balance', v_balance, 'cost', p_xp_cost);
  end if;

  insert into public.study_xp_ledger(project_id, profile_id, delta, reason, meta, client_event_id)
  values (
    v_project_id,
    v_profile_id,
    -p_xp_cost,
    'reward_purchase',
    jsonb_build_object('reward_id', p_reward_id, 'label', p_reward_label),
    'reward-' || p_reward_id || '-' || extract(epoch from now())::bigint::text
  );

  update public.study_daily_counters
  set count = count + 1, updated_at = now()
  where project_id = v_project_id
    and profile_id = v_profile_id
    and day = v_today
    and reward_id = p_reward_id;

  v_coupon := substring(md5(random()::text || clock_timestamp()::text || p_reward_id), 1, 10);
  insert into public.study_reward_purchases(project_id, profile_id, reward_id, reward_label, xp_cost, coupon_code)
  values (v_project_id, v_profile_id, p_reward_id, p_reward_label, p_xp_cost, v_coupon)
  returning id into v_purchase_id;

  return jsonb_build_object('ok', true, 'purchase_id', v_purchase_id, 'coupon_code', v_coupon);
end;
$$;

revoke all on function public.study_purchase_reward_v2(text, text, text, text, text, text, int, int) from public;
grant execute on function public.study_purchase_reward_v2(text, text, text, text, text, text, int, int) to anon, authenticated;

create or replace function public.study_get_daily_counts(
  p_project_code text,
  p_student_id text,
  p_device_id text default null
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_project_id uuid;
  v_profile_id uuid;
  v_today date := (now() at time zone 'utc')::date;
begin
  select id into v_project_id from public.projects where code = p_project_code;
  if v_project_id is null then
    return jsonb_build_object('ok', false, 'error', 'project_not_found');
  end if;

  select p.id into v_profile_id
  from public.profiles p
  where p.project_id = v_project_id
    and (
      (coalesce(trim(p_student_id), '') <> '' and p.student_id = p_student_id)
      or (coalesce(trim(coalesce(p_device_id, '')), '') <> '' and p.device_id = p_device_id)
    )
  limit 1;

  if v_profile_id is null then
    return jsonb_build_object('ok', true, 'date', v_today::text, 'counts', '[]'::jsonb);
  end if;

  return jsonb_build_object(
    'ok', true,
    'date', v_today::text,
    'counts', (
      select coalesce(
        jsonb_agg(jsonb_build_object('reward_id', dc.reward_id, 'count', dc.count)),
        '[]'::jsonb
      )
      from public.study_daily_counters dc
      where dc.project_id = v_project_id
        and dc.profile_id = v_profile_id
        and dc.day = v_today
    )
  );
end;
$$;

revoke all on function public.study_get_daily_counts(text, text, text) from public;
grant execute on function public.study_get_daily_counts(text, text, text) to anon, authenticated;

create or replace function public.study_get_shop_snapshot(
  p_project_code text,
  p_student_id text,
  p_device_id text default null
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_project_id uuid;
  v_profile_id uuid;
  v_today date := (now() at time zone 'utc')::date;
  v_counts jsonb := '[]'::jsonb;
  v_coupons_today jsonb := '[]'::jsonb;
  v_coupons_recent jsonb := '[]'::jsonb;
  v_balance int := 0;
begin
  select id into v_project_id from public.projects where code = p_project_code;
  if v_project_id is null then
    return jsonb_build_object('ok', false, 'error', 'project_not_found');
  end if;

  select p.id into v_profile_id
  from public.profiles p
  where p.project_id = v_project_id
    and (
      (coalesce(trim(p_student_id), '') <> '' and p.student_id = p_student_id)
      or (coalesce(trim(coalesce(p_device_id, '')), '') <> '' and p.device_id = p_device_id)
    )
  limit 1;

  if v_profile_id is null then
    return jsonb_build_object(
      'ok', true,
      'date', v_today::text,
      'counts', '[]'::jsonb,
      'coupons_today', '[]'::jsonb,
      'coupons_recent', '[]'::jsonb,
      'xp_balance', 0
    );
  end if;

  select coalesce(sum(delta), 0) into v_balance
  from public.study_xp_ledger
  where project_id = v_project_id and profile_id = v_profile_id;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'reward_id', dc.reward_id,
        'count', dc.count
      )
      order by dc.reward_id
    ),
    '[]'::jsonb
  )
  into v_counts
  from public.study_daily_counters dc
  where dc.project_id = v_project_id
    and dc.profile_id = v_profile_id
    and dc.day = v_today;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'purchase_id', rp.id,
        'reward_id', rp.reward_id,
        'reward_label', rp.reward_label,
        'xp_cost', rp.xp_cost,
        'coupon_code', rp.coupon_code,
        'client_purchase_id', rp.client_purchase_id,
        'purchased_at', rp.purchased_at,
        'claimed_at', rp.claimed_at
      )
      order by rp.purchased_at desc
    ),
    '[]'::jsonb
  )
  into v_coupons_today
  from public.study_reward_purchases rp
  where rp.project_id = v_project_id
    and rp.profile_id = v_profile_id
    and (rp.purchased_at at time zone 'utc')::date = v_today;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'purchase_id', z.id,
        'reward_id', z.reward_id,
        'reward_label', z.reward_label,
        'xp_cost', z.xp_cost,
        'coupon_code', z.coupon_code,
        'client_purchase_id', z.client_purchase_id,
        'purchased_at', z.purchased_at,
        'claimed_at', z.claimed_at
      )
      order by z.purchased_at desc
    ),
    '[]'::jsonb
  )
  into v_coupons_recent
  from (
    select
      rp.id,
      rp.reward_id,
      rp.reward_label,
      rp.xp_cost,
      rp.coupon_code,
      rp.client_purchase_id,
      rp.purchased_at,
      rp.claimed_at
    from public.study_reward_purchases rp
    where rp.project_id = v_project_id
      and rp.profile_id = v_profile_id
    order by rp.purchased_at desc
    limit 30
  ) z;

  return jsonb_build_object(
    'ok', true,
    'date', v_today::text,
    'counts', v_counts,
    'coupons_today', v_coupons_today,
    'coupons_recent', v_coupons_recent,
    'xp_balance', v_balance
  );
end;
$$;

revoke all on function public.study_get_shop_snapshot(text, text, text) from public;
grant execute on function public.study_get_shop_snapshot(text, text, text) to anon, authenticated;

create or replace function public.study_clear_profile_data(
  p_project_code text,
  p_student_id text default null,
  p_device_id text default null,
  p_delete_profile boolean default true
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_project_id uuid;
  v_profile_id uuid;
  v_deleted bigint := 0;
begin
  select id into v_project_id from public.projects where code = p_project_code;
  if v_project_id is null then
    return jsonb_build_object('ok', false, 'error', 'project_not_found');
  end if;
  if coalesce(trim(coalesce(p_student_id, '')), '') = '' and coalesce(trim(coalesce(p_device_id, '')), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'student_or_device_required');
  end if;

  select p.id into v_profile_id
  from public.profiles p
  where p.project_id = v_project_id
    and (
      (p_student_id is not null and p.student_id = p_student_id)
      or (p_device_id is not null and p.device_id = p_device_id)
    )
  limit 1;

  if v_profile_id is null then
    return jsonb_build_object('ok', false, 'error', 'profile_not_found');
  end if;

  delete from public.study_question_misses where project_id = v_project_id and profile_id = v_profile_id;
  get diagnostics v_deleted = row_count;
  delete from public.study_daily_counters where project_id = v_project_id and profile_id = v_profile_id;
  delete from public.study_reward_purchases where project_id = v_project_id and profile_id = v_profile_id;
  delete from public.study_xp_ledger where project_id = v_project_id and profile_id = v_profile_id;
  delete from public.study_quiz_attempts where project_id = v_project_id and profile_id = v_profile_id;
  delete from public.study_topic_stats where project_id = v_project_id and profile_id = v_profile_id;
  delete from public.event_log where project_id = v_project_id and profile_id = v_profile_id;

  if p_delete_profile then
    delete from public.profiles where id = v_profile_id;
  end if;

  return jsonb_build_object(
    'ok', true,
    'project_id', v_project_id,
    'profile_id', v_profile_id,
    'profile_deleted', p_delete_profile
  );
end;
$$;

revoke all on function public.study_clear_profile_data(text, text, text, boolean) from public;
grant execute on function public.study_clear_profile_data(text, text, text, boolean) to authenticated;

-- Parent dashboard access
create table if not exists public.project_parent_access (
  project_id uuid primary key references public.projects(id) on delete cascade,
  code_hash text not null,
  code_sha256 text,
  updated_at timestamptz not null default now()
);

alter table public.project_parent_access enable row level security;

drop policy if exists project_parent_access_none on public.project_parent_access;
create policy project_parent_access_none on public.project_parent_access
for all to anon, authenticated
using (false)
with check (false);

create or replace function public.study_set_parent_code(
  p_project_code text,
  p_plain_code text
) returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_project_id uuid;
begin
  if coalesce(trim(p_plain_code), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'empty_code');
  end if;
  select id into v_project_id from public.projects where code = p_project_code;
  if v_project_id is null then
    return jsonb_build_object('ok', false, 'error', 'project_not_found');
  end if;
  insert into public.project_parent_access(project_id, code_hash, code_sha256, updated_at)
  values (
    v_project_id,
    extensions.crypt(p_plain_code, extensions.gen_salt('bf')),
    encode(extensions.digest(p_plain_code, 'sha256'), 'hex'),
    now()
  )
  on conflict (project_id) do update
    set code_hash = excluded.code_hash,
        code_sha256 = excluded.code_sha256,
        updated_at = now();
  return jsonb_build_object('ok', true, 'project_id', v_project_id);
end;
$$;

revoke all on function public.study_set_parent_code(text, text) from public;
grant execute on function public.study_set_parent_code(text, text) to authenticated;

create or replace function public.study_parent_student_overview(
  p_project_code text,
  p_parent_code text
) returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_project_id uuid;
  v_hash text;
  v_students jsonb;
begin
  select p.id into v_project_id
  from public.projects p
  where p.code = p_project_code;
  if v_project_id is null then
    return jsonb_build_object('ok', false, 'error', 'project_not_found');
  end if;

  select code_hash into v_hash
  from public.project_parent_access
  where project_id = v_project_id;
  if v_hash is null then
    return jsonb_build_object('ok', false, 'error', 'parent_code_not_set');
  end if;

  if extensions.crypt(coalesce(p_parent_code, ''), v_hash) <> v_hash then
    return jsonb_build_object('ok', false, 'error', 'invalid_parent_code');
  end if;

  with per_profile as (
    select
      pr.id as profile_id,
      pr.student_id,
      pr.display_name,
      pr.device_id,
      coalesce(xa.xp_balance, 0) as xp_balance,
      coalesce(xa.xp_events, 0) as xp_events,
      coalesce(tsa.studied_topics, 0) as studied_topics,
      coalesce(tsa.last_activity, pr.created_at) as last_activity,
      coalesce(rpa.purchases, 0) as purchases,
      coalesce(rpa.recent_coupons, '[]'::jsonb) as recent_coupons
    from public.profiles pr
    left join lateral (
      select
        coalesce(sum(x.delta), 0) as xp_balance,
        count(*) filter (where x.delta > 0) as xp_events
      from public.study_xp_ledger x
      where x.project_id = pr.project_id
        and x.profile_id = pr.id
    ) xa on true
    left join lateral (
      select
        count(distinct ts.topic_id) as studied_topics,
        max(ts.updated_at) as last_activity
      from public.study_topic_stats ts
      where ts.project_id = pr.project_id
        and ts.profile_id = pr.id
    ) tsa on true
    left join lateral (
      select
        count(*) as purchases,
        coalesce(
          jsonb_agg(
            jsonb_build_object(
              'purchase_id', z.id,
              'reward_id', z.reward_id,
              'reward_label', z.reward_label,
              'xp_cost', z.xp_cost,
              'coupon_code', z.coupon_code,
              'purchased_at', z.purchased_at,
              'claimed_at', z.claimed_at
            )
            order by z.purchased_at desc
          ),
          '[]'::jsonb
        ) as recent_coupons
      from (
        select rp.id, rp.reward_id, rp.reward_label, rp.xp_cost, rp.coupon_code, rp.purchased_at, rp.claimed_at
        from public.study_reward_purchases rp
        where rp.project_id = pr.project_id
          and rp.profile_id = pr.id
        order by rp.purchased_at desc
        limit 10
      ) z
    ) rpa on true
    where pr.project_id = v_project_id
  )
  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'profile_id', profile_id,
        'student_id', student_id,
        'student_name', coalesce(display_name, student_id),
        'device_id', device_id,
        'xp_balance', xp_balance,
        'xp_events', xp_events,
        'studied_topics', studied_topics,
        'purchases', purchases,
        'recent_coupons', recent_coupons,
        'last_activity', last_activity
      )
      order by xp_balance desc, last_activity desc
    ),
    '[]'::jsonb
  )
  into v_students
  from per_profile;

  return jsonb_build_object(
    'ok', true,
    'project_code', p_project_code,
    'generated_at', now(),
    'students', v_students
  );
end;
$$;

revoke all on function public.study_parent_student_overview(text, text) from public;
grant execute on function public.study_parent_student_overview(text, text) to anon, authenticated;

create or replace function public.study_parent_student_overview_token(
  p_project_code text,
  p_parent_token text
) returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_project_id uuid;
  v_hash text;
  v_students jsonb;
begin
  select p.id into v_project_id
  from public.projects p
  where p.code = p_project_code;

  if v_project_id is null then
    return jsonb_build_object('ok', false, 'error', 'project_not_found');
  end if;

  select code_sha256 into v_hash
  from public.project_parent_access
  where project_id = v_project_id;

  if v_hash is null then
    return jsonb_build_object('ok', false, 'error', 'parent_token_not_set');
  end if;

  if coalesce(trim(p_parent_token), '') = '' or p_parent_token <> v_hash then
    return jsonb_build_object('ok', false, 'error', 'invalid_parent_token');
  end if;

  with per_profile as (
    select
      pr.id as profile_id,
      pr.student_id,
      pr.display_name,
      pr.device_id,
      coalesce(xa.xp_balance, 0) as xp_balance,
      coalesce(xa.xp_events, 0) as xp_events,
      coalesce(tsa.studied_topics, 0) as studied_topics,
      coalesce(tsa.chapters_covered, 0) as chapters_covered,
      coalesce(xa.xp_last_7d, 0) as xp_last_7d,
      coalesce(xa.xp_events_last_7d, 0) as xp_events_last_7d,
      coalesce(tsa.last_activity, pr.created_at) as last_activity,
      coalesce(rpa.purchases, 0) as purchases,
      coalesce(rpa.recent_coupons, '[]'::jsonb) as recent_coupons
    from public.profiles pr
    left join lateral (
      select
        coalesce(sum(x.delta), 0) as xp_balance,
        count(*) filter (where x.delta > 0) as xp_events,
        coalesce(sum(x.delta) filter (where x.created_at >= now() - interval '7 days'), 0) as xp_last_7d,
        count(*) filter (
          where x.delta > 0 and x.created_at >= now() - interval '7 days'
        ) as xp_events_last_7d
      from public.study_xp_ledger x
      where x.project_id = pr.project_id
        and x.profile_id = pr.id
    ) xa on true
    left join lateral (
      select
        count(distinct ts.topic_id) as studied_topics,
        count(distinct ts.topic_id) filter (where coalesce(ts.seen, 0) > 0) as chapters_covered,
        max(ts.updated_at) as last_activity
      from public.study_topic_stats ts
      where ts.project_id = pr.project_id
        and ts.profile_id = pr.id
    ) tsa on true
    left join lateral (
      select
        count(*) as purchases,
        coalesce(
          jsonb_agg(
            jsonb_build_object(
              'purchase_id', z.id,
              'reward_id', z.reward_id,
              'reward_label', z.reward_label,
              'xp_cost', z.xp_cost,
              'coupon_code', z.coupon_code,
              'purchased_at', z.purchased_at,
              'claimed_at', z.claimed_at
            )
            order by z.purchased_at desc
          ),
          '[]'::jsonb
        ) as recent_coupons
      from (
        select rp.id, rp.reward_id, rp.reward_label, rp.xp_cost, rp.coupon_code, rp.purchased_at, rp.claimed_at
        from public.study_reward_purchases rp
        where rp.project_id = pr.project_id
          and rp.profile_id = pr.id
        order by rp.purchased_at desc
        limit 10
      ) z
    ) rpa on true
    where pr.project_id = v_project_id
  ),
  topic_strength as (
    select
      ts.profile_id,
      jsonb_agg(
        jsonb_build_object(
          'topic_id', ts.topic_id,
          'mastery', ts.mastery,
          'seen', ts.seen,
          'correct', ts.correct
        )
        order by ts.mastery desc, ts.seen desc
      ) filter (where ts.mastery >= 80) as strong_topics,
      jsonb_agg(
        jsonb_build_object(
          'topic_id', ts.topic_id,
          'mastery', ts.mastery,
          'seen', ts.seen,
          'correct', ts.correct
        )
        order by ts.mastery asc, ts.seen desc
      ) filter (where ts.seen > 0 and ts.mastery < 55) as weak_topics
    from public.study_topic_stats ts
    where ts.project_id = v_project_id
    group by ts.profile_id
  ),
  subject_breakdown as (
    select
      s.profile_id,
      jsonb_agg(
        jsonb_build_object(
          'subject_id', s.subject_id,
          'xp', s.xp,
          'events', s.events,
          'xp_last_7d', s.xp_last_7d,
          'events_last_7d', s.events_last_7d
        )
        order by s.xp desc, s.subject_id
      ) as subjects
    from (
      select
        x.profile_id,
        coalesce(x.meta->>'subjectId', 'general') as subject_id,
        coalesce(sum(x.delta), 0) as xp,
        count(*) filter (where x.delta > 0) as events,
        coalesce(sum(x.delta) filter (where x.created_at >= now() - interval '7 days'), 0) as xp_last_7d,
        count(*) filter (
          where x.delta > 0 and x.created_at >= now() - interval '7 days'
        ) as events_last_7d
      from public.study_xp_ledger x
      where x.project_id = v_project_id
      group by x.profile_id, coalesce(x.meta->>'subjectId', 'general')
    ) s
    group by s.profile_id
  ),
  areas as (
    select
      x.profile_id,
      jsonb_agg(distinct to_jsonb(x.meta->>'theme')) filter (
        where coalesce(x.meta->>'theme', '') <> ''
      ) as areas_overall,
      jsonb_agg(distinct to_jsonb(x.meta->>'theme')) filter (
        where coalesce(x.meta->>'theme', '') <> ''
          and x.created_at >= now() - interval '7 days'
      ) as areas_week
    from public.study_xp_ledger x
    where x.project_id = v_project_id
      and x.delta > 0
    group by x.profile_id
  )
  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'profile_id', p.profile_id,
        'student_id', p.student_id,
        'student_name', coalesce(p.display_name, p.student_id),
        'device_id', p.device_id,
        'xp_balance', p.xp_balance,
        'xp_events', p.xp_events,
        'studied_topics', p.studied_topics,
        'chapters_covered', p.chapters_covered,
        'xp_last_7d', p.xp_last_7d,
        'xp_events_last_7d', p.xp_events_last_7d,
        'purchases', p.purchases,
        'recent_coupons', p.recent_coupons,
        'last_activity', p.last_activity,
        'areas_overall', coalesce(ar.areas_overall, '[]'::jsonb),
        'areas_week', coalesce(ar.areas_week, '[]'::jsonb),
        'strong_topics', coalesce(ts2.strong_topics, '[]'::jsonb),
        'weak_topics', coalesce(ts2.weak_topics, '[]'::jsonb),
        'subject_stats', coalesce(sb.subjects, '[]'::jsonb)
      )
      order by p.xp_balance desc, p.last_activity desc
    ),
    '[]'::jsonb
  )
  into v_students
  from per_profile p
  left join topic_strength ts2 on ts2.profile_id = p.profile_id
  left join areas ar on ar.profile_id = p.profile_id
  left join subject_breakdown sb on sb.profile_id = p.profile_id;

  return jsonb_build_object(
    'ok', true,
    'project_code', p_project_code,
    'generated_at', now(),
    'students', v_students
  );
end;
$$;

revoke all on function public.study_parent_student_overview_token(text, text) from public;
grant execute on function public.study_parent_student_overview_token(text, text) to anon, authenticated;

create or replace function public.study_parent_update_student_name_token(
  p_project_code text,
  p_parent_token text,
  p_student_id text,
  p_new_display_name text
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_project_id uuid;
  v_hash text;
  v_profile_id uuid;
  v_name text;
begin
  select id into v_project_id from public.projects where code = p_project_code;
  if v_project_id is null then
    return jsonb_build_object('ok', false, 'error', 'project_not_found');
  end if;

  select code_sha256 into v_hash
  from public.project_parent_access
  where project_id = v_project_id;
  if v_hash is null then
    return jsonb_build_object('ok', false, 'error', 'parent_token_not_set');
  end if;
  if coalesce(trim(p_parent_token), '') = '' or p_parent_token <> v_hash then
    return jsonb_build_object('ok', false, 'error', 'invalid_parent_token');
  end if;

  if coalesce(trim(p_student_id), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'student_id_required');
  end if;
  if coalesce(trim(p_new_display_name), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'name_required');
  end if;

  select id into v_profile_id
  from public.profiles
  where project_id = v_project_id
    and student_id = p_student_id
  limit 1;
  if v_profile_id is null then
    return jsonb_build_object('ok', false, 'error', 'profile_not_found');
  end if;

  update public.profiles
  set display_name = left(trim(p_new_display_name), 120)
  where id = v_profile_id
  returning display_name into v_name;

  return jsonb_build_object(
    'ok', true,
    'project_id', v_project_id,
    'profile_id', v_profile_id,
    'student_id', p_student_id,
    'student_name', coalesce(v_name, p_student_id)
  );
end;
$$;

revoke all on function public.study_parent_update_student_name_token(text, text, text, text) from public;
grant execute on function public.study_parent_update_student_name_token(text, text, text, text) to anon, authenticated;

create or replace function public.study_parent_delete_student_token(
  p_project_code text,
  p_parent_token text,
  p_student_id text,
  p_confirm_name text,
  p_delete_profile boolean default true
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_project_id uuid;
  v_hash text;
  v_profile_id uuid;
  v_expected_name text;
  v_result jsonb;
begin
  select id into v_project_id from public.projects where code = p_project_code;
  if v_project_id is null then
    return jsonb_build_object('ok', false, 'error', 'project_not_found');
  end if;

  select code_sha256 into v_hash
  from public.project_parent_access
  where project_id = v_project_id;
  if v_hash is null then
    return jsonb_build_object('ok', false, 'error', 'parent_token_not_set');
  end if;
  if coalesce(trim(p_parent_token), '') = '' or p_parent_token <> v_hash then
    return jsonb_build_object('ok', false, 'error', 'invalid_parent_token');
  end if;

  if coalesce(trim(p_student_id), '') = '' then
    return jsonb_build_object('ok', false, 'error', 'student_id_required');
  end if;

  select p.id, coalesce(nullif(trim(p.display_name), ''), p.student_id)
    into v_profile_id, v_expected_name
  from public.profiles p
  where p.project_id = v_project_id
    and p.student_id = p_student_id
  limit 1;

  if v_profile_id is null then
    return jsonb_build_object('ok', false, 'error', 'profile_not_found');
  end if;
  if coalesce(trim(p_confirm_name), '') <> v_expected_name then
    return jsonb_build_object(
      'ok', false,
      'error', 'confirmation_name_mismatch',
      'expected', v_expected_name
    );
  end if;

  select public.study_clear_profile_data(
    p_project_code => p_project_code,
    p_student_id => p_student_id,
    p_device_id => null,
    p_delete_profile => p_delete_profile
  ) into v_result;

  return jsonb_build_object(
    'ok', coalesce((v_result->>'ok')::boolean, false),
    'project_id', v_project_id,
    'profile_id', v_profile_id,
    'student_id', p_student_id,
    'deleted', v_result
  );
end;
$$;

revoke all on function public.study_parent_delete_student_token(text, text, text, text, boolean) from public;
grant execute on function public.study_parent_delete_student_token(text, text, text, text, boolean) to anon, authenticated;


-- ====================

-- 1) allow anon/authenticated to access schema
grant usage on schema public to anon, authenticated;

-- 2) table privileges (RLS still controls row-level access)
grant select, insert, update, delete on table public.projects to anon, authenticated;
grant select, insert, update, delete on table public.profiles to anon, authenticated;
grant select, insert, update, delete on table public.event_log to anon, authenticated;
grant select, insert, update, delete on table public.study_topic_stats to anon, authenticated;
grant select, insert, update, delete on table public.study_quiz_attempts to anon, authenticated;
grant select, insert, update, delete on table public.study_xp_ledger to anon, authenticated;
grant select, insert, update, delete on table public.study_reward_purchases to anon, authenticated;
grant select, insert, update, delete on table public.study_daily_counters to anon, authenticated;
grant select, insert, update, delete on table public.study_question_misses to anon, authenticated;

-- 3) needed for bigserial inserts
grant usage, select on all sequences in schema public to anon, authenticated;

-- 4) keep future tables/sequences usable too
alter default privileges in schema public
grant select, insert, update, delete on tables to anon, authenticated;

alter default privileges in schema public
grant usage, select on sequences to anon, authenticated;


-- Idempotent upsert indexes are defined above (non-partial).