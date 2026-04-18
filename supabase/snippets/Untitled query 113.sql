insert into public.subject_entitlements
  (user_id, country_code, class_code, subject_slug, access_from, access_to, source)
values
  ('a0f8ec22-b04f-4621-a242-e295be551b41', 'sg', 'olevel', '__all__', now(), null, 'dev_login')
on conflict (user_id, country_code, class_code, subject_slug)
  do update set
    access_from = excluded.access_from,
    access_to   = excluded.access_to,
    source      = excluded.source;


select * from public.profiles


select * from public.subject_entitlements

update public.profiles
set role = 'admin', updated_at = now()
where user_id = 'a0f8ec22-b04f-4621-a242-e295be551b41';