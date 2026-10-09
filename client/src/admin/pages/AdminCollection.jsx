import { useCallback, useState } from 'react';
import { adminApi } from '../adminApi';
import { useCmsSchema } from '../cmsSchema';
import ConfirmDialog from '../components/ConfirmDialog';
import SchemaForm from '../components/SchemaForm';
import useAdminData from '../useAdminData';

const blank = (fields) => Object.fromEntries(fields.map((f) => [f.key, f.type === 'select' ? f.options[0].value : '']));

function ItemForm({ name, config, item, onClose, onSaved }) {
  const [values, setValues] = useState(() => ({ ...blank(config.fields), ...(item ?? {}) }));
  const [visible, setVisible] = useState(item ? item.visible : false);
  const [errors, setErrors] = useState({});
  const [failure, setFailure] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFailure('');
    try {
      const body = { ...values, visible };
      if (item) await adminApi.updateItem(name, item.id, body);
      else await adminApi.createItem(name, body);
      onSaved(item ? `${config.singular} updated.` : `${config.singular} added.${visible ? '' : ' It is hidden until you make it visible.'}`);
    } catch (err) {
      setErrors(err.details ?? {});
      setFailure(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="adm-modal" role="dialog" aria-modal="true" aria-label={item ? `Edit ${config.singular}` : `Add ${config.singular}`}>
      <form className="adm-card adm-itemform" onSubmit={submit} noValidate>
        <h2>{item ? `Edit ${config.singular}` : `Add ${config.singular}`}</h2>
        {failure && <div className="adm-alert is-error" role="alert">{failure}</div>}
        <SchemaForm fields={config.fields} value={values} errors={errors} onChange={(patch) => setValues((v) => ({ ...v, ...patch }))} />
        <div className="adm-field" style={{ marginTop: 18 }}>
          <label className="adm-check">
            <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} /> Visible on the website
          </label>
          {item ? <p className="adm-help">Saving changes to a visible item updates the live website straight away.</p> : <p className="adm-help">New items stay hidden until this is ticked.</p>}
        </div>
        <div className="adm-formbar" style={{ justifyContent: 'flex-end', marginTop: 18 }}>
          <button type="button" className="adm-btn is-ghost" disabled={saving} onClick={onClose}>Cancel</button>
          <button type="submit" className="adm-btn" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
        </div>
      </form>
    </div>
  );
}

/** Generic manager for repeatable content (FAQs, team, testimonials, success stories): add, edit, delete, show/hide, reorder. */
export default function AdminCollection({ name }) {
  const schema = useCmsSchema();
  const config = schema.data?.collections?.[name];
  const loader = useCallback(() => adminApi.items(name), [name]);
  const { data, loading, error, reload } = useAdminData(loader);
  const [editing, setEditing] = useState(null); // item | 'new' | null
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [failure, setFailure] = useState('');

  if (schema.loading) return <p className="adm-sub">Loading…</p>;
  if (!config) return <div className="adm-alert is-error">{schema.error || 'Unknown content type.'}</div>;
  const rows = data ?? [];

  const act = async (action, ok) => {
    setBusy(true);
    setFailure('');
    try {
      await action();
      if (ok) setMessage(ok);
      await reload();
    } catch (err) {
      setFailure(err.message);
    } finally {
      setBusy(false);
    }
  };

  const move = (i, delta) => {
    const ids = rows.map((r) => r.id);
    const j = i + delta;
    if (j < 0 || j >= ids.length) return;
    [ids[i], ids[j]] = [ids[j], ids[i]];
    act(() => adminApi.reorderItems(name, ids), 'Order updated.');
  };

  return (
    <>
      <div className="adm-pagehead">
        <div>
          <h1>{config.title}</h1>
          <p className="adm-sub">{config.description} Use the arrows to change the order on the website.</p>
        </div>
        <button type="button" className="adm-btn" onClick={() => setEditing('new')}>
          <i className="fa-solid fa-plus" aria-hidden="true" /> Add {config.singular}
        </button>
      </div>
      {message && <div className="adm-alert is-ok" role="status">{message}</div>}
      {(error || failure) && <div className="adm-alert is-error" role="alert">{error || failure}</div>}
      <div className="adm-tablewrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th style={{ width: 80 }}>Order</th>
              {config.imageField && <th style={{ width: 80 }}>Image</th>}
              <th>{config.fields.find((f) => f.key === config.titleField)?.label}</th>
              <th>Visible</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id}>
                <td>
                  <div className="adm-actions">
                    <button type="button" className="adm-iconbtn-sm" aria-label="Move up" disabled={busy || i === 0} onClick={() => move(i, -1)}><i className="fa-solid fa-arrow-up" aria-hidden="true" /></button>
                    <button type="button" className="adm-iconbtn-sm" aria-label="Move down" disabled={busy || i === rows.length - 1} onClick={() => move(i, 1)}><i className="fa-solid fa-arrow-down" aria-hidden="true" /></button>
                  </div>
                </td>
                {config.imageField && <td>{r[config.imageField] ? <img className="adm-thumb" src={r[config.imageField]} alt="" /> : <span className="adm-sub">-</span>}</td>}
                <td>
                  <div className="adm-title">{r[config.titleField]}</div>
                  {config.subtitleField && <div className="adm-msg">{String(r[config.subtitleField]).slice(0, 110)}</div>}
                </td>
                <td>
                  <button type="button" className={`adm-badge ${r.visible ? 'is-ok' : 'is-warn'} adm-badgebtn`} disabled={busy} onClick={() => act(() => adminApi.setItemVisible(name, r.id, !r.visible), r.visible ? 'Hidden from the website.' : 'Now visible on the website.')}>
                    {r.visible ? 'Visible' : 'Hidden'}
                  </button>
                </td>
                <td>
                  <div className="adm-actions">
                    <button type="button" className="adm-btn is-ghost is-small" onClick={() => setEditing(r)}>Edit</button>
                    <button type="button" className="adm-btn is-danger is-small" onClick={() => setToDelete(r)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && rows.length === 0 && <p className="adm-empty">Nothing here yet.</p>}
        {loading && <p className="adm-empty">Loading…</p>}
      </div>
      {editing && (
        <ItemForm
          name={name}
          config={config}
          item={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={(msg) => {
            setEditing(null);
            setMessage(msg);
            reload();
          }}
        />
      )}
      <ConfirmDialog
        open={Boolean(toDelete)}
        title={`Delete this ${config.singular}?`}
        message={`"${toDelete?.[config.titleField]}" will be permanently removed. To keep it but hide it from the website, use the Visible toggle instead.`}
        busy={busy}
        onConfirm={async () => {
          const target = toDelete;
          setToDelete(null);
          await act(() => adminApi.deleteItem(name, target.id), `${config.singular} deleted.`);
        }}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
