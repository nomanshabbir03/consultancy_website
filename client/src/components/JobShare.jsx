import { useEffect, useState } from 'react';
import { useSiteContent } from '../content/SiteContent';

/** Share icon that fans out the social links when toggled (pure CSS checkbox, as on the original). */
export function ShareFan() {
  const { socialLinks } = useSiteContent();
  const FAN_LINKS = socialLinks.map((link, i) => ({
    id: `${link.label.toLowerCase()}-share`,
    cls: `icon-${i + 1}`,
    href: link.href,
    icon: `fab ${link.icon}`,
  }));
  return (
    <div className="flex justify-center items-center mx-auto mt-[30px]">
      <div className="relative">
        <label htmlFor="click" className="share-btn">
          <input type="checkbox" id="click" />
          <span className="fas fa-share-alt" />
          {FAN_LINKS.map((link) => (
            <a key={link.id} id={link.id} className={link.cls} href={link.href} target="_blank" rel="noopener noreferrer">
              <span className={link.icon} />
            </a>
          ))}
        </label>
      </div>
    </div>
  );
}

/** "Refer a Friend" dialog with share links for the current page. */
export function ReferModal({ open, onClose }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (open) setUrl(window.location.href);
  }, [open]);

  if (!open) return null;
  const encoded = encodeURIComponent(url);
  const links = [
    ['Share on Facebook', `https://www.facebook.com/sharer/sharer.php?u=${encoded}`],
    ['Share on Instagram', `https://www.instagram.com/?url=${encoded}`],
    ['Share on LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`],
    ['Share on WhatsApp', `https://wa.me/?text=${encodeURIComponent(`Check out this cool website: ${url}`)}`],
  ];

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50" role="dialog" aria-label="Share this page">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Share this page:</h2>
        <ul className="space-y-4">
          {links.map(([label, href]) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button type="button" className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
