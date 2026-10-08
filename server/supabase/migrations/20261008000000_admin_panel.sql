-- Admin panel migration. Idempotent and non-destructive: only adds two columns and indexes; no data is changed or removed.
-- Run once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query -> paste -> Run).

-- Hand-picked related articles for a post (ids of other blogs). The public API falls back to same-category posts.
alter table public.blogs
  add column if not exists related_blog_ids uuid[] not null default '{}';

-- Meeting / inquiry requests (contact_submissions) get a workflow status managed from the admin panel.
alter table public.contact_submissions
  add column if not exists status text not null default 'pending';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'contact_submissions_status_check') then
    alter table public.contact_submissions
      add constraint contact_submissions_status_check
      check (status in ('pending', 'confirmed', 'completed', 'cancelled'));
  end if;
end $$;

create index if not exists contact_submissions_status_idx on public.contact_submissions (status, created_at desc);
create index if not exists blogs_slug_published_idx on public.blogs (slug) where is_published;

-- Row level security: unchanged. Every table keeps RLS enabled with NO policies, so the public (anon) key can read and write
-- nothing; the website and the admin panel only reach data through the Express API using the server-side secret key.
-- The public image bucket "site-images" (admin uploads) is created by the server on first upload; it is public-read only.
