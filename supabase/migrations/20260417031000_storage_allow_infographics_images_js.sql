-- Preview mode needs `<subject>/infographics-images.js` for subjects whose topic
-- files do not carry inline infographic metadata.

drop policy if exists study_materials_read on storage.objects;

create policy study_materials_read on storage.objects
  for select to authenticated
  using (
    bucket_id = 'study-materials'
    and (
      split_part(name, '/', 1) = 'shared'
      or name ~ '^[a-z0-9_-]+/topics-manifest\.json$'
      or name ~ '^[a-z0-9_-]+/infographics-info\.md$'
      or name ~ '^[a-z0-9_-]+/infographics-images\.js$'
      or split_part(name, '/', 2) = 'images'
      or split_part(name, '/', 2) = 'free'
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
      or public.user_has_entitlement(
            (select auth.uid()),
            public.required_entitlement_for_subject(split_part(name, '/', 1))
          )
    )
  );
