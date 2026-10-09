import { Router } from 'express';
import * as c from '../controllers/adminController.js';
import * as cms from '../controllers/cmsController.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import imageUpload from '../middleware/imageUpload.js';
import { adminLimiter, loginLimiter, mediaUploadLimiter } from '../middleware/security.js';

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

// ---- CMS: content sections (draft -> preview -> publish), media library, repeatable collections
router.get('/cms/schema', cms.schema);
router.get('/cms/overview', cms.overview);
router.get('/cms/preview/site', cms.previewSite);
router.get('/cms/sections/:page/:key', cms.getSection);
router.put('/cms/sections/:page/:key', cms.saveSection);
router.post('/cms/sections/:page/:key/publish', cms.publishSection);
router.post('/cms/sections/:page/:key/discard', cms.discardSection);

router.get('/media', cms.listMedia);
router.post('/media', mediaUploadLimiter, imageUpload, cms.uploadMedia);
router.post('/media/sync', cms.syncMedia);
router.put('/media/:id', cms.updateMedia);
router.post('/media/:id/replace', mediaUploadLimiter, imageUpload, cms.replaceMedia);
router.get('/media/:id/usage', cms.mediaUsage);
router.delete('/media/:id', cms.deleteMedia);

router.get('/collections/:name', cms.listItems);
router.post('/collections/:name', cms.createItem);
router.put('/collections/:name/order', cms.reorderItems);
router.get('/collections/:name/:id', cms.getItem);
router.put('/collections/:name/:id', cms.updateItem);
router.patch('/collections/:name/:id/visible', cms.setItemVisible);
router.delete('/collections/:name/:id', cms.deleteItem);

export default router;
