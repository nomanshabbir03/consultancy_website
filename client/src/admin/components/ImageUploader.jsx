import { useRef, useState } from 'react';
import { adminApi } from '../adminApi';

const MAX_BYTES = 3 * 1024 * 1024;
const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/** Featured-image picker: validates, uploads through the admin API to Supabase storage and previews the result before saving. */
export default function ImageUploader({ value, onChange }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [localPreview, setLocalPreview] = useState('');

  const onFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!TYPES.includes(file.type)) return setError('Please choose a JPG, PNG, WebP or GIF image.');
    if (file.size > MAX_BYTES) return setError('The image must be 3 MB or smaller.');
    setError('');
    setBusy(true);
    setLocalPreview(URL.createObjectURL(file)); // instant preview while the upload runs
    try {
      const { url } = await adminApi.uploadImage(file);
      onChange(url);
    } catch (err) {
      setLocalPreview('');
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const preview = localPreview || value;
  return (
    <div className="adm-image">
      {preview ? <img src={preview} alt="Featured image preview" /> : <p className="adm-help" style={{ marginBottom: 10 }}>No image selected.</p>}
      <div className="adm-formbar">
        <button type="button" className="adm-btn is-ghost is-small" disabled={busy} onClick={() => inputRef.current?.click()}>
          {busy ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
        </button>
        {value && !busy && (
          <button
            type="button"
            className="adm-btn is-ghost is-small"
            onClick={() => {
              setLocalPreview('');
              onChange('');
            }}
          >
            Remove
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept={TYPES.join(',')} hidden onChange={onFile} />
      <p className="adm-help">JPG, PNG, WebP or GIF, up to 3 MB.</p>
      {error && <p className="adm-fielderr">{error}</p>}
    </div>
  );
}
