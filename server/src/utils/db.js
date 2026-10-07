import ApiError from './ApiError.js';

/**
 * Unwraps a Supabase `{ data, error }` result. Database details are logged server-side only;
 * clients get a generic message so internals never leak.
 */
export function unwrap({ data, error }) {
  if (!error) return data;
  console.error('[supabase]', error.code, error.message);
  if (error.code === 'PGRST205' || error.code === '42P01') {
    throw new ApiError(503, 'The database has not been initialised yet.');
  }
  throw new ApiError(500, 'Database error');
}

export const isUuid = (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
