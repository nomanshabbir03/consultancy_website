import { Router } from 'express';
import * as c from '../controllers/adminController.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import imageUpload from '../middleware/imageUpload.js';
import { adminLimiter, loginLimiter } from '../middleware/security.js';

const router = Router();

// Session endpoints (login / refresh / logout verify the cookies themselves).
router.post('/auth/login', loginLimiter, c.login);
router.post('/auth/refresh', loginLimiter, c.refresh);
router.post('/auth/logout', c.logout);

// Everything below requires a signed-in admin (Supabase Auth session with app_metadata.role = "admin").
router.use(adminLimiter, requireAdmin);

router.get('/auth/me', c.me);
router.get('/dashboard', c.dashboard);

router.get('/blog-options', c.blogOptions);
router.get('/blogs', c.listBlogs);
router.post('/blogs', c.createBlog);
router.get('/blogs/:id', c.getBlog);
router.put('/blogs/:id', c.updateBlog);
router.delete('/blogs/:id', c.deleteBlog);

router.get('/jobs', c.listJobs);
router.post('/jobs', c.createJob);
router.get('/jobs/:id', c.getJob);
router.put('/jobs/:id', c.updateJob);
router.delete('/jobs/:id', c.deleteJob);

router.get('/meetings', c.listMeetings);
router.patch('/meetings/:id', c.updateMeeting);

router.post('/uploads', imageUpload, c.uploadImageFile);

export default router;
