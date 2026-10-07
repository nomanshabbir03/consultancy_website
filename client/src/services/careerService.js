import { apiRequest } from './api';

export const fetchJobs = (signal) => apiRequest('/careers', { signal });
export const fetchJob = (idOrSlug, signal) => apiRequest(`/careers/${encodeURIComponent(idOrSlug)}`, { signal });
export const submitApplication = (jobId, data) =>
  apiRequest(`/careers/${encodeURIComponent(jobId)}/apply`, { method: 'POST', body: data });
