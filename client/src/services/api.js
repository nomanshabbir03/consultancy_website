// The API is same-origin (`/api`): Vercel services routes it to the server service in production and `vercel dev`; `npm run dev`
// proxies it to the local Express server (vite.config.js). VITE_API_URL is public (bundled) - never put a secret in a VITE_ variable.
export const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

/** Thin fetch wrapper around the Express API. Throws an Error carrying `status` and `details`. */
export async function apiRequest(path, { method = 'GET', body, signal } = {}) {
  let response;
  try {
    const isForm = body instanceof FormData; // multipart: the browser sets the boundary header itself
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: body && !isForm ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
      signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    const error = new Error('Unable to reach the server. Please try again later.');
    error.status = 0;
    throw error;
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message || 'Something went wrong.');
    error.status = response.status;
    error.details = payload.errors;
    throw error;
  }
  return payload;
}
