import sanitizeHtml from 'sanitize-html';

const COLOR = [/^#[0-9a-f]{3,8}$/i, /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i];

const SAFE_STYLE = {
  'text-align': [/^(left|right|center|justify)$/],
  color: COLOR,
  'background-color': COLOR,
  'font-size': [/^\d+(\.\d+)?(px|pt|em|rem|%)$/],
  'font-weight': [/^(normal|bold|[1-9]00)$/],
  'font-style': [/^(normal|italic)$/],
  'text-decoration': [/^(none|underline|line-through)$/],
};

const OPTIONS = {
  allowedTags: [
    'p', 'br', 'hr', 'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'b', 'em', 'i', 'u', 's', 'sub', 'sup',
    'a', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'img', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel', 'title'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    th: ['colspan', 'rowspan'],
    td: ['colspan', 'rowspan'],
    '*': ['class', 'style'],
  },
  allowedStyles: { '*': SAFE_STYLE },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['http', 'https'] },
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: { ...attribs, ...(attribs.target === '_blank' ? { rel: 'noopener noreferrer' } : {}) },
    }),
  },
};

/** Removes scripts, event handlers, unsafe URLs and unknown tags/styles from admin-authored HTML before it is stored. */
export const sanitizeRichText = (html) => sanitizeHtml(String(html ?? ''), OPTIONS);

/** Plain-text version (used for excerpts / meta descriptions). */
export const stripTags = (html) =>
  sanitizeHtml(String(html ?? ''), { allowedTags: [], allowedAttributes: {} })
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

export const escapeHtml = (text) =>
  String(text ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
