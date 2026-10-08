# 24-7 Consultancy — SERN rebuild

A clean **SERN** (Supabase · Express · React · Node) rebuild of the 24-7 Consultancy marketing website.

> **Supabase is connected** (React → Express → Supabase). Dynamic content and form submissions live in
> Supabase PostgreSQL; see [SUPABASE-MIGRATION.md](SUPABASE-MIGRATION.md) for the schema, migrated data and API.

The original, read-only reference lives next to this project in `clone_website/` (an HTTrack mirror of
the old Laravel site). It was only inspected and used as a source of assets — it was not modified.

## Architecture

```
            USER
              │
              ▼
      React (Vite) – localhost:5173
              │  REST / JSON
              ▼
     Node + Express – localhost:5000
        routes → controllers → services
                               │
                               ▼
                       Supabase (PostgreSQL)
```

## Folder structure

```
clone-website-sern/
├── client/                      React + Vite front-end
│   ├── public/
│   │   ├── assets/              images, icons, video copied from the reference site
│   │   └── storage/             blog images
│   └── src/
│       ├── components/          Header, Footer, ContactSection, Carousel, FaqSection, …
│       ├── data/                navigation, FAQ, reviews, portfolio, solutions tabs
│       ├── hooks/               useAos, useApiData, useDocumentMeta, useScrolledPast
│       ├── layouts/             MainLayout (header + page + footer)
│       ├── pages/               one component per route
│       ├── routes/              route table, page titles/descriptions, <AppRoutes>
│       ├── services/            fetch wrapper + blog / career / contact API clients
│       ├── styles/              vendor CSS carried over from the reference + page rules
│       └── utils/
├── server/                      Node + Express API
│   └── src/
│       ├── config/              env loading, Supabase client
│       ├── controllers/         HTTP layer
│       ├── middleware/          404 + central error handler
│       ├── routes/              route table
│       ├── services/            business logic / future database access
│       ├── utils/               ApiError, request validation
│       ├── app.js
│       └── server.js
├── package.json                 root scripts (runs both apps)
└── README.md
```

## Getting started

Requirements: Node.js 20+ and npm.

```bash
# from the project root
npm run install:all      # root + client + server dependencies
cp client/.env.example client/.env
cp server/.env.example server/.env
cp .env.example .env.local   # then fill in the Supabase values (git-ignored)
# apply server/supabase/migrations/*.sql in the Supabase SQL editor, then:
npm run db:seed --prefix server
npm run dev              # React → :5173, Express → :5000
```

| Command                | What it does                                |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Starts API and front-end together           |
| `npm run dev:client`   | Front-end only (`vite`)                     |
| `npm run dev:server`   | API only (`nodemon`)                        |
| `npm run build`        | Production build of the front-end           |
| `npm start`            | Runs the API with plain `node`              |

Inside `client/`: `npm run dev`, `npm run build`, `npm run preview`.
Inside `server/`: `npm run dev`, `npm start`.

### Local URLs

- Website: <http://localhost:5173>
- API: <http://localhost:5000/api> · health check: <http://localhost:5000/api/health>

## Environment variables

`client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

`server/.env` (optional overrides)

```env
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173   # CORS allow-list, comma separated
```

`.env.local` (project root, git-ignored — secrets)

```env
SUPABASE_URL=
SUPABASE_SECRET_KEY=
```

The secret key is read only by the Express server and never reaches the browser. Only the `*.example` files are committed.

## Pages (React routes)

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about-us` | About |
| `/bpo`, `/inbound-call`, `/outbound-call`, `/email-and-chat`, `/sms-support` | BPO + sub services |
| `/health-care`, `/medical-billing`, `/medical-transcription`, `/management-services` | Health care + sub services |
| `/digital-marketing`, `/web-development`, `/graphic-designing`, `/ui-ux-designing`, `/search-engine-optimization`, `/social-media-marketing`, `/content-writing` | Digital marketing + sub services |
| `/blog`, `/blog/:slug` | Blog list (API) and article |
| `/career`, `/career/:slug` | Open positions (API) and job + application form |
| `/contact-us` | Contact form + map |
| `*` | 404 |

## API endpoints

See [SUPABASE-MIGRATION.md](SUPABASE-MIGRATION.md#api) for the full list. In short: `/api/health`, `/api/blogs`,
`/api/blogs/:slug`, `/api/careers`, `/api/careers/:id`, `POST /api/careers/:id/apply`, `POST /api/contact`,
`/api/faqs`, `/api/team`, `/api/testimonials`, `/api/success-stories`.

Unknown routes return a JSON 404; validation problems return HTTP 400 with `errors: { field: message }`.

## Notes on the rebuild

- The reference site is a Laravel + Tailwind + Bootstrap grid page. To keep the look pixel-faithful, the compiled
  Tailwind CSS and the Bootstrap grid CSS from the reference are reused (`client/src/styles/vendor`) and the markup
  was ported to JSX with the same class names. Interactivity (header, dropdowns, tabs, FAQ, carousels, counters,
  galleries, video thumbnails, previews) was reimplemented as React components instead of jQuery/Alpine/Slick.
- Some assets could not be copied because the reference mirror never downloaded them (HTTP 429 during the crawl):
  the 19 tech-logo SVGs under `assets/pics/icons/` and `newicon/figma.svg` are **stand-in badges**, the blog and
  career hero photos (`assets/pics/parent/blog-bg.webp`, `career-bg.webp`) are omitted (plain navy hero), and the
  Web Development portfolio shows the thumbnail image in its preview instead of the full-size screenshots.
  Drop the real files at the same paths to replace them.
- The blog article and job detail layouts are not in the mirror; they reuse the site's hero/content styling.
- The phone field is a plain `tel` input (the original used the intl-tel-input widget).


## Deploying to Vercel (one project, two services)

`vercel.json` defines two services in a single Vercel project on one domain:

- `client` (`client/`, Vite) serves the React app and is the catch-all route (its own rewrite falls back to `index.html`).
- `server` (`server/`, Express, entrypoint `src/app.js`) is public only for `/api/*`, `/sitemap.xml`, `/robots.txt`,
  `/blog/:slug` and `/career/:slug`. It has a binding to `client` (env `CLIENT_URL`) to read the built `index.html`.
- Set the Vercel project's Root Directory to this folder (the one containing `vercel.json`). Run everything locally with `vercel dev`.
- Environment variables: `SUPABASE_URL`, `SUPABASE_SECRET_KEY` (server only), `SITE_URL`, plus `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (form emails to cmsolutions180@gmail.com; Gmail needs an App password). Never prefix a secret with `VITE_`.
- Résumé uploads are limited to 4 MB because Vercel functions reject request bodies above ~4.5 MB.
