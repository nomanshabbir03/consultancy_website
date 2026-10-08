import { clearSessionCookies, readCookies, REFRESH_COOKIE, ACCESS_COOKIE, setSessionCookies } from '../middleware/adminAuth.js';
import * as auth from '../services/adminAuthService.js';
import * as admin from '../services/adminService.js';
import { uploadImage } from '../services/storageService.js';

const ok = (res, data, status = 200) => res.status(status).json({ success: true, data });

// ----------------------------------------------------------------- session
export async function login(req, res) {
  const { session, user } = await auth.login(req.body?.email, req.body?.password);
  setSessionCookies(res, session); // httpOnly cookies: the tokens are never readable by page scripts
  ok(res, user);
}

export async function refresh(req, res) {
  const { session, user } = await auth.refresh(readCookies(req)[REFRESH_COOKIE]);
  setSessionCookies(res, session);
  ok(res, user);
}

export async function logout(req, res) {
  const token = readCookies(req)[ACCESS_COOKIE];
  if (token) await auth.revoke(token);
  clearSessionCookies(res);
  ok(res, null);
}

export const me = (req, res) => ok(res, req.admin);

// --------------------------------------------------------------- resources
export const dashboard = async (req, res) => ok(res, await admin.getDashboard());

export const blogOptions = async (req, res) => ok(res, await admin.getBlogOptions());
export const listBlogs = async (req, res) => ok(res, await admin.listBlogs());
export const getBlog = async (req, res) => ok(res, await admin.getBlog(req.params.id));
export const createBlog = async (req, res) => ok(res, await admin.createBlog(req.body), 201);
export const updateBlog = async (req, res) => ok(res, await admin.updateBlog(req.params.id, req.body));
export const deleteBlog = async (req, res) => ok(res, await admin.deleteBlog(req.params.id));

export const listJobs = async (req, res) => ok(res, await admin.listJobs());
export const getJob = async (req, res) => ok(res, await admin.getJob(req.params.id));
export const createJob = async (req, res) => ok(res, await admin.createJob(req.body), 201);
export const updateJob = async (req, res) => ok(res, await admin.updateJob(req.params.id, req.body));
export const deleteJob = async (req, res) => ok(res, await admin.deleteJob(req.params.id));

export const listMeetings = async (req, res) => ok(res, await admin.listMeetings());
export const updateMeeting = async (req, res) => ok(res, await admin.updateMeetingStatus(req.params.id, req.body?.status));

export const uploadImageFile = async (req, res) => ok(res, await uploadImage(req.file, 'blogs'), 201);
