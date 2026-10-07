import * as blogService from '../services/blogService.js';

export async function listBlogs(req, res) {
  const limit = Number.parseInt(req.query.limit, 10);
  const data = await blogService.listBlogs({ limit: limit > 0 ? Math.min(limit, 50) : undefined });
  res.json({ success: true, count: data.length, data });
}

export async function getBlog(req, res) {
  res.json({ success: true, data: await blogService.getBlogBySlug(req.params.slug) });
}

export async function listCategories(req, res) {
  res.json({ success: true, data: await blogService.listCategories() });
}
