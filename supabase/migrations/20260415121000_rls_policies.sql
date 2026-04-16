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

