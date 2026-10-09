import { useCallback, useEffect, useRef, useState } from 'react';
import { adminApi } from '../adminApi';
import ConfirmDialog from '../components/ConfirmDialog';
import { formatBytes } from '../components/MediaPicker';
import useAdminData from '../useAdminData';

const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_BYTES = 3 * 1024 * 1024;

function Details({ item, onChanged, onDeleted }) {
  const [alt, setAlt] = useState(item.alt);
  const [usage, setUsage] = useState(null);
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');
  const [failure, setFailure] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const replaceRef = useRef(null);

  useEffect(() => {
    let live = true;
    adminApi.mediaUsage(item.id).then((u) => live && setUsage(u.usedIn)).catch(() => live && setUsage([]));
    return () => {
      live = false;
    };
  }, [item.id, item.updatedAt]);

  const run = async (name, action, ok) => {
    setBusy(name);
    setFailure('');
    setMessage('');
    try {
      const result = await action();
      if (ok) setMessage(ok);
      return result;
    } catch (err) {
      setFailure(err.message);
      return null;
    } finally {
      setBusy('');
    }
  };

  const saveAlt = async () => {
    const updated = await run('alt', () => adminApi.updateMedia(item.id, { alt }), 'Alt text saved.');
    if (updated) onChanged(updated);
  };
  const onReplace = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!TYPES.includes(file.type)) return setFailure('Please choose a JPG, PNG, WebP or GIF image.');
    if (file.size > MAX_BYTES) return setFailure('The image must be 3 MB or smaller.');
    const updated = await run('replace', () => adminApi.replaceMedia(item.id, file), 'Image replaced. Every place that uses it now shows the new file.');
    if (updated) onChanged({ ...updated, url: `${updated.url.split('?')[0]}?v=${Date.now()}` });
  };
  const remove = async () => {
    setConfirmDelete(false);
    const result = await run('delete', () => adminApi.deleteMedia(item.id));
    if (result) onDeleted(item.id);
  };

  return (
    <div className="adm-card adm-mediadetail">
      <img src={item.url} alt={item.alt} />
      <h3 style={{ wordBreak: 'break-word' }}>{item.name}</h3>
      <dl className="adm-meta">
        <dt>Type</dt><dd>{item.mime || '-'}</dd>
        <dt>Size</dt><dd>{formatBytes(item.size)}</dd>
        <dt>Dimensions</dt><dd>{item.width && item.height ? `${item.width} × ${item.height}px` : '-'}</dd>
        <dt>Added</dt><dd>{item.builtin ? 'Ships with the website' : new Date(item.createdAt).toLocaleDateString()}</dd>
        <dt>Address</dt><dd style={{ wordBreak: 'break-all' }}>{item.url.split('?')[0]}</dd>
      </dl>
      {message && <div className="adm-alert is-ok" role="status">{message}</div>}
      {failure && <div className="adm-alert is-error" role="alert">{failure}</div>}
      <div className="adm-field">
        <label htmlFor="m-alt">Alt text</label>
        <input id="m-alt" maxLength={200} value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Describe the image for screen readers and search engines" />
        <div style={{ marginTop: 8 }}>
          <button type="button" className="adm-btn is-small" disabled={busy === 'alt' || alt === item.alt} onClick={saveAlt}>
            {busy === 'alt' ? 'Saving…' : 'Save alt text'}
          </button>
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <strong>Used in</strong>
        {usage === null ? <p className="adm-help">Checking…</p> : usage.length ? <ul className="adm-usage">{usage.map((u) => <li key={u}>{u}</li>)}</ul> : <p className="adm-help">Not used anywhere.</p>}
      </div>
      {item.builtin ? (
        <p className="adm-help" style={{ marginTop: 14 }}>Built-in website images are part of the site. They can be chosen anywhere, but are never replaced or deleted from here.</p>
      ) : (
        <div className="adm-formbar" style={{ marginTop: 16 }}>
          <button type="button" className="adm-btn is-ghost is-small" disabled={Boolean(busy)} onClick={() => replaceRef.current?.click()}>
            {busy === 'replace' ? 'Replacing…' : 'Replace file'}
          </button>
          <input ref={replaceRef} type="file" hidden accept={TYPES.join(',')} onChange={onReplace} />
          <button type="button" className="adm-btn is-danger is-small" disabled={Boolean(busy) || (usage?.length ?? 0) > 0} title={usage?.length ? 'Remove it from where it is used first' : undefined} onClick={() => setConfirmDelete(true)}>
            Delete
          </button>
        </div>
      )}
      {!item.builtin && <p className="adm-help">Replacing keeps the same address, so it updates everywhere immediately (the same file type is required).</p>}
      <ConfirmDialog open={confirmDelete} title="Delete this image?" message={`"${item.name}" will be permanently deleted from storage.`} busy={busy === 'delete'} onConfirm={remove} onCancel={() => setConfirmDelete(false)} />
    </div>
  );
}

