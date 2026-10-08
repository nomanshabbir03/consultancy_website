import { useMemo, useState } from 'react';
import { adminApi } from '../adminApi';
import useAdminData from '../useAdminData';

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];
const LABEL = { pending: 'Pending', confirmed: 'Confirmed', completed: 'Completed', cancelled: 'Cancelled' };
const TONE = { pending: 'is-warn', confirmed: '', completed: 'is-ok', cancelled: 'is-bad' };

const when = (iso) => {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    time: d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  };
};

export default function AdminMeetings() {
  const { data, loading, error, reload } = useAdminData(adminApi.meetings);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [failure, setFailure] = useState('');
  const [savingId, setSavingId] = useState('');

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    return (data?.items ?? []).filter(
      (m) => (status === 'all' || m.status === status) && (!term || `${m.name} ${m.email} ${m.subject ?? ''} ${m.service ?? ''}`.toLowerCase().includes(term))
    );
  }, [data, query, status]);

  const onStatus = async (meeting, next) => {
    setSavingId(meeting.id);
    setFailure('');
    try {
      await adminApi.setMeetingStatus(meeting.id, next);
      await reload();
    } catch (err) {
      setFailure(err.message);
    } finally {
      setSavingId('');
    }
  };

  return (
    <>
      <div className="adm-pagehead">
        <div>
          <h1>Meetings</h1>
          <p className="adm-sub">Requests sent through the Book A Meeting and Contact Us forms. Only signed-in admins can see them.</p>
        </div>
      </div>
      {(error || failure) && <div className="adm-alert is-error" role="alert">{error || failure}</div>}
      {data && !data.statusSupported && (
        <div className="adm-alert is-info">
          Statuses are not enabled yet. Run the admin migration SQL in Supabase (see the setup notes) to turn on Pending / Confirmed / Completed / Cancelled.
        </div>
      )}
      <div className="adm-toolbar">
        <input type="search" placeholder="Search by name, email or subject…" aria-label="Search meetings" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {LABEL[s]}
            </option>
          ))}
        </select>
      </div>
      <div className="adm-tablewrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th className="adm-hide-sm">Details</th>
              <th>Received</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => {
              const t = when(m.createdAt);
              return (
                <tr key={m.id}>
                  <td className="adm-title">{m.name}</td>
                  <td>
                    <a href={`mailto:${m.email}`}>{m.email}</a>
                    {m.phone && <div className="adm-sub">{m.phone}</div>}
                  </td>
                  <td className="adm-hide-sm">
                    {(m.service || m.subject) && (
                      <div>
                        <strong>{[m.service, m.subject].filter(Boolean).join(' - ')}</strong>
                      </div>
                    )}
                    <div className="adm-msg">{m.message}</div>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {t.date}
                    <div className="adm-sub">{t.time}</div>
                  </td>
                  <td>
                    {data.statusSupported ? (
                      <select aria-label={`Status for ${m.name}`} value={m.status} disabled={savingId === m.id} onChange={(e) => onStatus(m, e.target.value)} style={{ padding: '6px 8px', borderRadius: 6, border: '1px solid #c9d2e6' }}>
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {LABEL[s]}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className={`adm-badge ${TONE[m.status]}`}>{LABEL[m.status]}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!loading && rows.length === 0 && <p className="adm-empty">No meeting requests found.</p>}
        {loading && <p className="adm-empty">Loading…</p>}
      </div>
    </>
  );
}
