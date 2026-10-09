import { Fragment } from 'react';

/** Renders CMS heading text where `**word**` is the accent word, using the site's existing blue accent (never raw HTML). */
export default function Accent({ text }) {
  const parts = String(text ?? '').split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 ? (
      <span key={i} className="text-[#00aeef]">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}
