import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

// Secrets live in the (git-ignored) project-root .env.local; server/.env can override for local tweaks.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
dotenv.config({ path: path.join(root, '.env.local'), quiet: true });
dotenv.config({ quiet: true });

const isProduction = process.env.NODE_ENV === 'production';

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction,
  // Public site URL (https://example.com, no trailing slash) used by sitemap.xml, robots.txt and canonical/OG tags.
  siteUrl: (process.env.SITE_URL || '').replace(/\/$/, ''),
  port: Number(process.env.PORT) || 5000,
  // Comma separated list of browser origins allowed to call the API.
  // In production there is no localhost default: unset means "same-origin only" (Vercel serves the SPA and the API from one domain).
  clientOrigins: (process.env.CLIENT_ORIGIN || (isProduction ? '' : 'http://localhost:5173'))
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  supabase: {
    url: process.env.SUPABASE_URL || '',
    // Server-side secret key: bypasses RLS, so it must never reach the browser.
    secretKey: process.env.SUPABASE_SECRET_KEY || '',
  },
};

export default env;
