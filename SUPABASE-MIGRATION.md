# Supabase migration report

Architecture: **React → Express API → Supabase (PostgreSQL)**. The browser never talks to Supabase; the Express
server uses a server-side secret key. The reference site (`clone_website`, an HTTrack mirror) was only read.

## How it was set up

| Step | File / command |
| --- | --- |
| Schema | `server/supabase/migrations/*.sql`, in order (idempotent; run in the Supabase SQL editor — the API keys cannot run DDL) |
| Data extracted from the reference site | `server/supabase/seed/data/*.json` |
| Load data (safe to re-run, upserts on unique keys) | `npm run db:seed --prefix server` |
| Compare against the reference + relationship/RLS checks | `node server/supabase/verify.js "<reference 24-7consultancy.pk folder>"` |

## Tables created (11)

| Table | Purpose | Unique keys |
| --- | --- | --- |
| `blog_categories` | Blog categories (8 incl. 4 with no post yet; thumbnail + sidebar order) | `name`, `slug` |
| `authors` | Blog authors (name, slug, photo) | `slug` |
| `blogs` | Blog posts (HTML content, excerpt, featured image path, publish date, listing order) | `slug` |
| `careers` | Job listings (title, department, location, last date, active flag) | `slug` |
| `job_applications` | Applications submitted through the site | — |
| `contact_submissions` | Contact / inquiry form submissions | — |
| `faqs` | Home page "Common Questions" | `question` |
| `testimonials` | Google reviews next to the contact form | `author_name` |
| `team_members` | "Meet Our Leadership" | `name` |
| `success_stories` | Home page video grid (YouTube id + thumbnail) | `youtube_id` |
| `site_settings` | Key/value JSON (holds the Google rating summary) | `key` |

## Records migrated (verified against the reference)

| Table | Reference | Supabase |
| --- | --- | --- |
| `blog_categories` | 4 with posts (8 listed in the original sidebar) | 8 |
| `authors` | 2 | 2 |
| `blogs` | 15 | 15 |
| `careers` | 2 | 2 |
| `faqs` | 7 | 7 |
| `testimonials` | 7 | 7 |
| `team_members` | 3 | 3 |
| `success_stories` | 5 | 5 |
| `site_settings` | 1 (Google rating 4.8 / 27 reviews) | 1 |
| `job_applications`, `contact_submissions` | — (filled by visitors) | 0 (test rows removed) |

Verification results: all 15 blog bodies are text-identical to the reference, every slug is present, no duplicates
after running the seed twice, every blog has a valid category, and every blog image file exists in `client/public`.

## Relationships

- `blogs.category_id` → `blog_categories.id` (`on delete restrict`)
- `blogs.author_id` → `authors.id` (`on delete set null`)
- `job_applications.career_id` → `careers.id` (`on delete cascade`)

No tag or author tables exist because the reference shows neither. Indexes cover blog category / publish order,
active careers, applications per career and submissions by date.

## API

| Method | Endpoint | Notes |
| --- | --- | --- |
| GET | `/api/health` | |
| GET | `/api/blogs` | summaries (no body, includes card excerpt HTML), newest first; optional `?limit=` |
| GET | `/api/blogs/:slug` | full post with author + meta description; 404 if unknown |
| GET | `/api/blog-categories` | all categories with thumbnails, in sidebar order |
| GET | `/api/careers` | active jobs |
| GET | `/api/careers/:id` | `:id` is the UUID or the slug; 404 if unknown |
| POST | `/api/careers/:id/apply` | multipart form like the original: `first_name`, `email`, `phone_number`, `cnic`, `city`, `address`, `upload_file` (PDF/DOCX, ≤5 MB) required; `last_name`, `gender`, `current_salary`, `expected_salary` optional; 201 |
| POST | `/api/contact` | `name`, `email`, `description` required; `services` (must be one of the 4 options), `number`, `subject` optional; 201 |
| GET | `/api/faqs`, `/api/team`, `/api/testimonials`, `/api/success-stories` | managed site content |

Invalid input returns 400 with `errors: { field: message }`; unknown routes and records return JSON 404; database
errors are logged server-side only and returned as a generic message.

## React pages backed by the API

Blog list and search, blog article, career list and search, job detail + application form, contact page form,
and on the home page: leadership team, FAQ, success-story videos, and the reviews/rating beside the contact form
(the same contact section also appears on About and the service pages).

## Blog + career detail pages (second migration)

The original detail pages need data the first schema lacked, so `20261007120000_blog_career_detail_fields.sql` adds:
authors (+ `blogs.author_id`), per-post `meta_description` and card `excerpt_html`, category `image_url`/`sort_order`,
and on `careers`: `shift`, `experience`, `province_country`, `description` (HTML). `job_applications` (empty at the time)
was reshaped to the real form: first/last name, gender, CNIC, city, address, date applied, `resume_path`, optional salaries.
All 15 blog bodies were re-checked against the live site's text; both job descriptions were copied from the live pages.

## Intentionally NOT migrated

- Service/marketing page copy, navigation, footer, awards and ISO badges, stat counters, About-page solution
  cards and portfolio items — fixed marketing content that stays in React.
- CSS, JS, components, logos, icons and other static assets.
- Contact form's `country_code` hidden field (only used by the old phone widget) and the reCAPTCHA token.
- Success-story titles and blog authors/tags — they do not exist in the reference.

## Storage

Résumés only: the job application form uploads a PDF/DOCX to a **private** bucket named `resumes`
(server-generated file names, created by the seed script). Blog/category/author images, team photos and thumbnails stay
as site-relative paths served from `client/public`.

## Security

- Credentials are read from the git-ignored root `.env.local`; `.gitignore` ignores `.env` and `.env.*` (except
  `*.example`). A scan of the project found no secret value outside `.env.local`, and none appear in logs.
- Only the Express server holds the secret key. The frontend only knows `VITE_API_URL`.
- Row Level Security is **enabled on all 10 tables with no policies**: the public/publishable key can neither read
  nor write (verified by an automated probe); all access goes through the Express API.
- Request bodies are validated (types, lengths, email format, allowed service values) before any insert.

## Environment variable names

- Root `.env.local`: `SUPABASE_URL`, `SUPABASE_SECRET_KEY`
- `server/.env` (optional): `PORT`, `NODE_ENV`, `CLIENT_ORIGIN`
- `client/.env`: `VITE_API_URL`

## Remaining work / notes

- Author and category links in the blog sidebar point at `/blog` (the original has separate /author and /category pages
  that are not built); category links filter the blog list via `?category=`.
- Résumés are not viewable from the site; review them in the Supabase dashboard (Storage → resumes).
- The team member Facebook link for Huma Naeem was garbled in the mirror and was reconstructed; please confirm it.
- Missing from the mirror (replace by dropping files in place): the tech-logo SVGs (stand-in badges are used), the
  blog/career hero photos, and full-size portfolio screenshots.
- No admin UI yet: content is edited in the Supabase dashboard. Next steps would be Supabase Auth and an editor.
- There is no spam protection (rate limit / captcha) on the public POST endpoints yet.
