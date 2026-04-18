-- Rebuild parent_get_students_overview() so it reads the structured
-- public.subject_entitlements table (the legacy user_entitlements.entitlements
-- text[] was dropped in 20260418002000). The JSON shape stays the same: an
-- entitlements text[] (now derived from distinct subject_slugs) and a
-- max(access_to) per student.

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
    -- Roll the structured rows up into an array of subject slugs and the
    -- furthest-out access_to per student. Expired rows are filtered out.
    select
      se.user_id,
      array_agg(distinct se.subject_slug) as entitlements,
      max(se.access_to) as access_to
    from public.subject_entitlements se
    where se.user_id in (select uid from linked_students)
      and (se.access_to is null or se.access_to > now())
    group by se.user_id
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
