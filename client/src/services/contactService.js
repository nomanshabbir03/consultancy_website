import { apiRequest } from './api';

export const submitContactForm = (data) => apiRequest('/contact', { method: 'POST', body: data });
