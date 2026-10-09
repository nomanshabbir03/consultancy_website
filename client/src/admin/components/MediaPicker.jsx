import { useCallback, useEffect, useRef, useState } from 'react';
import { adminApi } from '../adminApi';

const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_BYTES = 3 * 1024 * 1024;

export const formatBytes = (n) => (n == null ? '-' : n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1048576).toFixed(2)} MB`);

/** Modal to choose an image from the media library, or upload a new one. Calls onSelect({ url, alt }). */
export default function MediaPicker({ open, onClose, onSelect }) {
  const [source, setSource] = useState('all');
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alt, setAlt] = useState('');
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);

  const load = useCallback(() => {
    setLoading(true);
    setError('');
    return adminApi
      .media({ q: query, source })
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query, source]);

  useEffect(() => {
    if (!open) return undefined;
    const timer = setTimeout(load, query ? 250 : 0);
    return () => clearTimeout(timer);
  }, [open, load, query]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const onFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!TYPES.includes(file.type)) return setError('Please choose a JPG, PNG, WebP or GIF image.');
    if (file.size > MAX_BYTES) return setError('The image must be 3 MB or smaller.');
    setBusy(true);
    setError('');
    try {
      const created = await adminApi.uploadMedia(file, alt);
      setAlt('');
      onSelect({ url: created.url, alt: created.alt });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;
  return (
    <div className="adm-modal" role="dialog" aria-modal="true" aria-label="Choose an image" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="adm-card adm-mediapicker">
        <div className="adm-pagehead" style={{ marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Choose an image</h2>
          <button type="button" className="adm-btn is-ghost is-small" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="adm-toolbar">
          <input type="search" placeholder="Search images…" aria-label="Search images" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select aria-label="Image source" value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="all">All images</option>
            <option value="uploaded">Uploaded</option>
            <option value="builtin">Built-in website images</option>
          </select>
        </div>
        <div className="adm-toolbar">
          <input type="text" placeholder="Alt text for a new upload (describe the image)" aria-label="Alt text for a new upload" maxLength={200} value={alt} onChange={(e) => setAlt(e.target.value)} />
          <button type="button" className="adm-btn is-small" disabled={busy} onClick={() => fileRef.current?.click()}>
            {busy ? 'Uploading…' : 'Upload new image'}
          </button>
          <input ref={fileRef} type="file" accept={TYPES.join(',')} hidden onChange={onFile} />
        </div>
        {error && <div className="adm-alert is-error" role="alert">{error}</div>}
        <div className="adm-mediagrid" aria-busy={loading}>
          {items.map((m) => (
            <button key={m.id} type="button" className="adm-mediacell" title={m.name} onClick={() => onSelect({ url: m.url, alt: m.alt })}>
              <img src={m.url} alt="" loading="lazy" />
              <span>{m.name}</span>
              {m.builtin && <em>built-in</em>}
            </button>
          ))}
        </div>
        {!loading && items.length === 0 && (
          <p className="adm-empty">
            No images found.{source !== 'uploaded' && ' Built-in images appear after running the media seed (npm run db:seed-media --prefix server).'}
          </p>
        )}
        {loading && <p className="adm-empty">Loading…</p>}
      </div>
    </div>
  );
}
