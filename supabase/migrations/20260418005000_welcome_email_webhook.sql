-- Fire a welcome email on first profile insert by calling the API's
-- /internal/email/welcome endpoint from inside Postgres. The endpoint is
-- idempotent (email_log + unique idempotency_key) so retries are safe.
--
-- Requires the pg_net extension (shipped with Supabase). The API base URL
-- and the shared internal secret are read from Postgres GUCs that the
-- Supabase dashboard lets you set as "custom parameters"; set them once:
--
--   alter database postgres set app.api_base_url = 'https://api.levelupstudyhub.com';
--   alter database postgres set app.internal_webhook_secret = 'change-me';
--
-- If either GUC is blank the trigger is a no-op (useful for local dev that
-- doesn't want to reach out to an external host).

create extension if not exists pg_net with schema extensions;

create or replace function public._trigger_welcome_email()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_base   text := coalesce(nullif(current_setting('app.api_base_url', true), ''), '');
  v_secret text := coalesce(nullif(current_setting('app.internal_webhook_secret', true), ''), '');
  v_url    text;
begin
  if v_base = '' or v_secret = '' then
    return new;
  end if;
  v_url := v_base || '/internal/email/welcome';

  perform extensions.http_post(
    url := v_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'X-Internal-Secret', v_secret
    ),
    body := jsonb_build_object(
      'user_id', new.user_id::text,
      'email', coalesce((
        select u.email from auth.users u where u.id = new.user_id
      ), ''),
      'display_name', new.display_name
    ),
    timeout_milliseconds := 4000
  );
  return new;
exception when others then
  -- We never want a mail failure to block profile creation.
  raise warning 'welcome email trigger failed: %', sqlerrm;
  return new;
end;
$$;

drop trigger if exists tr_profiles_welcome_email on public.profiles;

create trigger tr_profiles_welcome_email
after insert on public.profiles
for each row execute function public._trigger_welcome_email();

revoke all on function public._trigger_welcome_email() from public;
