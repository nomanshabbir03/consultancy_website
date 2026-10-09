import ApiError from '../utils/ApiError.js';
import { sanitizeRichText, stripTags } from '../utils/sanitize.js';

/**
 * Schema-driven validation for CMS content. A schema is a list of field definitions:
 *   { key, type, label, required?, max?, options?, fields?, maxItems?, min?, help? }
 * with type = text | textarea | richtext | url | image | boolean | select | number | list.
 * The output only contains the keys the schema declares, in schema order, so unknown input is dropped
 * and the result is deterministic (needed to compare draft and published content).
 */

const CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;
// Site-relative path, in-page anchor, or an absolute http(s) / mailto / tel address. Never javascript:, data: or protocol-relative.
const SAFE_URL = /^(\/(?!\/)[^\s]*|#[^\s]*|https?:\/\/[^\s]+|mailto:[^\s]+|tel:[+0-9()\-.\s]+)$/i;
const SAFE_IMAGE = /^(\/(?!\/)[^\s]+|https?:\/\/[^\s]+)$/i;

export const cleanUrl = (value) => {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) return '';
  return text.length <= 2000 && SAFE_URL.test(text) ? text : null;
};
export const cleanImage = (value) => {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) return '';
  return text.length <= 1000 && SAFE_IMAGE.test(text) ? text : null;
};

function cleanValue(field, value, path, errors) {
  const fail = (message) => {
    errors[path] = message;
    return undefined;
  };
  const label = field.label || field.key;

  switch (field.type) {
    case 'text':
    case 'textarea': {
      let text = typeof value === 'string' ? value.replace(CONTROL, '') : '';
      text = field.type === 'text' ? text.replace(/\s+/g, ' ').trim() : text.replace(/\r\n?/g, '\n').trim();
      if (!text) return field.required ? fail(`${label} is required.`) : '';
      if (text.length > (field.max ?? 500)) return fail(`${label} must be at most ${field.max ?? 500} characters.`);
      if (field.pattern && !field.pattern.test(text)) return fail(`${label} is not valid.`);
      return text;
    }
    case 'richtext': {
      const html = sanitizeRichText(typeof value === 'string' ? value : '', 'basic').trim();
      if (!stripTags(html)) return field.required ? fail(`${label} is required.`) : '';
      if (html.length > (field.max ?? 20000)) return fail(`${label} is too long.`);
      return html;
    }
    case 'url': {
      const url = cleanUrl(value);
      if (url === null) return fail(`${label} must be a site path like /contact-us, or start with https://, mailto: or tel:.`);
      if (!url && field.required) return fail(`${label} is required.`);
      return url;
    }
    case 'image': {
      const url = cleanImage(value);
      if (url === null) return fail(`${label} must be a site path or an https:// address.`);
      if (!url && field.required) return fail(`${label} is required.`);
      return url;
    }
    case 'boolean':
      return value === true || value === 'true';
    case 'number': {
      const n = Number(value);
      if (value === '' || value == null || !Number.isFinite(n) || !Number.isInteger(n)) return fail(`${label} must be a whole number.`);
      if (n < (field.min ?? 0) || n > (field.max ?? 1e9)) return fail(`${label} must be between ${field.min ?? 0} and ${field.max ?? 1e9}.`);
      return n;
    }
    case 'select': {
      const allowed = field.options.map((o) => o.value);
      const chosen = field.numeric ? Number(value) : value;
      if (!allowed.includes(chosen)) return field.required === false && !value ? '' : fail(`Please choose a valid ${label.toLowerCase()}.`);
      return chosen;
    }
    case 'list': {
      const items = Array.isArray(value) ? value : [];
      if (items.length > (field.maxItems ?? 50)) return fail(`${label} can have at most ${field.maxItems ?? 50} items.`);
      if (field.required && !items.length) return fail(`${label} needs at least one item.`);
      return items.map((item, i) => cleanObject(field.fields, item, `${path}.${i}`, errors));
    }
    default:
      throw new Error(`Unknown CMS field type: ${field.type}`);
  }
}

function cleanObject(fields, input, path, errors) {
  const source = input && typeof input === 'object' && !Array.isArray(input) ? input : {};
  const out = {};
  for (const field of fields) {
    out[field.key] = cleanValue(field, source[field.key], path ? `${path}.${field.key}` : field.key, errors);
  }
  return out;
}

/** Validates + normalises `input` against `fields` (see above). Throws a 400 carrying a `path -> message` map. */
export function validateContent(fields, input, { toggle = false, check } = {}) {
  const errors = {};
  const out = cleanObject(fields, input, '', errors);
  if (toggle) out._enabled = input?._enabled !== false;
  if (!Object.keys(errors).length && check) Object.assign(errors, check(out));
  if (Object.keys(errors).length) throw ApiError.badRequest('Please fix the highlighted fields.', errors);
  return out;
}

/** Content with defaults merged under it, so a section always has every field the schema declares. */
export function withDefaults(fields, content, { toggle = false } = {}) {
  const out = cleanObject(fields, content, '', {}); // lenient: problems are ignored when only reading
  if (toggle) out._enabled = content?._enabled !== false;
  return out;
}

/** JSON with sorted keys: jsonb does not preserve key order, so equality must not depend on it. */
export const stable = (value) =>
  JSON.stringify(value, (key, v) =>
    v && typeof v === 'object' && !Array.isArray(v) ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => (a < b ? -1 : 1))) : v
  );

export const sameContent = (a, b) => stable(a) === stable(b);
