import * as siteContent from '../services/siteContentService.js';

const list = (loader) => async (req, res) => {
  const data = await loader();
  res.json({ success: true, data });
};

export const listFaqs = list(siteContent.listFaqs);
export const listTeamMembers = list(siteContent.listTeamMembers);
export const listSuccessStories = list(siteContent.listSuccessStories);
export const getTestimonials = list(siteContent.getTestimonials);
