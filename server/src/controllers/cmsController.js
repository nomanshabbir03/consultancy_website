import { publicSchema } from '../cms/registry.js';
import * as cms from '../services/cmsService.js';
import * as collections from '../services/collectionService.js';
import * as media from '../services/mediaService.js';

const ok = (res, data, status = 200) => res.status(status).json({ success: true, data });

// ------------------------------------------------------------ public (published content only)
export async function publicSite(req, res) {
  // Browsers always revalidate (a publish must show on the next page view); only the CDN may reuse it briefly.
  res.set('Cache-Control', 'public, max-age=0, must-revalidate');
  res.set('Vercel-CDN-Cache-Control', 's-maxage=15, stale-while-revalidate=120');
  ok(res, await cms.siteContent());
}

// ------------------------------------------------------------ admin: sections
export const schema = async (req, res) => ok(res, { pages: publicSchema(), collections: collections.collectionSchemas() });
export const overview = async (req, res) => ok(res, await cms.overview());
export const getSection = async (req, res) => ok(res, await cms.getSection(req.params.page, req.params.key));
export const saveSection = async (req, res) => ok(res, await cms.saveDraft(req.params.page, req.params.key, req.body, req.admin));
export const publishSection = async (req, res) => ok(res, await cms.publish(req.params.page, req.params.key, req.admin));
export const discardSection = async (req, res) => ok(res, await cms.discard(req.params.page, req.params.key, req.admin));
/** Draft-aware version of the public payload, used by "Preview". */
export const previewSite = async (req, res) => ok(res, await cms.siteContent({ preview: true }));

// ------------------------------------------------------------ admin: media
export const listMedia = async (req, res) => ok(res, await media.listMedia({ q: req.query.q, source: req.query.source }));
export const uploadMedia = async (req, res) => ok(res, await media.uploadMedia(req.file, req.body), 201);
export const updateMedia = async (req, res) => ok(res, await media.updateMedia(req.params.id, req.body));
export const replaceMedia = async (req, res) => ok(res, await media.replaceMedia(req.params.id, req.file));
export const mediaUsage = async (req, res) => ok(res, await media.getUsage(req.params.id));
export const deleteMedia = async (req, res) => ok(res, await media.deleteMedia(req.params.id));
export const syncMedia = async (req, res) => ok(res, await media.syncMedia());

// ------------------------------------------------------------ admin: collections
export const listItems = async (req, res) => ok(res, await collections.listItems(req.params.name));
export const getItem = async (req, res) => ok(res, await collections.getItem(req.params.name, req.params.id));
export const createItem = async (req, res) => ok(res, await collections.createItem(req.params.name, req.body), 201);
export const updateItem = async (req, res) => ok(res, await collections.updateItem(req.params.name, req.params.id, req.body));
export const setItemVisible = async (req, res) => ok(res, await collections.setVisible(req.params.name, req.params.id, req.body?.visible));
export const deleteItem = async (req, res) => ok(res, await collections.deleteItem(req.params.name, req.params.id));
export const reorderItems = async (req, res) => ok(res, await collections.reorder(req.params.name, req.body?.ids));
