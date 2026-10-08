import { getSupabase } from '../config/supabase.js';
import env from '../config/env.js';
import ApiError from '../utils/ApiError.js';

export const ACCESS_COOKIE = 'cms_at';
export const REFRESH_COOKIE = 'cms_rt';
const ACCESS_MAX_AGE = 60 * 60; // seconds; matches the Supabase access-token lifetime
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7;

/** Minimal cookie parser (avoids another dependency). */
export function readCookies(req) {
  const out = {};
  for (const part of (req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) {
      try {
        out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
      } catch {
        /* ignore malformed cookie */
      }
    }
  }
  return out;
}

const cookie = (name, value, maxAge) =>
  `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/api; HttpOnly; SameSite=Strict${env.isProduction ? '; Secure' : ''}`;

export function setSessionCookies(res, session) {
  res.append('Set-Cookie', cookie(ACCESS_COOKIE, session.access_token, ACCESS_MAX_AGE));
  res.append('Set-Cookie', cookie(REFRESH_COOKIE, session.refresh_token, REFRESH_MAX_AGE));
}

export function clearSessionCookies(res) {
  res.append('Set-Cookie', cookie(ACCESS_COOKIE, '', 0));
  res.append('Set-Cookie', cookie(REFRESH_COOKIE, '', 0));
}

export const isAdminUser = (user) => user?.app_metadata?.role === 'admin';

/**
 * Guards every /api/admin route: the access token (httpOnly cookie) must be a valid Supabase Auth session whose
 * app_metadata.role is "admin". app_metadata can only be written with the server secret key, never by a signed-up user.
 * State-changing requests must also carry a custom header, which cross-site pages cannot send (CSRF defence).
 */
export async function requireAdmin(req, res, next) {
  try {
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && req.get('X-Requested-With') !== 'admin-panel') {
      throw new ApiError(403, 'Forbidden');
    }
    const token = readCookies(req)[ACCESS_COOKIE];
    if (!token) throw new ApiError(401, 'Authentication required');
    const { data, error } = await getSupabase().auth.getUser(token);
    if (error || !data?.user) throw new ApiError(401, 'Authentication required');
    if (!isAdminUser(data.user)) throw new ApiError(403, 'Forbidden');
    req.admin = { id: data.user.id, email: data.user.email };
    req.accessToken = token;
    next();
  } catch (err) {
    next(err);
  }
}
