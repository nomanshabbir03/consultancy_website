import DOMPurify from 'dompurify';

/** Sanitises CMS HTML (blog articles, excerpts, job descriptions) right before it is rendered: no scripts, handlers or javascript: URLs. */
export const safeHtml = (html) => DOMPurify.sanitize(String(html ?? ''), { ADD_ATTR: ['target'] });
