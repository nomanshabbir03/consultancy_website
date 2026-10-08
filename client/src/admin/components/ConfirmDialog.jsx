import { useEffect } from 'react';

/** Small modal used to confirm destructive actions. */
export default function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', busy = false, onConfirm, onCancel }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && !busy && onCancel();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, busy, onCancel]);

  if (!open) return null;
  return (
    <div className="adm-modal" role="dialog" aria-modal="true" aria-labelledby="adm-confirm-title">
      <div className="adm-card">
        <h2 id="adm-confirm-title">{title}</h2>
        <p>{message}</p>
        <div className="adm-formbar">
          <button type="button" className="adm-btn is-ghost" disabled={busy} onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="adm-btn is-danger" disabled={busy} onClick={onConfirm}>
            {busy ? 'Working…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
