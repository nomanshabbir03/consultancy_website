import { Router } from 'express';
import { getBlog, listBlogs, listCategories } from '../controllers/blogController.js';
import { applyForJob, getJob, listJobs } from '../controllers/careerController.js';
import { createInquiry } from '../controllers/contactController.js';
import { applyLimiter, contactLimiter } from '../middleware/security.js';
import resumeUpload from '../middleware/resumeUpload.js';
import { getHealth } from '../controllers/healthController.js';
import {
  getTestimonials,
  listFaqs,
  listSuccessStories,
  listTeamMembers,
} from '../controllers/siteContentController.js';

const router = Router();

router.get('/health', getHealth);

router.post('/contact', contactLimiter, createInquiry);

router.get('/blogs', listBlogs);
router.get('/blogs/:slug', getBlog);
router.get('/blog-categories', listCategories);

router.get('/careers', listJobs);
router.get('/careers/:id', getJob);
router.post('/careers/:id/apply', applyLimiter, resumeUpload, applyForJob);

router.get('/faqs', listFaqs);
router.get('/team', listTeamMembers);
router.get('/success-stories', listSuccessStories);
router.get('/testimonials', getTestimonials);

export default router;
