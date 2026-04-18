-- Drop old tables if doing fresh install
-- (migration assumes clean slate)

create table if not exists public.event_log (
  id          bigserial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  source_app  text not null default 'levelup',
  event_type  text not null,
  event_data  jsonb not null default '{}',
  created_at  timestamptz not null default now()
);

-- User Subject State: Holds the entire local storage progress blob (flashKnown, dailyChallenge, streaks, themeBossBeaten) for multi-device sync
create table if not exists public.user_subject_state (
  user_id     uuid not null references auth.users(id) on delete cascade,
  subject_id  text not null,
  client_state jsonb not null default '{}',
  updated_at  timestamptz not null default now(),
  primary key (user_id, subject_id)
);

create table if not exists public.study_topic_stats (
  user_id     uuid not null references auth.users(id) on delete cascade,
  subject_id  text not null,
  topic_id    text not null,
  seen        int not null default 0,
  correct     int not null default 0,
  mastery     int not null default 0,
  streak      int not null default 0,
  last_result text,
  mastered_until timestamptz,
  updated_at  timestamptz not null default now(),
  primary key (user_id, subject_id, topic_id)
);

create table if not exists public.study_xp_ledger (
  id              bigserial primary key,
  user_id         uuid not null references auth.users(id) on delete cascade,
  client_event_id text,
  subject_id      text,
  delta           int not null,
  reason          text not null,
  meta            jsonb not null default '{}',
  created_at      timestamptz not null default now()
);
create unique index if not exists uq_xp_ledger_client_event
  on public.study_xp_ledger(user_id, client_event_id)
  where client_event_id is not null;

create table if not exists public.study_quiz_attempts (
  id          bigserial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  subject_id  text not null,
  topic_id    text not null,
  mode        text not null,
  score_pct   int not null check (score_pct between 0 and 100),
  xp_delta    int not null default 0,
  duration_sec int not null default 0,
  payload     jsonb not null default '{}',
  created_at  timestamptz not null default now()
);

create table if not exists public.study_reward_purchases (
  id                bigserial primary key,
  user_id           uuid not null references auth.users(id) on delete cascade,
  client_purchase_id text,
  reward_id         text not null,
  reward_label      text not null,
  xp_cost           int not null check (xp_cost > 0),
  coupon_code       text,
  purchased_at      timestamptz not null default now(),
  claimed_at        timestamptz
);
create unique index if not exists uq_reward_purchase_client_id
  on public.study_reward_purchases(user_id, client_purchase_id)
  where client_purchase_id is not null;

create table if not exists public.study_daily_counters (
  user_id    uuid not null references auth.users(id) on delete cascade,
  day        date not null,
  reward_id  text not null,
  count      int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, day, reward_id)
);

create table if not exists public.study_question_misses (
  id            bigserial primary key,
  user_id       uuid not null references auth.users(id) on delete cascade,
  subject_id    text not null,
  topic_id      text not null,
  question_key  text not null,
  miss_count    int not null default 1,
  last_missed_at timestamptz not null default now(),
  unique (user_id, subject_id, topic_id, question_key)
);

-- RLS: all study tables — user sees only own rows
do $$ declare t text; begin
  foreach t in array array[
    'event_log','user_subject_state','study_topic_stats','study_xp_ledger','study_quiz_attempts',
    'study_reward_purchases','study_daily_counters','study_question_misses'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format(
      'drop policy if exists %I_own on public.%I;
       create policy %I_own on public.%I
         for all to authenticated
         using ((select auth.uid()) = user_id)
         with check ((select auth.uid()) = user_id)',
      t, t, t, t
    );
  end loop;
end $$;
