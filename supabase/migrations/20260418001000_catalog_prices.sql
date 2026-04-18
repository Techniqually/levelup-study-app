-- Pricing catalog: one row per Stripe SKU (subject single OR multi-subject bundle).
-- Stripe price IDs are filled in manually after products are created in the Stripe
-- dashboard; the row stays useful (display) even before that, but checkout will
-- refuse to issue sessions for rows where stripe_price_id is null.

create table if not exists public.catalog_prices (
  id            text primary key,             -- stable internal id, e.g. 'sg_olevel_chemistry' or 'sg_olevel_bundle3'
  country_code  text not null,
  class_code    text not null,
  kind          text not null check (kind in ('single','bundle')),
  subject_slug  text,                         -- non-null for kind='single', null for kind='bundle'
  bundle_slugs  text[],                       -- subjects included for kind='bundle' (must be non-empty)
  display_name  text not null,
  amount_cents  int  not null check (amount_cents >= 0),
  currency      text not null default 'sgd' check (currency ~ '^[a-z]{3}$'),
  stripe_price_id text,                       -- null until Stripe price is created
  sort_order    int  not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  foreign key (country_code, class_code) references public.catalog_classes(country_code, class_code) on delete restrict
);

alter table public.catalog_prices enable row level security;

-- Public can read catalog (so the pricing page renders without a session).
drop policy if exists catalog_prices_read on public.catalog_prices;
create policy catalog_prices_read on public.catalog_prices
  for select to anon, authenticated using (is_active);

-- Sanity: bundle has slugs, single has subject_slug
alter table public.catalog_prices drop constraint if exists catalog_prices_kind_check;
alter table public.catalog_prices add constraint catalog_prices_kind_check
  check (
    (kind = 'single' and subject_slug is not null and (bundle_slugs is null or array_length(bundle_slugs, 1) is null))
    or
    (kind = 'bundle' and subject_slug is null and bundle_slugs is not null and array_length(bundle_slugs, 1) >= 2)
  );

-- Seed the SG O-Level catalog (Stripe price IDs left null — fill in after dashboard setup).
insert into public.catalog_prices
  (id, country_code, class_code, kind, subject_slug, bundle_slugs, display_name, amount_cents, currency, sort_order)
values
  ('sg_olevel_chemistry', 'sg','olevel','single','chemistry', null,
    'O-Level Chemistry',  2900, 'sgd', 10),
  ('sg_olevel_physics',   'sg','olevel','single','physics',   null,
    'O-Level Physics',    2900, 'sgd', 20),
  ('sg_olevel_geography', 'sg','olevel','single','geography', null,
    'O-Level Geography',  2900, 'sgd', 30),
  ('sg_olevel_bundle3',   'sg','olevel','bundle', null,
    array['chemistry','physics','geography'],
    'O-Level All 3 Subjects', 6900, 'sgd', 100)
on conflict (id) do nothing;
