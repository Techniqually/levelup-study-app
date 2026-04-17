insert into storage.buckets (id, name, public)
values ('study-materials', 'study-materials', false)
on conflict (id) do update set public = excluded.public;

-- helper (immutable, used in storage RLS)
create or replace function public.required_entitlement_for_subject(subject_slug text)
returns text language sql immutable set search_path = public as $$
  select case lower(coalesce(subject_slug,''))
    when 'chemistry' then 'olevel_chem'
    when 'physics'   then 'olevel_phys'
    when 'geography' then 'olevel_geo'
    else null
  end;
$$;

drop policy if exists study_materials_read on storage.objects;
create policy study_materials_read on storage.objects
  for select to authenticated
  using (
    bucket_id = 'study-materials'
    and (
      -- shared assets (shop rewards, etc.) available to every signed-in user
      split_part(name, '/', 1) = 'shared'
      -- public subject metadata: manifest + light info strings
      or name ~ '^[a-z0-9_-]+/topics-manifest\.json$'
      or name ~ '^[a-z0-9_-]+/infographics-info\.md$'
      -- free preview path: <subject>/free/<file>
      or split_part(name, '/', 2) = 'free'
      -- entitled access to everything under the subject
      or public.user_has_entitlement(
          (select auth.uid()),
          public.required_entitlement_for_subject(split_part(name, '/', 1))
         )
    )
  );
