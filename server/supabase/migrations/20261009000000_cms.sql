-- CMS (Phase 1). Idempotent and purely additive: creates two tables; no existing table, column or row is changed or removed.
-- Run once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query -> paste -> Run).

-- One row per editable content section (e.g. page "global" / section "navbar", or page "about-us" / section "seo").
--   draft     = what the admin is editing (never shown to visitors)
--   published = what the public website uses
-- Both are NULL until the first save; the public site then uses the built-in defaults (the current website content).
create table if not exists public.cms_sections (
  page_slug    text        not null,
  section_key  text        not null,
  draft        jsonb,
  published    jsonb,
  published_at timestamptz,
  updated_by   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  primary key (page_slug, section_key)
);
drop trigger if exists cms_sections_set_updated_at on public.cms_sections;
create trigger cms_sections_set_updated_at before update on public.cms_sections
  for each row execute function public.set_updated_at();

-- Media library index over the existing public "site-images" bucket (uploads) plus the images that ship with the website
-- (is_builtin = true, url like /assets/..., read-only: never deleted or replaced by the CMS).
create table if not exists public.media_assets (
  id          uuid primary key default gen_random_uuid(),
  path        text        not null unique,   -- storage object path, or /assets/... for built-in files
  url         text        not null,
  name        text        not null,
  alt_text    text        not null default '',
  mime        text,
  size_bytes  integer,
  width       integer,
  height      integer,
  is_builtin  boolean     not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists media_assets_created_idx on public.media_assets (is_builtin, created_at desc);
drop trigger if exists media_assets_set_updated_at on public.media_assets;
create trigger media_assets_set_updated_at before update on public.media_assets
  for each row execute function public.set_updated_at();

-- Row level security: enabled with NO policies (same as every other table) - only the Express API can reach the data.
alter table public.cms_sections enable row level security;
alter table public.media_assets enable row level security;
