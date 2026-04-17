# LevelUp! — Commercial PoC: Revised Implementation Plan (v2)

> [!NOTE]
> **Routing update (post-v2):** the public root is now `web/index.html` (landing). The signed-in subject hub has been renamed to `web/hub.html`. Any references in this document to `landing.html` map to the current `index.html`, and references to `index.html` (as the hub) map to `hub.html`. See `tasks.md` Phase 9 for the full cross-file rename log.

## Summary of Changes from v1

| Topic | v1 | v2 (This Plan) |
|---|---|---|
| Supabase config delivery | `app-config.js` committed with anon keys | **Public `/config` API endpoint** — client fetches at startup, saves to localStorage |
| `projects` table | Keep (single seed row) | **Drop entirely** — remove `project_id` from all tables |
| Parent auth | PIN + SHA-256 token | **Supabase Google auth** — same as students; `parent_student_links` table |
| Backward compatibility | Incremental | **Fresh start** — full schema rewrite |
| Identity model | Single student assumed | **Flexible: solo student OR parent+child, both supported** |

---

## Part 0: Identity, Access & Business Model Design

This is the most important design decision — everything downstream flows from it.

### 0.1 — The Three User Archetypes

| Archetype | Signs up | Pays | Studies | Can see progress dashboard |
|---|---|---|---|---|
| **Solo student** (e.g. older teen, self-directed) | Themselves | Themselves | Yes | Their own progress (self-view) |
| **Child student** (e.g. 12–15 yr old) | Parent invites them | Parent pays | Yes | Parent monitors; student sees their own |
| **Parent only** | Themselves | Yes | **No — blocked by RLS** | Their linked children only |

> [!IMPORTANT]
> **Recommendation: Don't force the parent-student architecture.** Support both solo and family modes. A student can sign up, pay, and study without ever involving a parent. The parent dashboard is an *optional add-on*, not a prerequisite.

### 0.2 — Entitlement Model (Core Rule)

**The entitlement always lives on the account that does the studying (`student_user_id`), never on the parent account.**

- Content access in Supabase Storage checks `user_has_entitlement(auth.uid())` — the currently logged-in user's UID
- `subject-config.js` enforces the same check client-side
- A parent's `user_id` has **no entitlements** → they are blocked from `subject.html` even if they try directly
- This is enforced at two layers: client-side redirect + server-side RLS on storage

### 0.3 — Signup & Linking Flows

#### Flow A: Solo Student (Self-Serve)
```
Student opens landing.html
  → "Get started" → Google sign-in
  → Hub shows free preview (Topic 1, no payment needed)
  → "Unlock full Chemistry" → Stripe checkout (client_reference_id = student.uid)
  → Webhook fires → entitlement added to student.uid
  → Subjects unlock immediately
  → (Optional later) Student can generate a "parent invite" from their settings
```

#### Flow B: Parent-Initiated (Family)
```
Parent opens landing.html
  → "I'm a parent" / "Buy for my child" CTA
  → Google sign-in as parent
  → Parent dashboard → "Add student" → enters child's email address
  → System creates pending_parent_invites row + sends invite link (via API/Edge Function)
  → Child clicks invite link → Google sign-in with that email
  → parent_student_links row confirmed automatically
  → Parent pays Stripe checkout (passes both parent_uid + student_uid in metadata)
  → Webhook fires → entitlement added to student.uid ONLY + link confirmed
  → Child can now study; parent can monitor
```

#### Flow C: Student-Led with Parent Added Later
```
Student signs up + pays (Flow A)
  → In settings: "Invite a parent to monitor my progress"
  → Enters parent email → pending invite sent
  → Parent signs up → link created
  → Parent can now see progress (read-only)
  → Parent has NO new entitlements (student already has them)
```

### 0.4 — Loopholes & How We Close Them

#### 🔓 Loophole 1: "Parent logs in and accesses student content"
**Attack:** Parent signs up, gets linked to student, then tries to open `subject.html?subject=chemistry`.
**Close:** `subject-config.js` calls `LevelupAuth.isSubjectEntitled('chemistry')` which checks `user_has_entitlement(auth.uid())`. Parent's UID has no entitlements → immediate redirect to hub with "locked" state. Storage RLS also blocks the content download.

#### 🔓 Loophole 2: "One subscription, two studying accounts"
**Attack:** Parent pays Stripe with `student_user_id` in metadata. Both parent and student try to study.
**Close:** Webhook writes entitlement to `student_user_id` only. Parent UID never gets an entitlement. Enforced by RLS at storage level — no client-side bypass possible.

