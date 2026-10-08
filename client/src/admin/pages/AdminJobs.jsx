import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { adminApi } from '../adminApi';
import ConfirmDialog from '../components/ConfirmDialog';
import useAdminData from '../useAdminData';
import { formatDate } from '../../utils/formatDate';

export default function AdminJobs() {
  const { state } = useLocation();
  const { data, loading, error, reload } = useAdminData(adminApi.jobs);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(state?.notice || '');
  const [failure, setFailure] = useState('');

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    return (data ?? []).filter(
      (j) =>
        (status === 'all' || (status === 'active') === j.isActive) &&
        (!term || `${j.title} ${j.department} ${j.location}`.toLowerCase().includes(term))
    );
  }, [data, query, status]);

  const confirmDelete = async () => {
    setBusy(true);
    setFailure('');
    try {
      await adminApi.deleteJob(toDelete.id);
      setMessage(`"${toDelete.title}" was deleted.`);
      await reload();
    } catch (err) {
      setFailure(err.message);
    } finally {
      setToDelete(null);
      setBusy(false);
    }
  };

  const expired = (job) => job.lastDate < new Date().toISOString().slice(0, 10);

  return (
    <>
      <div className="adm-pagehead">
        <div>
          <h1>Jobs</h1>
          <p className="adm-sub">Jobs added here appear on the public Careers page automatically.</p>
        </div>
        <Link to="/admin/jobs/new" className="adm-btn">
          <i className="fa-solid fa-plus" aria-hidden="true" /> New Job
        </Link>
      </div>
      {message && <div className="adm-alert is-ok" role="status">{message}</div>}
      {(error || failure) && <div className="adm-alert is-error" role="alert">{error || failure}</div>}
      <div className="adm-toolbar">
        <input type="search" placeholder="Search by title, department or location…" aria-label="Search jobs" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="adm-tablewrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Title</th>
              <th className="adm-hide-sm">Department</th>
              <th className="adm-hide-sm">Location</th>
              <th className="adm-hide-sm">Type</th>
              <th>Last date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((j) => (
              <tr key={j.id}>
                <td className="adm-title">{j.title}</td>
                <td className="adm-hide-sm">{j.department}</td>
                <td className="adm-hide-sm">{j.location}</td>
                <td className="adm-hide-sm">{j.shift || '-'}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{formatDate(j.lastDate)}</td>
                <td>
                  <span className={`adm-badge ${!j.isActive ? 'is-warn' : expired(j) ? 'is-bad' : 'is-ok'}`}>
                    {!j.isActive ? 'Inactive' : expired(j) ? 'Expired' : 'Active'}
                  </span>
                </td>
                <td>
                  <div className="adm-actions">
                    <Link to={`/admin/jobs/edit/${j.id}`} className="adm-btn is-ghost is-small">
                      Edit
                    </Link>
                    <button type="button" className="adm-btn is-danger is-small" onClick={() => setToDelete(j)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && rows.length === 0 && <p className="adm-empty">No jobs found.</p>}
        {loading && <p className="adm-empty">Loading…</p>}
      </div>
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete this job?"
        message={`"${toDelete?.title}" will be permanently removed from the Careers page. Jobs that already have applications cannot be deleted - set them to Inactive instead.`}
        busy={busy}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
