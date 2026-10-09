import { useState } from 'react';
import MediaPicker from './MediaPicker';
import RichTextEditor from './RichTextEditor';

/** Adds a client-only `_k` key to every list item so React can keep item state stable while reordering (the API drops it). */
let counter = 0;
export function decorate(fields, value) {
  const out = { ...value };
  for (const f of fields) {
    if (f.type === 'list') out[f.key] = (value?.[f.key] ?? []).map((item) => ({ ...decorate(f.fields, item), _k: item._k ?? `k${++counter}` }));
  }
  return out;
}

export function blankItem(fields) {
  const item = { _k: `k${++counter}` };
  for (const f of fields) item[f.key] = f.type === 'list' ? [] : f.type === 'boolean' ? f.default ?? false : f.type === 'select' ? f.options[0]?.value ?? '' : '';
  return item;
}

function ImageField({ id, field, value, onChange, invalid }) {
  const [picking, setPicking] = useState(false);
  return (
    <div className="adm-image adm-fieldimage" aria-invalid={invalid}>
      {value ? <img src={value} alt="" /> : <p className="adm-help" style={{ marginBottom: 10 }}>No image selected.</p>}
      <div className="adm-formbar">
        <button type="button" id={id} className="adm-btn is-ghost is-small" onClick={() => setPicking(true)}>
          {value ? 'Change image' : 'Choose image'}
        </button>
        {value && !field.required && (
          <button type="button" className="adm-btn is-ghost is-small" onClick={() => onChange('')}>
            Remove
          </button>
        )}
      </div>
      {value && <p className="adm-help" style={{ wordBreak: 'break-all' }}>{value}</p>}
      <MediaPicker
        open={picking}
        onClose={() => setPicking(false)}
        onSelect={({ url }) => {
          onChange(url);
          setPicking(false);
        }}
      />
    </div>
  );
}

function ListField({ field, value, onChange, errors, path }) {
  const items = value ?? [];
  const max = field.maxItems ?? 50;
  const set = (next) => onChange(next);
  const move = (i, delta) => {
    const next = [...items];
    const j = i + delta;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    set(next);
  };
  const titleOf = (item, i) => {
    const raw = item[field.itemLabel ?? 'label'];
    const option = field.fields.find((f) => f.key === (field.itemLabel ?? 'label'))?.options?.find((o) => o.value === raw);
    return option?.label || raw || `Item ${i + 1}`;
  };
  return (
    <div className="adm-list">
      {items.map((item, i) => {
        const hasError = Object.keys(errors).some((k) => k.startsWith(`${path}.${i}.`));
        return (
          <details key={item._k ?? i} className={`adm-listitem ${hasError ? 'has-error' : ''}`} open={hasError || undefined}>
            <summary>
              <span className="adm-listtitle">{titleOf(item, i)}</span>
              <span className="adm-listactions" onClick={(e) => e.preventDefault()}>
                <button type="button" className="adm-iconbtn-sm" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>
                  <i className="fa-solid fa-arrow-up" aria-hidden="true" />
                </button>
                <button type="button" className="adm-iconbtn-sm" aria-label="Move down" disabled={i === items.length - 1} onClick={() => move(i, 1)}>
                  <i className="fa-solid fa-arrow-down" aria-hidden="true" />
                </button>
                <button type="button" className="adm-iconbtn-sm is-danger" aria-label="Remove item" onClick={() => set(items.filter((_, j) => j !== i))}>
                  <i className="fa-solid fa-trash" aria-hidden="true" />
                </button>
              </span>
            </summary>
            <div className="adm-listbody">
              <SchemaForm fields={field.fields} value={item} errors={errors} basePath={`${path}.${i}`} onChange={(patch) => set(items.map((it, j) => (j === i ? { ...it, ...patch } : it)))} />
            </div>
          </details>
        );
      })}
      <button type="button" className="adm-btn is-ghost is-small" disabled={items.length >= max} onClick={() => set([...items, blankItem(field.fields)])}>
        <i className="fa-solid fa-plus" aria-hidden="true" /> Add {field.itemNoun ?? 'item'}
      </button>
      {items.length >= max && <p className="adm-help">Maximum of {max} reached.</p>}
    </div>
  );
}

/** Renders the form for a list of field definitions (see server/src/cms/registry.js). `onChange` receives a partial object. */
export default function SchemaForm({ fields, value, onChange, errors = {}, basePath = '' }) {
  return (
    <div className="adm-stack">
      {fields.map((field) => {
        const path = basePath ? `${basePath}.${field.key}` : field.key;
        const id = `f-${path.replace(/\./g, '-')}`;
        const v = value?.[field.key];
        const error = errors[path];
        const set = (next) => onChange({ [field.key]: next });
        let control;
        switch (field.type) {
          case 'textarea':
            control = <textarea id={id} rows={4} maxLength={field.max} value={v ?? ''} placeholder={field.placeholder} onChange={(e) => set(e.target.value)} />;
            break;
          case 'richtext':
            control = <RichTextEditor basic value={v ?? ''} onChange={set} />;
            break;
          case 'boolean':
            control = (
              <label className="adm-check">
                <input id={id} type="checkbox" checked={Boolean(v)} onChange={(e) => set(e.target.checked)} /> {field.label}
              </label>
            );
            break;
          case 'number':
            control = <input id={id} type="number" inputMode="numeric" min={field.min} max={field.max} value={v ?? ''} onChange={(e) => set(e.target.value === '' ? '' : Number(e.target.value))} />;
            break;
          case 'select':
            control = (
              <select id={id} value={v ?? ''} onChange={(e) => set(field.numeric ? Number(e.target.value) : e.target.value)}>
                {field.required === false && <option value="">-</option>}
                {field.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            );
            break;
          case 'image':
            control = <ImageField id={id} field={field} value={v ?? ''} onChange={set} invalid={Boolean(error)} />;
            break;
          case 'list':
            control = <ListField field={field} value={v} onChange={set} errors={errors} path={path} />;
            break;
          default:
            control = (
              <input id={id} type="text" maxLength={field.max} value={v ?? ''} placeholder={field.placeholder} autoComplete="off" onChange={(e) => set(e.target.value)} />
            );
        }
        return (
          <div className="adm-field" key={field.key}>
            {field.type !== 'boolean' && (
              <label htmlFor={id}>
                {field.label}
                {field.required && <span className="adm-req" aria-hidden="true"> *</span>}
              </label>
            )}
            {control}
            {field.help && field.type !== 'boolean' && <p className="adm-help">{field.help}</p>}
            {error && (
              <p className="adm-fielderr" role="alert">
                {error}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
