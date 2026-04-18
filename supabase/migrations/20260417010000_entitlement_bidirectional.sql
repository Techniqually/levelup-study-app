-- Bidirectional entitlement sync: writes to the legacy user_entitlements.entitlements[]
-- array are also materialized into the structured subject_entitlements rows (and vice
-- versa, which was already in place via trg_subject_ent_sync).
--
-- pg_trigger_depth() guard prevents the two triggers from ping-ponging each other.

create or replace function public.user_entitlements_after_change()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_entry text;
  v_user  uuid;
begin
  -- Don't re-enter when the other trigger fires us.
  if pg_trigger_depth() > 1 then
    return coalesce(new, old);
  end if;

  v_user := coalesce(new.user_id, old.user_id);

  -- Replace the legacy-sourced rows for this user (SG O-Level only).
  delete from public.subject_entitlements
   where user_id = v_user
     and country_code = 'sg'
     and class_code   = 'olevel'
     and source       = 'legacy_array';

  if (tg_op = 'DELETE') then
    return old;
  end if;

  if new.entitlements is null or cardinality(new.entitlements) = 0 then
    return new;
  end if;

  foreach v_entry in array new.entitlements loop
    insert into public.subject_entitlements
      (user_id, country_code, class_code, subject_slug, access_from, access_to, source)
    values (
      new.user_id, 'sg', 'olevel',
      (case v_entry
        when 'olevel_chem' then 'chemistry'
        when 'olevel_phys' then 'physics'
        when 'olevel_geo'  then 'geography'
        when 'olevel_all'  then '__all__'
        else null
      end),
      new.access_from, new.access_to, 'legacy_array'
    )
    on conflict (user_id, country_code, class_code, subject_slug) do update
      set access_from = excluded.access_from,
          access_to   = excluded.access_to,
          source      = excluded.source;
  end loop;
  return new;
end;
$$;

drop trigger if exists trg_user_ent_sync on public.user_entitlements;
create trigger trg_user_ent_sync
  after insert or update or delete on public.user_entitlements
  for each row execute function public.user_entitlements_after_change();

-- Mirror the depth guard onto the existing subject_entitlements trigger so they
-- no longer risk infinite recursion now that they write to each other.
create or replace function public.subject_entitlements_after_change()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if pg_trigger_depth() > 1 then
    return coalesce(new, old);
  end if;
  if (tg_op = 'DELETE') then
    perform public.rebuild_user_entitlements_array(old.user_id);
    return old;
  else
    perform public.rebuild_user_entitlements_array(new.user_id);
    return new;
  end if;
end;
$$;

-- Backfill: if any user currently has user_entitlements rows but empty subject_entitlements,
-- materialize them now (same mapping as the trigger).
insert into public.subject_entitlements
  (user_id, country_code, class_code, subject_slug, access_from, access_to, source)
select
  ue.user_id, 'sg', 'olevel',
  (case ent
    when 'olevel_chem' then 'chemistry'
    when 'olevel_phys' then 'physics'
    when 'olevel_geo'  then 'geography'
    when 'olevel_all'  then '__all__'
    else null
  end) as slug,
  ue.access_from, ue.access_to, 'legacy_array'
from public.user_entitlements ue,
     unnest(ue.entitlements) as ent
where ent in ('olevel_chem','olevel_phys','olevel_geo','olevel_all')
on conflict (user_id, country_code, class_code, subject_slug) do update
  set access_from = excluded.access_from,
      access_to   = excluded.access_to,
      source      = excluded.source;

-- Storage RLS: also accept the legacy helper as an OR branch so granting via either
-- table unlocks content. (The new helper remains the primary source of truth.)
drop policy if exists study_materials_read on storage.objects;
create policy study_materials_read on storage.objects
  for select to authenticated
  using (
    bucket_id = 'study-materials'
    and (
      split_part(name, '/', 1) = 'shared'
      or name ~ '^[a-z0-9_-]+/topics-manifest\.json$'
      or name ~ '^[a-z0-9_-]+/infographics-info\.md$'
      or split_part(name, '/', 2) = 'free'
      or exists (
        select 1 from public.profiles p
        where p.user_id = (select auth.uid())
          and public.user_has_subject_entitlement(
                p.user_id, p.country_code, p.class_code,
                split_part(name, '/', 1)
              )
      )
      -- belt-and-suspenders: legacy array check (for callers that still write only to user_entitlements)
      or public.user_has_entitlement(
           (select auth.uid()),
           public.required_entitlement_for_subject(split_part(name, '/', 1))
         )
    )
  );
