/** Initials badge used when a team photo is missing, so a broken-image icon never shows. */
export function avatarFallback(name = '') {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="#2b3990"/><text x="150" y="185" font-family="Arial,sans-serif" font-size="110" fill="#fff" text-anchor="middle">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** onError handler: swap in the initials badge once (guards against an error loop). */
export const fallbackPhoto = (name) => (e) => {
  if (e.currentTarget.dataset.fallback) return;
  e.currentTarget.dataset.fallback = '1';
  e.currentTarget.src = avatarFallback(name);
};
