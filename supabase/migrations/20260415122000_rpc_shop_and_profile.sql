

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
