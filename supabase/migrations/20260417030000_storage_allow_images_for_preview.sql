-- Allow authenticated learners (including preview users) to fetch infographics
-- from Supabase Storage under `<subject>/images/*`.
-- Without this, preview mode can load free topic JS but image signing for
-- `chemistry/images/...` fails due RLS, leaving stale `data/subjects/...` links.

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
      -- infographics images path: <subject>/images/<file>
      or split_part(name, '/', 2) = 'images'
      -- free preview path: <subject>/free/<file>
      or split_part(name, '/', 2) = 'free'
      -- entitled access to everything under the subject
      or exists (
        select 1 from public.profiles p
        where p.user_id = (select auth.uid())
          and public.user_has_subject_entitlement(
                p.user_id,
                p.country_code,
                p.class_code,
                split_part(name, '/', 1)
              )
      )
      -- belt-and-suspenders: legacy array check
      or public.user_has_entitlement(
            (select auth.uid()),
            public.required_entitlement_for_subject(split_part(name, '/', 1))
          )
    )
  );
