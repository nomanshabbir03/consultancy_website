import { API_URL } from '../services/api';

const BASE = `${API_URL}/admin`;
export const UNAUTHORIZED_EVENT = 'admin:unauthorized';

async function send(path, { method = 'GET', body, form } = {}) {
  let response;
  try {
    response = await fetch(`${BASE}${path}`, {
      method,
      credentials: 'same-origin', // the session lives in httpOnly cookies; no token is ever handled by this code
      headers: {
        'X-Requested-With': 'admin-panel', // required by the API on writes (CSRF defence)
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: form ?? (body ? JSON.stringify(body) : undefined),
    });
  } catch {
    const error = new Error('Unable to reach the server. Please try again.');
    error.status = 0;
    throw error;
  }
  const payload = await response.json().catch(() => ({}));
  return { response, payload };
}

/** JSON request to the admin API. A 401 triggers one silent session refresh and a retry before giving up. */
export async function adminRequest(path, options = {}) {
  let { response, payload } = await send(path, options);
  if (response.status === 401 && !path.startsWith('/auth/')) {
    const refreshed = await send('/auth/refresh', { method: 'POST' });
    if (refreshed.response.ok) ({ response, payload } = await send(path, options));
    if (response.status === 401) window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
  }
  if (!response.ok) {
    const error = new Error(payload.message || 'Something went wrong.');
    error.status = response.status;
    error.details = payload.errors;
    throw error;
  }
  return payload.data;
}

export const adminApi = {
  login: (email, password) => adminRequest('/auth/login', { method: 'POST', body: { email, password } }),
  logout: () => adminRequest('/auth/logout', { method: 'POST' }),
  me: () => adminRequest('/auth/me'),
  dashboard: () => adminRequest('/dashboard'),

  blogOptions: () => adminRequest('/blog-options'),
  blogs: () => adminRequest('/blogs'),
  blog: (id) => adminRequest(`/blogs/${id}`),
  createBlog: (data) => adminRequest('/blogs', { method: 'POST', body: data }),
  updateBlog: (id, data) => adminRequest(`/blogs/${id}`, { method: 'PUT', body: data }),
  deleteBlog: (id) => adminRequest(`/blogs/${id}`, { method: 'DELETE' }),

  jobs: () => adminRequest('/jobs'),
  job: (id) => adminRequest(`/jobs/${id}`),
  createJob: (data) => adminRequest('/jobs', { method: 'POST', body: data }),
  updateJob: (id, data) => adminRequest(`/jobs/${id}`, { method: 'PUT', body: data }),
  deleteJob: (id) => adminRequest(`/jobs/${id}`, { method: 'DELETE' }),

  meetings: () => adminRequest('/meetings'),
  setMeetingStatus: (id, status) => adminRequest(`/meetings/${id}`, { method: 'PATCH', body: { status } }),

  uploadImage: (file) => {
    const form = new FormData();
    form.append('file', file);
    return adminRequest('/uploads', { method: 'POST', form });
  },
};
