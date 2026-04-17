-- Parent dashboard: periodized activity + per-student parent-configured rewards.

-- ── 1) Per-student rewards catalog managed by the parent ────────────────────
create table if not exists public.student_rewards (
  id             uuid primary key default gen_random_uuid(),
  parent_user_id uuid not null references auth.users(id) on delete cascade,
  student_user_id uuid not null references auth.users(id) on delete cascade,
  label          text not null check (char_length(label) between 1 and 120),
  description    text,
  xp_cost        int  not null check (xp_cost >= 0),
  active         boolean not null default true,
  sort_order     int not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists student_rewards_parent_idx
  on public.student_rewards (parent_user_id, student_user_id, sort_order);

alter table public.student_rewards enable row level security;

-- Parent can manage rewards for their own linked students only.
drop policy if exists student_rewards_parent_rw on public.student_rewards;
create policy student_rewards_parent_rw on public.student_rewards
  for all to authenticated
  using (
    parent_user_id = (select auth.uid())
    and exists (
      select 1 from public.parent_student_links l
      where l.parent_user_id = (select auth.uid())
        and l.student_user_id = student_rewards.student_user_id
    )
  )
  with check (
    parent_user_id = (select auth.uid())
    and exists (
      select 1 from public.parent_student_links l
      where l.parent_user_id = (select auth.uid())
        and l.student_user_id = student_rewards.student_user_id
    )
  );

-- Students can read their OWN catalog (so a future client-side shop can list them).
drop policy if exists student_rewards_student_read on public.student_rewards;
create policy student_rewards_student_read on public.student_rewards
  for select to authenticated
  using (student_user_id = (select auth.uid()) and active = true);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end; $$;

drop trigger if exists trg_student_rewards_touch on public.student_rewards;
create trigger trg_student_rewards_touch
  before update on public.student_rewards
  for each row execute function public.touch_updated_at();

-- ── 2) Extend parent overview RPC with today / 7d / 30d splits ──────────────
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
      coalesce(sum(x.delta) filter (where x.created_at >= date_trunc('day', now())), 0) as xp_today,
      coalesce(sum(x.delta) filter (where x.created_at >= now() - interval '7 days'), 0) as xp_last_7d,
      coalesce(sum(x.delta) filter (where x.created_at >= now() - interval '30 days'), 0) as xp_last_30d,
      count(*) filter (where x.delta > 0 and x.created_at >= date_trunc('day', now())) as events_today,
      count(*) filter (where x.delta > 0 and x.created_at >= now() - interval '7 days') as events_7d,
      count(*) filter (where x.delta > 0 and x.created_at >= now() - interval '30 days') as events_30d
    from public.study_xp_ledger x
    where x.user_id in (select uid from linked_students)
    group by x.user_id
  ),
  student_topics as (
    select ts.user_id,
      count(distinct ts.topic_id) as studied_topics,
      max(ts.updated_at) as last_activity,
      count(distinct ts.topic_id) filter (where ts.updated_at >= date_trunc('day', now())) as touched_today,
      count(distinct ts.topic_id) filter (where ts.updated_at >= now() - interval '7 days')  as touched_7d,
      count(distinct ts.topic_id) filter (where ts.updated_at >= now() - interval '30 days') as touched_30d,
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
  ),
  student_rewards_catalog as (
    select sr.student_user_id as uid,
      jsonb_agg(jsonb_build_object(
        'id',          sr.id,
        'label',       sr.label,
        'description', sr.description,
        'xp_cost',     sr.xp_cost,
        'active',      sr.active,
        'sort_order',  sr.sort_order
      ) order by sr.sort_order, sr.created_at) as rewards
    from public.student_rewards sr
    where sr.parent_user_id = v_parent_id
    group by sr.student_user_id
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
      'xp_today',     coalesce(sx.xp_today, 0),
      'xp_last_7d',   coalesce(sx.xp_last_7d, 0),
      'xp_last_30d',  coalesce(sx.xp_last_30d, 0),
      'events_today', coalesce(sx.events_today, 0),
      'events_7d',    coalesce(sx.events_7d, 0),
      'events_30d',   coalesce(sx.events_30d, 0),
      'studied_topics', coalesce(st.studied_topics, 0),
      'touched_today',  coalesce(st.touched_today, 0),
      'touched_7d',     coalesce(st.touched_7d, 0),
      'touched_30d',    coalesce(st.touched_30d, 0),
      'last_activity',  coalesce(st.last_activity, p.created_at),
      'strong_topics',  coalesce(st.strong_topics, '[]'),
      'weak_topics',    coalesce(st.weak_topics, '[]'),
      'purchases',      coalesce(sp.purchases, 0),
      'recent_coupons', coalesce(sp.recent_coupons, '[]'),
      'rewards',        coalesce(src.rewards, '[]')
    ) order by coalesce(sx.xp_balance,0) desc
  ), '[]') into v_result
  from linked_students ls
  join public.profiles p on p.user_id = ls.uid
  left join student_xp sx on sx.user_id = ls.uid
  left join student_topics st on st.user_id = ls.uid
  left join student_purchases sp on sp.user_id = ls.uid
  left join student_ent se on se.user_id = ls.uid
  left join student_rewards_catalog src on src.uid = ls.uid;

  return jsonb_build_object('ok', true, 'students', v_result, 'generated_at', now());
