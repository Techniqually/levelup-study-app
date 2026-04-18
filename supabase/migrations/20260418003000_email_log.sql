-- Outbound email log — one row per attempted send. Used for idempotency
-- (so we don't double-send purchase receipts on Stripe webhook retries) and
-- as an audit trail visible from the admin page.

create table if not exists public.email_log (
  id           bigserial primary key,
  user_id      uuid references auth.users(id) on delete set null,
  kind         text not null check (kind in (
    'welcome',
    'purchase_receipt',
    'entitlement_granted',
    'parent_invite',
    'admin_other'
  )),
  recipient    text not null,
  subject      text,
  provider     text not null default 'resend',
  provider_id  text,
  status       text not null check (status in ('queued','sent','failed')),
  error        text,
  -- Idempotency key: the caller derives this from a stable upstream id
  -- (e.g. stripe checkout session id for purchase receipts).
  idempotency_key text not null,
  meta         jsonb not null default '{}',
  sent_at      timestamptz not null default now()
);

create unique index if not exists email_log_idempotency_key_uq
  on public.email_log (kind, idempotency_key);

alter table public.email_log enable row level security;

-- No client access; service role only.
drop policy if exists email_log_deny_all on public.email_log;
create policy email_log_deny_all on public.email_log
  for all to anon, authenticated using (false) with check (false);
