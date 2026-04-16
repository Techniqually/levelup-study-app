grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on table
  public.profiles, public.user_entitlements,
  public.event_log, public.study_topic_stats,
  public.study_xp_ledger, public.study_quiz_attempts,
  public.study_reward_purchases, public.study_daily_counters,
  public.study_question_misses, public.user_subject_state
to authenticated;
grant usage, select on all sequences in schema public to authenticated;
alter default privileges in schema public
  grant select, insert, update, delete on tables to authenticated;
alter default privileges in schema public
  grant usage, select on sequences to authenticated;
