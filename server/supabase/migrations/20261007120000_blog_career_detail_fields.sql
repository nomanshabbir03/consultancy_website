-- Fields required to reproduce the original blog article and job detail pages.
-- Idempotent; safe to re-run.
--
-- Blog:    author (name, slug, photo), per-post SEO description, original card excerpt HTML,
--          category thumbnails (+ the four categories that exist on the site but have no post yet).
-- Careers: shift, experience, province/country, rich-text description.
-- Applications: the original form collects first/last name, gender, CNIC, city, address, date applied,
--          résumé file (stored in a private Supabase Storage bucket) and optional salaries.
--          `job_applications` was empty, so its columns are reshaped to match the real form.

-- ---------------------------------------------------------------- blog
create table if not exists public.authors (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  slug       text not null unique,
  photo_url  text,
  created_at timestamptz not null default now()
);
alter table public.authors enable row level security;

alter table public.blog_categories add column if not exists image_url  text;
alter table public.blog_categories add column if not exists sort_order integer not null default 0;   -- sidebar order

alter table public.blogs add column if not exists author_id        uuid references public.authors (id) on update cascade on delete set null;
alter table public.blogs add column if not exists meta_description text;
alter table public.blogs add column if not exists excerpt_html     text;
create index if not exists blogs_author_id_idx on public.blogs (author_id);

-- ------------------------------------------------------------- careers
alter table public.careers add column if not exists shift             text;
alter table public.careers add column if not exists experience        text;
alter table public.careers add column if not exists province_country  text;
alter table public.careers add column if not exists description       text;   -- HTML from the original CMS

-- ------------------------------------------------ job application form
alter table public.job_applications drop column if exists name;
alter table public.job_applications drop column if exists message;
alter table public.job_applications add column if not exists first_name      text;
alter table public.job_applications add column if not exists last_name       text;
alter table public.job_applications add column if not exists gender          text check (gender in ('male', 'female', 'other'));
alter table public.job_applications add column if not exists cnic            text;
alter table public.job_applications add column if not exists city            text;
alter table public.job_applications add column if not exists address         text;
alter table public.job_applications add column if not exists date_applied    date not null default current_date;
alter table public.job_applications add column if not exists resume_path     text;     -- key inside the private "resumes" bucket
alter table public.job_applications add column if not exists current_salary  numeric(12, 2);
alter table public.job_applications add column if not exists expected_salary numeric(12, 2);
