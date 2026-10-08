import { createClient } from '@supabase/supabase-js';
import env from '../config/env.js';
import { getSupabase } from '../config/supabase.js';
import { isAdminUser } from '../middleware/adminAuth.js';
import ApiError from '../utils/ApiError.js';

// A throw-away client per call: signing in must never touch the shared secret-key client.
const authClient = () => {
  if (!env.supabase.url || !env.supabase.publishableKey) throw new ApiError(503, 'Admin login is not configured.');
  return createClient(env.supabase.url, env.supabase.publishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
};

const invalid = () => new ApiError(401, 'Invalid email or password.');

export async function login(email, password) {
  if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) throw invalid();
  const { data, error } = await authClient().auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
  if (error || !data?.session) throw invalid();
  if (!isAdminUser(data.user)) {
    await getSupabase().auth.admin.signOut(data.session.access_token).catch(() => {});
    throw invalid(); // same message: do not reveal that the account exists but is not an admin
  }
  return { session: data.session, user: { id: data.user.id, email: data.user.email } };
}

export async function refresh(refreshToken) {
  if (!refreshToken) throw new ApiError(401, 'Authentication required');
  const { data, error } = await authClient().auth.refreshSession({ refresh_token: refreshToken });
  if (error || !data?.session || !isAdminUser(data.user)) throw new ApiError(401, 'Authentication required');
  return { session: data.session, user: { id: data.user.id, email: data.user.email } };
}

export const revoke = (accessToken) => getSupabase().auth.admin.signOut(accessToken).catch(() => {});
