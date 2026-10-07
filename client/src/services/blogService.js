import { apiRequest } from './api';

export const fetchBlogPosts = (signal, limit) =>
  apiRequest(`/blogs${limit ? `?limit=${limit}` : ''}`, { signal });
export const fetchBlogPost = (slug, signal) => apiRequest(`/blogs/${encodeURIComponent(slug)}`, { signal });
export const fetchBlogCategories = (signal) => apiRequest('/blog-categories', { signal });
