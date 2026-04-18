-- Helper to check whether the current authenticated user is an admin.
-- profiles.role already exists with check ('student','parent','admin').

create or replace function public.is_admin(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where user_id = p_user_id
      and role = 'admin'
  );
$$;

-- Allow an admin to read every profile row (everyone else is restricted by
-- the existing profiles_select_own policy).
drop policy if exists profiles_select_admin on public.profiles;
create policy profiles_select_admin on public.profiles
  for select to authenticated
  using (public.is_admin((select auth.uid())));
