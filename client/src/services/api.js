// Production: the API lives on the same Vercel domain (`/api`), so no variable is required. Only `npm run dev` falls back to the
// local Express server. Set VITE_API_URL (it is public - never put a secret in a VITE_ variable) to point at a separate API host.
const API_URL = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api')).replace(/\/$/, '');

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
