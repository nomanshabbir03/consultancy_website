import { apiRequest } from './api';

export const fetchFaqs = (signal) => apiRequest('/faqs', { signal });
export const fetchTeam = (signal) => apiRequest('/team', { signal });
export const fetchSuccessStories = (signal) => apiRequest('/success-stories', { signal });
export const fetchTestimonials = (signal) => apiRequest('/testimonials', { signal });