export default function AdminMedia() {
  const [source, setSource] = useState('all');
  const [query, setQuery] = useState('');
  const [term, setTerm] = useState('');
  const loader = useCallback(() => adminApi.media({ q: term, source }), [term, source]);
  const { data, loading, error, reload } = useAdminData(loader);
  const [selectedId, setSelectedId] = useState(null);
  const [override, setOverride] = useState({});
  const [message, setMessage] = useState('');
  const [failure, setFailure] = useState('');
  const [busy, setBusy] = useState(false);
  const [alt, setAlt] = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setTerm(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  const items = (data ?? []).map((m) => override[m.id] ?? m);
  const selected = items.find((m) => m.id === selectedId) ?? null;

  const upload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!TYPES.includes(file.type)) return setFailure('Please choose a JPG, PNG, WebP or GIF image.');
    if (file.size > MAX_BYTES) return setFailure('The image must be 3 MB or smaller.');
    setBusy(true);
    setFailure('');
    setMessage('');
    try {
      const created = await adminApi.uploadMedia(file, alt);
      setAlt('');
      setMessage(`"${created.name}" uploaded.`);
      await reload();
      setSelectedId(created.id);
    } catch (err) {
      setFailure(err.message);
    } finally {
      setBusy(false);
    }
  };

  const sync = async () => {
    setBusy(true);
    setFailure('');
    setMessage('');
    try {
      const { added } = await adminApi.syncMedia();
      setMessage(added ? `Imported ${added} existing image${added > 1 ? 's' : ''} from storage.` : 'Everything in storage is already in the library.');
      await reload();
    } catch (err) {
      setFailure(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="adm-pagehead">
        <div>
          <h1>Media</h1>
          <p className="adm-sub">Images used across the website. Uploads are stored in your Supabase storage; built-in images ship with the site.</p>
        </div>
        <div className="adm-formbar">
          <button type="button" className="adm-btn is-ghost" disabled={busy} onClick={sync} title="Add images that are already in storage (e.g. blog images) to this library">
            Import existing uploads
          </button>
          <button type="button" className="adm-btn" disabled={busy} onClick={() => fileRef.current?.click()}>
            <i className="fa-solid fa-upload" aria-hidden="true" /> {busy ? 'Working…' : 'Upload image'}
          </button>
          <input ref={fileRef} type="file" hidden accept={TYPES.join(',')} onChange={upload} />
        </div>
      </div>
      {message && <div className="adm-alert is-ok" role="status">{message}</div>}
      {(error || failure) && <div className="adm-alert is-error" role="alert">{error || failure}</div>}
      <div className="adm-toolbar">
        <input type="search" placeholder="Search by name or alt text…" aria-label="Search images" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select aria-label="Image source" value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="all">All images</option>
          <option value="uploaded">Uploaded</option>
          <option value="builtin">Built-in website images</option>
        </select>
        <input type="text" placeholder="Alt text for the next upload" aria-label="Alt text for the next upload" maxLength={200} value={alt} onChange={(e) => setAlt(e.target.value)} />
      </div>
      <div className="adm-mediapage">
        <div>
          <div className="adm-mediagrid" aria-busy={loading}>
            {items.map((m) => (
              <button key={m.id} type="button" className={`adm-mediacell ${m.id === selectedId ? 'is-selected' : ''}`} onClick={() => setSelectedId(m.id)} title={m.name}>
                <img src={m.url} alt="" loading="lazy" />
                <span>{m.name}</span>
                {m.builtin && <em>built-in</em>}
              </button>
            ))}
          </div>
          {!loading && items.length === 0 && (
            <p className="adm-empty">No images found. Upload one, or run <code>npm run db:seed-media --prefix server</code> to list the images that ship with the website.</p>
          )}
          {loading && <p className="adm-empty">Loading…</p>}
        </div>
        {selected ? (
          <Details
            key={selected.id}
            item={selected}
            onChanged={(updated) => setOverride((o) => ({ ...o, [updated.id]: updated }))}
            onDeleted={(id) => {
              setSelectedId(null);
              setMessage('Image deleted.');
              reload();
              return id;
            }}
          />
        ) : (
          <div className="adm-card adm-mediadetail"><p className="adm-help">Select an image to see its details, edit its alt text, replace or delete it.</p></div>
        )}
      </div>
    </>
  );
}
