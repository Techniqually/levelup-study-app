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
  student_id text not null,
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

-- non-policy indexes
create index if not exists idx_profiles_project_device on public.profiles(project_id, device_id);
create index if not exists idx_eventlog_project_profile_created on public.event_log(project_id, profile_id, created_at desc);
create index if not exists idx_topicstats_project_subject_topic on public.study_topic_stats(project_id, subject_id, topic_id);
create index if not exists idx_attempts_project_profile_created on public.study_quiz_attempts(project_id, profile_id, created_at desc);
create index if not exists idx_xpledger_project_profile_created on public.study_xp_ledger(project_id, profile_id, created_at desc);
create index if not exists idx_purchases_project_profile_created on public.study_reward_purchases(project_id, profile_id, purchased_at desc);
create index if not exists idx_profiles_meta_student_id
on public.profiles ((meta->>'studentId'));
create unique index if not exists uq_profiles_project_student
  on public.profiles(project_id, student_id);

create index if not exists idx_profiles_project_student
  on public.profiles(project_id, student_id);
create unique index if not exists uq_xp_ledger_client_event
  on public.study_xp_ledger(project_id, profile_id, client_event_id);
create unique index if not exists uq_reward_purchase_client_id
  on public.study_reward_purchases(project_id, profile_id, client_purchase_id);

-- Seed
insert into public.projects (code, name)
values ('study-app', 'Study App')
on conflict (code) do nothing;
 