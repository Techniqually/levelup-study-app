-- Parent → student linking
create table if not exists public.parent_student_links (
  parent_user_id  uuid not null references auth.users(id) on delete cascade,
  student_user_id uuid not null references auth.users(id) on delete cascade,
  label           text,   -- optional: parent's nickname for the child ("Emma")
  created_at      timestamptz not null default now(),
  primary key (parent_user_id, student_user_id)
);
alter table public.parent_student_links enable row level security;

create policy "parent_reads_own_links" on public.parent_student_links
  for select to authenticated using (auth.uid() = parent_user_id);
-- Only service_role can insert (admin/webhook creates the link at purchase time)

-- Pending invites (parent adds child email; child must accept by signing in)
create table if not exists public.pending_parent_invites (
  id              uuid primary key default gen_random_uuid(),
  parent_user_id  uuid not null references auth.users(id) on delete cascade,
  invited_email   text not null,
  label           text,              -- parent's name for the child
  accepted        boolean not null default false,
  created_at      timestamptz not null default now(),
  expires_at      timestamptz not null default now() + interval '7 days'
);
alter table public.pending_parent_invites enable row level security;
-- Parent can see their own sent invites; no public access
create policy "parent_reads_own_invites" on public.pending_parent_invites
  for select to authenticated using (auth.uid() = parent_user_id);

-- RPC: called client-side when child signs in via invite link
-- Accepts invite matching auth.uid()'s email, creates confirmed link
create or replace function public.accept_parent_invite(p_invite_id uuid)
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_invite public.pending_parent_invites;
  v_email  text;
begin
  select * into v_invite from public.pending_parent_invites
  where id = p_invite_id and not accepted and expires_at > now();
  if not found then
    return jsonb_build_object('ok', false, 'error', 'invite_not_found_or_expired');
  end if;
  -- Verify the calling user's email matches the invite
  select email into v_email from auth.users where id = auth.uid();
  if lower(v_email) <> lower(v_invite.invited_email) then
    return jsonb_build_object('ok', false, 'error', 'email_mismatch');
  end if;
  -- Create confirmed link
  insert into public.parent_student_links(parent_user_id, student_user_id, label)
  values (v_invite.parent_user_id, auth.uid(), v_invite.label)
  on conflict do nothing;
  -- Mark invite accepted
  update public.pending_parent_invites set accepted = true where id = p_invite_id;
  return jsonb_build_object('ok', true, 'parent_user_id', v_invite.parent_user_id);
end;
$$;
revoke all on function public.accept_parent_invite(uuid) from public;
grant execute on function public.accept_parent_invite(uuid) to authenticated;