#### 🔓 Loophole 3: "Family shares student login credentials"
**Attack:** One paid student account, multiple family members log in using same Google account / shared device.
**Close:** This is a real risk with any SaaS — standard approach is per-seat pricing. For PoC: acceptable. For production: device fingerprinting or concurrent session limits. **Flag as known V2 issue.**

#### 🔓 Loophole 4: "Student creates two Google accounts"
**Attack:** Student pays with Account A, then studies on Account B (free).
**Close:** Each Google account is a separate `auth.users` entry with no entitlement. Account B has no subscription → locked. This is the standard model — acceptable.

#### 🔓 Loophole 5: "Parent links 5 children to 1 subscription"
**Attack:** Parent pays once (one entitlement written to `student_uid_1`), manually tries to call an admin endpoint to link more children.
**Close:** Stripe webhook writes entitlement to exactly one `client_reference_id`. Admin link endpoint requires explicit `student_user_id` per call. The system grants one entitlement per completed Stripe checkout. **Each student needs their own subscription.**

#### 🔓 Loophole 6: "Parent invite spoofing — I send invite to stranger's email"
**Attack:** Malicious parent adds a stranger's email as their student.
**Close:** The invite creates a `pending_parent_invites` row. The stranger must click the link AND sign in with that exact Google account (email verified by Google). If they don't accept, no link is created. Invites expire after 7 days.

#### 🔓 Loophole 7: "Student rejects parent after being monitored"
**Business case:** Older teen no longer wants parent visibility.
**Handle:** Student can unlink a parent from their settings. Parents cannot re-link without student accepting a new invite. **Add to roadmap.**

#### 🔓 Loophole 8: "Entitlement doesn't expire on time"
**Attack:** `access_to` passes, but frontend cached the entitlement.
**Close:** `user_has_entitlement()` in Postgres checks `access_to > now()` server-side. Storage RLS also enforces this. Client-side `fetchEntitlements()` should bust cache on every subject load (not just on sign-in). Set short cache TTL (5 minutes).

### 0.5 — Free Preview Strategy

For users who sign up but haven't paid yet:

- **Free topic**: `chemistry/free/topic-01.js` in storage (path contains `/free/`) — accessible to any authenticated user per the storage RLS policy already in place
- **Hub shows**: "Try Topic 1 free" as a separate CTA on the chemistry card
- **`subject-config.js`** allows access to `subject.html?subject=chemistry&preview=1` without entitlement check, but only loads the free topic from the manifest
- **Admin control**: A flag in `topics-manifest.json` (`"free": true` on a topic entry) determines what's in the free tier. Changing this in the manifest JSON and re-uploading to Storage is the "admin toggle" — no database change required
- **Upgrade prompt**: At the end of the free topic, show a modal: "You've completed the free preview. Unlock all 19 topics →"

### 0.6 — Roles in `profiles` Table

