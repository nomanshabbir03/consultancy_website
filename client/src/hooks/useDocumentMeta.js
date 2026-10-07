import { useEffect } from 'react';

const SITE_URL = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '');
const SITE_NAME = 'Cornerstone Medical Solutions';

function upsert(selector, create, attrs) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement(create);
    document.head.appendChild(tag);
  }
  Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value));
}

const absolute = (url) => (!url ? '' : /^https?:\/\//.test(url) ? url : `${SITE_URL || window.location.origin}${url.startsWith('/') ? url : `/${url}`}`);

/**
 * Sets <title>, description, canonical, Open Graph / Twitter tags and (optionally) JSON-LD for the current page.
 * The canonical host comes from VITE_SITE_URL when set, otherwise from the origin the page is served on.
 * `jsonLd` is an object or array of schema.org objects that accurately describe the page.
 */
export default function useDocumentMeta({ title, description, image, type = 'website', jsonLd } = {}) {
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    if (!title && !description) return;
    const url = `${SITE_URL || window.location.origin}${window.location.pathname}`;
    if (title) document.title = title;
    if (description) upsert('meta[name="description"]', 'meta', { name: 'description', content: description });
    upsert('link[rel="canonical"]', 'link', { rel: 'canonical', href: url });

    const og = { 'og:type': type, 'og:site_name': SITE_NAME, 'og:url': url };
    if (title) og['og:title'] = title;
    if (description) og['og:description'] = description;
    if (image) og['og:image'] = absolute(image);
    Object.entries(og).forEach(([property, content]) => upsert(`meta[property="${property}"]`, 'meta', { property, content }));

    const twitter = { 'twitter:card': image ? 'summary_large_image' : 'summary' };
    if (title) twitter['twitter:title'] = title;
    if (description) twitter['twitter:description'] = description;
    if (image) twitter['twitter:image'] = absolute(image);
    Object.entries(twitter).forEach(([name, content]) => upsert(`meta[name="${name}"]`, 'meta', { name, content }));

    // Page-level structured data replaces whatever the previous page (or the server) put there.
    document.head.querySelectorAll('script[data-seo]').forEach((node) => node.remove());
    if (jsonLdText) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seo = 'client';
      script.textContent = jsonLdText;
      document.head.appendChild(script);
    }
  }, [title, description, image, type, jsonLdText]);
}