end;
$$;
revoke all on function public.parent_get_students_overview() from public;
grant execute on function public.parent_get_students_overview() to authenticated;

-- ── 3) Parent CRUD RPCs for student_rewards ─────────────────────────────────
create or replace function public.parent_upsert_student_reward(
  p_student_user_id uuid,
  p_label text,
  p_xp_cost int,
  p_description text default null,
  p_id uuid default null,
  p_active boolean default true,
  p_sort_order int default 0
) returns uuid language plpgsql security definer set search_path = public as $$
declare
  v_parent uuid := auth.uid();
  v_id uuid;
begin
  if v_parent is null then raise exception 'unauthenticated'; end if;
  if not exists (
    select 1 from public.parent_student_links l
    where l.parent_user_id = v_parent and l.student_user_id = p_student_user_id
  ) then
    raise exception 'not_linked';
  end if;

  if p_id is null then
    insert into public.student_rewards (
      parent_user_id, student_user_id, label, description, xp_cost, active, sort_order
    ) values (v_parent, p_student_user_id, p_label, p_description, p_xp_cost, coalesce(p_active,true), coalesce(p_sort_order,0))
    returning id into v_id;
  else
    update public.student_rewards
       set label = p_label,
           description = p_description,
           xp_cost = p_xp_cost,
           active = coalesce(p_active, active),
           sort_order = coalesce(p_sort_order, sort_order)
     where id = p_id
       and parent_user_id = v_parent
       and student_user_id = p_student_user_id
    returning id into v_id;
    if v_id is null then raise exception 'not_found'; end if;
  end if;
  return v_id;
end; $$;
revoke all on function public.parent_upsert_student_reward(uuid,text,int,text,uuid,boolean,int) from public;
grant execute on function public.parent_upsert_student_reward(uuid,text,int,text,uuid,boolean,int) to authenticated;

create or replace function public.parent_delete_student_reward(p_id uuid)
returns boolean language plpgsql security definer set search_path = public as $$
declare v_parent uuid := auth.uid(); v_ok boolean;
begin
  if v_parent is null then raise exception 'unauthenticated'; end if;
  delete from public.student_rewards
   where id = p_id and parent_user_id = v_parent
  returning true into v_ok;
  return coalesce(v_ok, false);
end; $$;
revoke all on function public.parent_delete_student_reward(uuid) from public;
grant execute on function public.parent_delete_student_reward(uuid) to authenticated;
