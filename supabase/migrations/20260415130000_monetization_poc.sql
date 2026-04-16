-- Monetization POC: auth-linked entitlements, Stripe webhook idempotency,
-- and private storage access policies for paid subjects.

alter table public.profiles
  add column if not exists access_entitlements text[] not null default '{}'::text[];

alter table public.profiles
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_last_checkout_session text,
  add column if not exists stripe_last_event_id text,
  add column if not exists entitlements_updated_at timestamptz;

create table if not exists public.user_entitlements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  entitlements text[] not null default '{}'::text[],
  stripe_customer_id text,
  stripe_last_checkout_session text,
  stripe_last_event_id text,
  updated_at timestamptz not null default now()
);

create table if not exists public.stripe_webhook_events (
  id bigserial primary key,
  stripe_event_id text not null unique,
  stripe_event_type text not null,
  processed_at timestamptz not null default now(),
  payload jsonb not null default '{}'::jsonb
);

alter table public.user_entitlements enable row level security;
alter table public.stripe_webhook_events enable row level security;

drop policy if exists user_entitlements_select_own on public.user_entitlements;
create policy user_entitlements_select_own on public.user_entitlements
for select to authenticated
using (auth.uid() = user_id);

drop policy if exists user_entitlements_insert_own on public.user_entitlements;
create policy user_entitlements_insert_own on public.user_entitlements
for insert to authenticated
with check (auth.uid() = user_id);

drop policy if exists user_entitlements_update_own on public.user_entitlements;
create policy user_entitlements_update_own on public.user_entitlements
for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists stripe_webhook_events_none on public.stripe_webhook_events;
create policy stripe_webhook_events_none on public.stripe_webhook_events
for all to anon, authenticated
using (false)
with check (false);

grant select, insert, update on table public.user_entitlements to authenticated;

create unique index if not exists idx_user_entitlements_customer
  on public.user_entitlements(stripe_customer_id)
  where stripe_customer_id is not null;

insert into storage.buckets (id, name, public)
values ('study-materials', 'study-materials', false)
on conflict (id) do update set public = excluded.public;

create or replace function public.required_entitlement_for_subject(subject_slug text)
returns text
language sql
immutable
as $$
  select case lower(coalesce(subject_slug, ''))
    when 'chemistry' then 'olevel_chem'
    when 'physics' then 'olevel_phys'
    when 'geography' then 'olevel_geo'
    else null
  end;
$$;

drop policy if exists study_materials_paid_or_free_read on storage.objects;
create policy study_materials_paid_or_free_read on storage.objects
for select to authenticated
using (
  bucket_id = 'study-materials'
  and (
    split_part(name, '/', 2) = 'free'
    or split_part(name, '/', 1) = 'free'
    or exists (
      select 1
      from public.user_entitlements ue
      where ue.user_id = auth.uid()
        and (
          'olevel_all' = any (ue.entitlements)
          or public.required_entitlement_for_subject(split_part(name, '/', 1)) = any (ue.entitlements)
        )
    )
  )
);