Roles are **soft labels** (not hard access controls — that's done by entitlements + RLS):

| Role | Set when | Purpose |
|---|---|---|
| `student` | Default on signup | Studies content |
| `parent` | Set when parent creates a child invite (optional for solo students) | UI hint only — shows parent dashboard by default |
| `admin` | Manually set in DB by operator | Access to admin pages |

A parent can also be `student` (e.g. a 35-year-old upskilling). Roles don't gate reading content — **entitlements do**.

### 0.7 — Decisions Summary

| Decision | Choice |
|---|---|
| Force parent-student pairing? | **No** — solo students fully supported |
| Who pays? | Either parent or student — Stripe `client_reference_id` = the student `user_id` |
| How does parent get linked? | Email invite → student accepts via sign-in link |
| Can parent access study content? | **No** — no entitlement on parent account, blocked by RLS |
| Free preview | First topic of each subject, accessible to any authenticated user |
| One sub per student? | **Yes** — entitlement tied to one `user_id` per checkout |
| Expiry enforcement | Server-side in Postgres `user_has_entitlement()` + short client cache TTL |

---

## Architecture Overview (Post-Refactor)

```
Browser (vanilla HTML/JS)
  │
  ├─ [First load] GET /config ─────────────► FastAPI → { supabaseUrl, supabaseAnonKey }
  │    └── Cached in localStorage; Supabase client initialised
  │
  ├─ Google OAuth ──────────────────────────► Supabase Auth (JWT)
  │
  ├─ [Solo flow] Student pays Stripe ──────► checkout.session.completed webhook
  │    └── FastAPI writes entitlement to student user_id
  │
  ├─ [Family flow] Parent invites child email
  │    └── POST /invite/parent → pending_parent_invites row + email
  │    └── Child clicks link → signs in → link confirmed → parent pays Stripe
  │    └── Webhook writes entitlement to student.uid + confirms parent_student_links
  │
  ├─ Study content ─────────────────────────► Supabase Storage (study-materials, private)
  │    └── RLS: authenticated + user_has_entitlement(auth.uid(), subject)
  │    └── Free path (chemistry/free/*): any authenticated user
  │
  ├─ LLM quiz explain ── POST /llm/quiz-explain (Bearer: Supabase JWT)
  │    └── Server verifies JWT, rate-limits per user_id, calls OpenAI
  │
  └─ Parent dashboard ─────────────────────► parent_get_students_overview() RPC
       └── Auth-gated: only returns rows where parent_user_id = auth.uid()
       └── Parent CANNOT access study content (no entitlement on parent account)
```

---

## Part 1: Database Schema Rewrite

### Design Principles (Fresh Start)
- No `projects` table — single app, single Supabase instance
- Identity = `auth.users.id` (UUID from Supabase Auth) — not a custom `student_id` + `device_id`
- All study tables keyed by `user_id uuid references auth.users(id)`
- RLS gates everything by `auth.uid() = user_id`
- Parent access via `parent_student_links` (no PINs)
- Subscription expiry tracked in `user_entitlements`

### [DELETE ALL] `supabase/migrations/202604151*.sql`
All five existing migrations are replaced. Fresh migration files:

---

#### [NEW] `supabase/migrations/20260416_000_extensions.sql`
```sql
create extension if not exists pgcrypto;
```

---

#### [NEW] `supabase/migrations/20260416_010_profiles.sql`
```sql
-- One profile per auth user (created on first sign-in)
create table if not exists public.profiles (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  role       text not null default 'student' check (role in ('student', 'parent', 'admin')),
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- Trigger: auto-create profile on Google sign-up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (user_id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create policy "profiles_select_own" on public.profiles
  for select to authenticated using (auth.uid() = user_id);
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth.uid() = user_id);
```

---

#### [NEW] `supabase/migrations/20260416_020_entitlements.sql`
```sql
-- Entitlements: what subjects a user can access, and for how long
create table if not exists public.user_entitlements (
  user_id      uuid primary key references auth.users(id) on delete cascade,
  entitlements text[] not null default '{}',
  access_from  timestamptz,
  access_to    timestamptz,        -- NULL = never expires
  stripe_customer_id            text,
  stripe_last_checkout_session  text,
  stripe_last_event_id          text,
  updated_at   timestamptz not null default now()
);
alter table public.user_entitlements enable row level security;

create policy "entitlements_select_own" on public.user_entitlements
  for select to authenticated using (auth.uid() = user_id);

-- Webhook idempotency (no RLS read; service role only)
create table if not exists public.stripe_webhook_events (
  id               bigserial primary key,
  stripe_event_id  text not null unique,
  stripe_event_type text not null,
  processed_at     timestamptz not null default now(),
  payload          jsonb not null default '{}'
);
alter table public.stripe_webhook_events enable row level security;
create policy "stripe_events_deny_all" on public.stripe_webhook_events
  for all to anon, authenticated using (false) with check (false);

-- Helper: check if user has a specific entitlement and it hasn't expired
create or replace function public.user_has_entitlement(p_user_id uuid, p_entitlement text)
returns boolean language sql stable security definer as $$
  select exists (
    select 1 from public.user_entitlements
    where user_id = p_user_id
      and (p_entitlement = any(entitlements) or 'olevel_all' = any(entitlements))
      and (access_to is null or access_to > now())
  );
$$;
```

---

#### [NEW] `supabase/migrations/20260416_030_parent_links.sql`
```sql
-- Parent → student linking
create table if not exists public.parent_student_links (
  parent_user_id  uuid not null references auth.users(id) on delete cascade,
  student_user_id uuid not null references auth.users(id) on delete cascade,
  label           text,   -- optional: parent's nickname for the child ("Emma")
  created_at      timestamptz not null default now(),
  primary key (parent_user_id, student_user_id)
);
alter table public.parent_student_links enable row level security;

create policy "parent_reads_own_links" on public.parent_student_links
  for select to authenticated using (auth.uid() = parent_user_id);
-- Only service_role can insert (admin/webhook creates the link at purchase time)

-- Pending invites (parent adds child email; child must accept by signing in)
create table if not exists public.pending_parent_invites (
  id              uuid primary key default gen_random_uuid(),
  parent_user_id  uuid not null references auth.users(id) on delete cascade,
  invited_email   text not null,
  label           text,              -- parent's name for the child
  accepted        boolean not null default false,
  created_at      timestamptz not null default now(),
  expires_at      timestamptz not null default now() + interval '7 days'
);
alter table public.pending_parent_invites enable row level security;
-- Parent can see their own sent invites; no public access
create policy "parent_reads_own_invites" on public.pending_parent_invites
  for select to authenticated using (auth.uid() = parent_user_id);

-- RPC: called client-side when child signs in via invite link
-- Accepts invite matching auth.uid()'s email, creates confirmed link
create or replace function public.accept_parent_invite(p_invite_id uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_invite public.pending_parent_invites;
  v_email  text;
begin
  select * into v_invite from public.pending_parent_invites
  where id = p_invite_id and not accepted and expires_at > now();
  if not found then
    return jsonb_build_object('ok', false, 'error', 'invite_not_found_or_expired');
  end if;
  -- Verify the calling user's email matches the invite
  select email into v_email from auth.users where id = auth.uid();
  if lower(v_email) <> lower(v_invite.invited_email) then
    return jsonb_build_object('ok', false, 'error', 'email_mismatch');
  end if;
  -- Create confirmed link
  insert into public.parent_student_links(parent_user_id, student_user_id, label)
  values (v_invite.parent_user_id, auth.uid(), v_invite.label)
  on conflict do nothing;
  -- Mark invite accepted
  update public.pending_parent_invites set accepted = true where id = p_invite_id;
  return jsonb_build_object('ok', true, 'parent_user_id', v_invite.parent_user_id);
end;
$$;
revoke all on function public.accept_parent_invite(uuid) from public;
grant execute on function public.accept_parent_invite(uuid) to authenticated;
```

---

#### [NEW] `supabase/migrations/20260416_040_study_tables.sql`
```sql
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
         using (auth.uid() = user_id)
         with check (auth.uid() = user_id)',
      t, t, t, t
    );
  end loop;
end $$;
```

---

#### [NEW] `supabase/migrations/20260416_050_parent_dashboard_rpc.sql`
```sql
-- Parent fetches their linked students' stats (auth-gated, no PIN)
create or replace function public.parent_get_students_overview()
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_parent_id uuid := auth.uid();
  v_result    jsonb;
begin
  if v_parent_id is null then
    return jsonb_build_object('ok', false, 'error', 'unauthenticated');
  end if;

  with linked_students as (
    select l.student_user_id as uid, l.label
    from public.parent_student_links l
    where l.parent_user_id = v_parent_id
  ),
  student_xp as (
    select
      x.user_id,
      coalesce(sum(x.delta), 0) as xp_balance,
      count(*) filter (where x.delta > 0) as xp_events,
      coalesce(sum(x.delta) filter (where x.created_at >= now() - interval '7 days'), 0) as xp_last_7d
    from public.study_xp_ledger x
    where x.user_id in (select uid from linked_students)
    group by x.user_id
  ),
  student_topics as (
    select ts.user_id,
      count(distinct ts.topic_id) as studied_topics,
      max(ts.updated_at) as last_activity,
      jsonb_agg(jsonb_build_object('topic_id',ts.topic_id,'mastery',ts.mastery,'seen',ts.seen))
        filter (where ts.mastery >= 80) as strong_topics,
      jsonb_agg(jsonb_build_object('topic_id',ts.topic_id,'mastery',ts.mastery,'seen',ts.seen))
        filter (where ts.seen > 0 and ts.mastery < 55) as weak_topics
    from public.study_topic_stats ts
    where ts.user_id in (select uid from linked_students)
    group by ts.user_id
  ),
  student_purchases as (
    select rp.user_id, count(*) as purchases,
      jsonb_agg(jsonb_build_object(
        'reward_id',rp.reward_id,'reward_label',rp.reward_label,
        'xp_cost',rp.xp_cost,'coupon_code',rp.coupon_code,
        'purchased_at',rp.purchased_at,'claimed_at',rp.claimed_at
      ) order by rp.purchased_at desc) as recent_coupons
    from public.study_reward_purchases rp
    where rp.user_id in (select uid from linked_students)
    group by rp.user_id
  ),
  student_ent as (
    select ue.user_id, ue.entitlements, ue.access_to
    from public.user_entitlements ue
    where ue.user_id in (select uid from linked_students)
  )
  select coalesce(jsonb_agg(
    jsonb_build_object(
      'user_id',      ls.uid,
      'display_name', coalesce(ls.label, p.display_name, '(unnamed)'),
      'avatar_url',   p.avatar_url,
      'entitlements', coalesce(se.entitlements, '{}'),
      'access_to',    se.access_to,
      'xp_balance',   coalesce(sx.xp_balance, 0),
      'xp_events',    coalesce(sx.xp_events, 0),
      'xp_last_7d',   coalesce(sx.xp_last_7d, 0),
      'studied_topics', coalesce(st.studied_topics, 0),
      'last_activity',  coalesce(st.last_activity, p.created_at),
      'strong_topics',  coalesce(st.strong_topics, '[]'),
      'weak_topics',    coalesce(st.weak_topics, '[]'),
      'purchases',      coalesce(sp.purchases, 0),
      'recent_coupons', coalesce(sp.recent_coupons, '[]')
    ) order by coalesce(sx.xp_balance,0) desc
  ), '[]') into v_result
  from linked_students ls
  join public.profiles p on p.user_id = ls.uid
  left join student_xp sx on sx.user_id = ls.uid
  left join student_topics st on st.user_id = ls.uid
  left join student_purchases sp on sp.user_id = ls.uid
  left join student_ent se on se.user_id = ls.uid;

  return jsonb_build_object('ok', true, 'students', v_result, 'generated_at', now());
end;
$$;
revoke all on function public.parent_get_students_overview() from public;
grant execute on function public.parent_get_students_overview() to authenticated;
```

---

#### [NEW] `supabase/migrations/20260416_060_storage.sql`
```sql
insert into storage.buckets (id, name, public)
values ('study-materials', 'study-materials', false)
on conflict (id) do update set public = excluded.public;

-- helper (immutable, used in storage RLS)
create or replace function public.required_entitlement_for_subject(subject_slug text)
returns text language sql immutable as $$
  select case lower(coalesce(subject_slug,''))
    when 'chemistry' then 'olevel_chem'
    when 'physics'   then 'olevel_phys'
    when 'geography' then 'olevel_geo'
    else null
  end;
$$;

drop policy if exists study_materials_read on storage.objects;
create policy study_materials_read on storage.objects
  for select to authenticated
  using (
    bucket_id = 'study-materials'
    and (
      -- free preview path: <subject>/free/<file>
      split_part(name, '/', 2) = 'free'
      -- entitled access
      or public.user_has_entitlement(
          auth.uid(),
          public.required_entitlement_for_subject(split_part(name, '/', 1))
         )
    )
  );
```

---

#### [NEW] `supabase/migrations/20260416_070_grants.sql`
```sql
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on table
  public.profiles, public.user_entitlements,
  public.event_log, public.study_topic_stats,
  public.study_xp_ledger, public.study_quiz_attempts,
  public.study_reward_purchases, public.study_daily_counters,
  public.study_question_misses
to authenticated;
grant usage, select on all sequences in schema public to authenticated;
alter default privileges in schema public
  grant select, insert, update, delete on tables to authenticated;
alter default privileges in schema public
  grant usage, select on sequences to authenticated;
```

---

## Part 2: API Changes

### [MODIFY] `api/app/main.py`

#### Add: `GET /config` — public, no auth
```python
@app.get("/config")
async def get_client_config() -> dict:
    """
    Returns public Supabase config for the frontend to bootstrap itself.
    The anon key is intentionally public — it has no elevated permissions.
    """
    return {
        "supabaseUrl":     settings.supabase_url,
        "supabaseAnonKey": settings.supabase_anon_key_public,
    }
```

This endpoint:
- Is **not** behind the JWT middleware (path doesn't start with `/llm/`)
- Returns only the public anon key (same one that would be committed in the old `app-config.js`)
- Allows the frontend to self-configure with zero manual setup

#### Add to `Settings` in `main.py`:
```python
supabase_anon_key_public: str = Field(
    default="", validation_alias="SUPABASE_ANON_KEY_PUBLIC"
)
```

#### Add `.env` entry:
```
SUPABASE_ANON_KEY_PUBLIC=eyJ...   # the browser-safe anon key (not service role)
```

#### Add: `POST /admin/link-student` — service-role only (PoC admin helper)
```python
@app.post("/admin/link-student")
async def link_student(body: LinkStudentBody, request: Request) -> dict:
    # Requires service-role JWT or a special admin API key header
    # Creates a parent_student_links row
```

#### [MODIFY] `api/app/stripe_webhook.py`
After `upsert_entitlement_from_stripe()`, also call a new `link_parent_student()` function if `metadata.parent_user_id` is present in the Stripe session metadata.

---

## Part 3: Frontend Changes

### 3.1 — New Startup Bootstrap (`app-config.js` replaced with API call)

#### [NEW] `web/js/shell/bootstrap.js`
```js
/**
 * Bootstrap: fetch Supabase config from API, save to localStorage, then
 * dispatch 'levelup:config-ready' so downstream scripts can initialize.
 *
 * API_BASE_URL is the ONLY thing hardcoded (just the domain, not sensitive).
 */
(function () {
  var API_BASE = window.LEVELUP_API_BASE || "https://api.levelupstudyhub.com";

  function initFromConfig(cfg) {
    if (!cfg || !cfg.supabaseUrl || !cfg.supabaseAnonKey) {
      document.dispatchEvent(new CustomEvent('levelup:config-error', {
        detail: { message: 'Config endpoint returned invalid data' }
      }));
      return;
    }
    localStorage.setItem("SUPABASE_URL",      cfg.supabaseUrl);
    localStorage.setItem("SUPABASE_ANON_KEY", cfg.supabaseAnonKey);
    window.SUPABASE_URL      = cfg.supabaseUrl;
    window.SUPABASE_ANON_KEY = cfg.supabaseAnonKey;
    document.dispatchEvent(new CustomEvent('levelup:config-ready'));
  }

  var cached = localStorage.getItem("SUPABASE_URL");
  if (cached) {
    // Already have config — use immediately, refresh in background
    window.SUPABASE_URL      = cached;
    window.SUPABASE_ANON_KEY = localStorage.getItem("SUPABASE_ANON_KEY") || "";
    document.dispatchEvent(new CustomEvent('levelup:config-ready'));
    // Background refresh (picks up URL changes on redeploy)
    fetch(API_BASE + "/config")
      .then(function(r){ return r.json(); })
      .then(function(cfg) {
        localStorage.setItem("SUPABASE_URL",      cfg.supabaseUrl);
        localStorage.setItem("SUPABASE_ANON_KEY", cfg.supabaseAnonKey);
      })
      .catch(function(){});
    return;
  }

  // First visit — must fetch before proceeding
  fetch(API_BASE + "/config")
    .then(function(r) { return r.json(); })
    .then(initFromConfig)
    .catch(function(e) {
      document.dispatchEvent(new CustomEvent('levelup:config-error', {
        detail: { message: String(e) }
      }));
    });
})();
```

#### [NEW] `web/js/shell/api-config.js` (tiny, the only hardcoded value)
```js
// The only configuration needed on the client.
// This is NOT sensitive — it's just a domain name.
window.LEVELUP_API_BASE = "https://api.levelupstudyhub.com";
// For local dev, override in browser console or serve with a dev config file.
```

For local dev, a dev version is:
```js
window.LEVELUP_API_BASE = "http://localhost:8080";
```

---

### 3.2 — Boot Order Change

#### [MODIFY] `web/js/shell/write-hub-tail-scripts.js`
New load order:
1. `js/shell/api-config.js` (sets `LEVELUP_API_BASE`)
2. `js/shell/bootstrap.js` (fetches `/config`, fires `levelup:config-ready`)
3. `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`
4. `js/features/auth/auth-client.js`
5. `js/features/auth/auth-ui.js`
6. `js/shell/hub-setup.js`

Steps 3–6 wait for `levelup:config-ready` event before executing.

#### [MODIFY] `web/js/shell/write-subject-tail-scripts.js` — same pattern

#### [MODIFY] `web/js/shell/write-parent-tail-scripts.js` — same pattern, plus auth scripts

---

### 3.3 — Deletions

| File | Action |
|---|---|
| `web/js/shell/setup-forms.js` | **Delete** |
| `web/js/core/transfer-ui.js` | **Delete** |
| `web/js/shell/asset-version.js` | **Keep** (cache busting, unchanged) |

Remove from HTML:
- All `btn-setup-package` buttons from `index.html`, `parent.html`, `subject.html`
- Entire "Setup package" section from settings modal in `subject.html`
- Entire "Transfer progress between browsers" section from settings modal
- `btn-offline-defaults` from `index.html`

---

### 3.4 — Auth: Google-Only

#### [MODIFY] `web/js/features/auth/auth-ui.js`
Replace the entire modal with:
```html
<div class='lu-panel'>
  <h2>Welcome to LevelUp!</h2>
  <p class='lu-lead'>Sign in with your Google account to access your subjects and track your progress.</p>
  <button type='button' id='lu-auth-google' class='lu-google-btn'>
    <svg><!-- Google G logo SVG --></svg>
    Continue with Google
  </button>
  <div id='lu-auth-err' class='lu-err' hidden></div>
  <button type='button' id='lu-auth-cancel' class='lu-ghost'>Cancel</button>
</div>
```

#### [MODIFY] `web/js/features/auth/auth-client.js`
- Remove `signInWithPassword()`, `signUpWithPassword()`
- Fix `isSubjectEntitled()`: default to **false** for unknown subjects (not `true`)
- Add expiry check against `access_to` from `user_entitlements`

---

### 3.5 — New Landing Page

#### [NEW] `web/landing.html`
Full marketing landing page:
- **Hero**: "Ace your O-Levels with LevelUp!" — CTA "Get started free → Google sign-in"
- **Features**: Quiz engine, Boss battles, XP shop, AI tutor, Parent dashboard
- **Social proof**: Subject count, topic count
- **Pricing**: Free (Topic 1 preview) → Paid (full subject)
- **Footer**: links, contact

Unauthenticated root URL → `landing.html`. After sign-in → `index.html` (hub).

---

### 3.6 — Hub Simplification

#### [MODIFY] `web/index.html`
- Remove setup-banner, offline defaults, setup-package button
- Add topbar: LevelUp! logo + signed-in user name + avatar + sign-out button
- Redirect unauthenticated users to `landing.html`
- Subject cards: locked ones show "Upgrade →" (linking to Stripe payment link or landing pricing section)

#### [MODIFY] `web/js/shell/hub-setup.js`
- Remove all `hasSupabaseKeys()` logic
- Two states only: **not signed in** → show Google sign-in, **signed in** → show hub
- All subject locking enforced for all three subjects (not just chemistry)

---

### 3.7 — Parent Dashboard Rearchitecture

#### [MODIFY] `web/parent.html`
- Remove project-code, parent-code, remember-code inputs entirely
- Add Google sign-in flow (same `auth-ui.js`)
- After sign-in: call `parent_get_students_overview()` RPC
- Show linked students with their stats, subscription expiry, strong/weak topics, coupons

#### [MODIFY] `web/js/parent-dashboard.js`
- Remove all PIN/token logic (all of `saveToken`, `loadToken`, `clearToken`, `sha256Hex`, `applyParentDefaults`)
- Replace `loadData()` with:
  ```js
  async function loadData() {
    var sb = window.LevelupAuth.getClient();
    var res = await sb.rpc('parent_get_students_overview');
    // render res.data.students
  }
  ```
- Add subscription expiry display per student
- Add "Link a student" helper (for admin PoC: shows the student's user_id to give to admin)

#### [MODIFY] `web/js/shell/write-parent-tail-scripts.js`
Add Supabase CDN + auth-client.js + auth-ui.js to load chain.

---

### 3.8 — Settings Modal (Student-facing)

#### [MODIFY] `web/subject.html` — Settings panel
**Keep:** Unlock all topics toggle, Hard mode toggle, Open study report  
**Remove:** Setup package section, LLM proxy setup section, Transfer progress section  
**Add:** "Signed in as: [name]" + Sign-out button

---

### 3.9 — Analytics (Umami)

#### [MODIFY] All HTML pages (`landing.html`, `index.html`, `subject.html`, `parent.html`)
Add to `<head>`:
```html
<script async src="https://analytics.umami.is/script.js"
        data-website-id="UMAMI_WEBSITE_ID"
        data-domains="levelupstudyhub.com"></script>
```

Key `data-umami-event` attributes:
```html
<!-- Landing -->
<button data-umami-event="hero-cta-click">Get started</button>
<a data-umami-event="pricing-click">View pricing</a>

<!-- Hub -->
<a data-umami-event="subject-open" data-umami-event-subject="chemistry">...</a>
<button data-umami-event="signin-google">...</button>
<button data-umami-event="signout">...</button>

<!-- Subject app -->
<button data-umami-event="quiz-start">...</button>
<button data-umami-event="shop-open">...</button>
<button data-umami-event="llm-explain-click">Why?</button>
```

Future migration to Plausible: swap script tag, rename attributes `data-umami-event` → `data-event-name` (one grep-and-replace).

---

## Part 5: Local State vs. Cloud Sync (Data Architecture)

### 5.1 — The Problem: What is Local vs. Cloud?
Currently, the app relies heavily on `localStorage` (via `state-schema.js`). Fast, offline-first interaction continues to be the best UX, but we need multi-device sync for a commercial product.

**Currently tracked locally AND explicitly synced to server tables:**
- XP entries (`study_xp_ledger`)
- Topic stats, mastery, strengths (`study_topic_stats`)
- Purchases and shop rewards (`study_reward_purchases`)
- Quiz attempts and misses

**Currently tracked ONLY locally (or via loosely structured JSON dumps):**
- Flashcard known/unknown statuses (`flashKnown`)
- Theme bosses beaten (`themeBossBeaten`)
- Daily challenge progress structure (`dailyChallenge`)
- Written exercise claims (`writtenClaims`)

### 5.2 — Solution: `user_subject_state` JSONB Table
We don't want to create 10 new relational tables for frontend-specific state nuances (like which flashcards are flipped). 

We added `public.user_subject_state` to the schema in Part 1. 

**Workflow:**
1. **Boot**: App starts, connects to Supabase, queries `public.user_subject_state`. If the server `updated_at` is newer than local, it overwrites local storage.
2. **Play**: User studies. App writes to local storage for zero-latency.
3. **Sync**: `progress-store.js` debounces and syncs back to `user_subject_state` in the background (alongside writing discrete rows for XP/Topic stats).
4. **Parent dashboard**, **Stats**, and **Leaderboards** rely on the structured tables (`study_xp_ledger`, `study_topic_stats`). The unstructured UI state relies on the JSON blob.

---

## Part 6: Removed Concepts Cleanup

| Old Concept | New Replacement |
|---|---|
| `projects` table | *(gone)* — single app |
| `project_id` on all tables | *(gone)* — `user_id` is the only key |
| `project_parent_access` table | *(gone)* — replaced by `parent_student_links` |
| `study_parent_student_overview_token(project_code, token)` RPC | `parent_get_students_overview()` (auth-gated) |
| `study_set_parent_code()` RPC | *(gone)* — no PIN model |
| `study_parent_update_student_name_token()` | New: `parent_update_student_name(student_uid, new_name)` |
| `study_parent_delete_student_token()` | New: `parent_unlink_student(student_uid)` |
| `LEVELUP_STUDENT_ID` / `LEVELUP_STUDENT_NAME` in localStorage | `auth.users.id` + `profiles.display_name` |
| Setup package (base64 config string) | `/config` endpoint |
| Transfer-progress (encrypted copy/paste) | Cloud sync via Supabase (always on) |
| `study_app_phase1_bkup.sql` | Delete |
| `supabase/set-parent-pass.sql` | Delete |

---

## Part 5: Supabase Progress Store Refactor

### [MODIFY] `web/js/progress-store.js` and `web/js/supabase-client.js`
- Replace `student_id` / `device_id` based identity with `auth.uid()` — the Supabase JS client sends the auth JWT automatically with every request
- Remove `profile_id` lookup (no more `profiles` table join per request — just use `auth.uid()` directly in RLS)
- Remove all `project_id` fields from upsert payloads

---

## Phased Execution

| Phase | Work | Est. |
|---|---|---|
| **P0 — DB Rewrite** | Write all 8 new migration files, run locally, verify RLS | 1 day |
| **P1 — API `/config` endpoint** | Add endpoint + env var, update CORS, test locally | 2 hrs |
| **P2 — Bootstrap + Auth** | `bootstrap.js`, `api-config.js`, Google-only auth-ui | 1 day |
| **P3 — Landing Page** | Full premium landing page HTML/CSS | 1 day |
| **P4 — Hub + Subject cleanup** | Remove legacy UI, simplify hub-setup, fix entitlement bug | half day |
| **P5 — Parent Dashboard** | Remap to Supabase auth + new RPC + pending invites flow | half day |
| **P6 — Progress Store & State Sync** | Replace project_id with auth.uid(), integrate `user_subject_state` sync | 1 day |
| **P7 — Analytics** | Umami script + event attributes | 2 hrs |
| **P8 — Admin helpers** | `/admin/link-student` API endpoint, minimal admin page | half day |

---

## Verification Plan

### After P0 (DB)
```bash
# Apply all migrations in order
supabase db reset --local
# Verify RLS in Supabase Studio: 
#   - anon user cannot read any study table
#   - authenticated user can only read their own rows
#   - parent can only read linked students via RPC
```

### After P1 (Config endpoint)
```bash
curl http://localhost:8080/config
# Should return: {"supabaseUrl": "...", "supabaseAnonKey": "..."}
```

### After P2 (Auth)
- Open `index.html` → redirects to `landing.html` (unauthenticated)
- Click "Get started" → Google OAuth → redirected back to hub
- No setup screens visible anywhere

### After P6 (Progress Store)
- Run `web/tests/integration.html` — all XP/shop/state suites pass
- Study a topic → XP appears in Supabase Studio under `study_xp_ledger` with correct `user_id`

### Full E2E
1. New user opens landing → signs in with Google → hub shows chemistry locked
2. Complete Stripe checkout (test mode) → webhook fires → `user_entitlements` updated → chemistry unlocks
3. Parent signs in → sees student card with stats, subscription expiry
4. Admin calls `/admin/link-student` → parent can see new student
