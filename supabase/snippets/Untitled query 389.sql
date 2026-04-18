insert into public.user_entitlements (user_id, entitlements) values
  ('72344d70-2162-4dbd-8936-16b00445ed4b', ARRAY['olevel_all'])
on conflict (user_id) do update set entitlements = excluded.entitlements;

select * from public.user_entitlements