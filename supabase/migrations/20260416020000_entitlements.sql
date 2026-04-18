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
  for select to authenticated using ((select auth.uid()) = user_id);

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
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.user_entitlements
    where user_id = p_user_id
      and (p_entitlement = any(entitlements) or 'olevel_all' = any(entitlements))
      and (access_to is null or access_to > now())
  );
$$;
