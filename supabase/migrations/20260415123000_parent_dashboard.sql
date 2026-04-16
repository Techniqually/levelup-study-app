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

