-- 24-7 Consultancy: initial schema.
-- Only data that exists on the reference website (or is submitted through its forms) is modelled here.
-- Safe to re-run: every statement is idempotent.

create extension if not exists pgcrypto;

-- Keeps updated_at current on every UPDATE.
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------- blog
create table if not exists public.blog_categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  slug       text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.blogs (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  slug           text not null unique,
  excerpt        text,
  content        text not null,                 -- HTML authored in the original CMS
  featured_image text,                          -- site-relative path or URL
  category_id    uuid not null references public.blog_categories (id) on update cascade on delete restrict,
  is_published   boolean not null default true,
  sort_order     integer not null default 0,   -- keeps the original listing order for posts sharing a date
  published_at   date not null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists blogs_category_id_idx on public.blogs (category_id);
create index if not exists blogs_published_idx on public.blogs (is_published, published_at desc);
drop trigger if exists blogs_set_updated_at on public.blogs;
create trigger blogs_set_updated_at before update on public.blogs
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------- careers
create table if not exists public.careers (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  department    text not null,
  location      text not null,
  last_date     date not null,                  -- application deadline
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists careers_active_idx on public.careers (is_active, last_date);
drop trigger if exists careers_set_updated_at on public.careers;
create trigger careers_set_updated_at before update on public.careers
  for each row execute function public.set_updated_at();

create table if not exists public.job_applications (
  id         uuid primary key default gen_random_uuid(),
  career_id  uuid not null references public.careers (id) on update cascade on delete cascade,
  name       text not null,
  email      text not null,
  phone      text,
  message    text,
  created_at timestamptz not null default now()
);
create index if not exists job_applications_career_id_idx on public.job_applications (career_id);

-- ------------------------------------------------------------- contact
create table if not exists public.contact_submissions (
  id         uuid primary key default gen_random_uuid(),
  service    text,                              -- "Please select service" dropdown (inquiry type)
  name       text not null,
  email      text not null,
  phone      text,
  subject    text,
  message    text not null,
  created_at timestamptz not null default now()
);
create index if not exists contact_submissions_created_idx on public.contact_submissions (created_at desc);

-- ------------------------------------------------ managed site content
create table if not exists public.faqs (
  id         uuid primary key default gen_random_uuid(),
  question   text not null unique,
  answer     text not null,
  sort_order integer not null default 0,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (       -- Google reviews shown next to the contact form
  id              uuid primary key default gen_random_uuid(),
  author_name     text not null unique,
  review          text not null,
  rating          smallint not null default 5 check (rating between 1 and 5),
  avatar_url      text,
  avatar_initial  text,                         -- used when there is no photo
  avatar_color    text,
  sort_order      integer not null default 0,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

create table if not exists public.team_members (       -- "Meet Our Leadership"
  id            uuid primary key default gen_random_uuid(),
  name          text not null unique,
  role          text not null,
  bio           text not null,
  photo_url     text,
  facebook_url  text,
  instagram_url text,
  linkedin_url  text,
  sort_order    integer not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

create table if not exists public.success_stories (    -- home page video grid
  id            uuid primary key default gen_random_uuid(),
  youtube_id    text not null unique,
  thumbnail_url text not null,
  sort_order    integer not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

create table if not exists public.site_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------- row level security
-- All access goes through the Express API using the server-side secret key (which bypasses RLS).
-- RLS is enabled with NO policies, so the public anon/publishable key can read or write nothing.
alter table public.blog_categories      enable row level security;
alter table public.blogs                enable row level security;
alter table public.careers              enable row level security;
alter table public.job_applications     enable row level security;
alter table public.contact_submissions  enable row level security;
alter table public.faqs                 enable row level security;
alter table public.testimonials         enable row level security;
alter table public.team_members         enable row level security;
alter table public.success_stories      enable row level security;
alter table public.site_settings        enable row level security;
