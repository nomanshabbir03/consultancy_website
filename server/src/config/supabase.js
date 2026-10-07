import { createClient } from '@supabase/supabase-js';
import env from './env.js';

let client;

export const isSupabaseConfigured = () => Boolean(env.supabase.url && env.supabase.secretKey);

/**
 * Lazily created server-side Supabase client. Uses the secret key, so it is only ever used inside
 * the Express API (never exposed to the browser). Tables have RLS enabled with no public policies.
 */
export function getSupabase() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured: set SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local');
  }
  client ??= createClient(env.supabase.url, env.supabase.secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
