import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { adminApi } from '../adminApi';
import ConfirmDialog from '../components/ConfirmDialog';
import useAdminData from '../useAdminData';
import { formatDate } from '../../utils/formatDate';

export default function AdminBlogs() {
  const { state } = useLocation();
  const { data, loading, error, reload } = useAdminData(adminApi.blogs);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(state?.notice || '');
  const [failure, setFailure] = useState('');

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    return (data ?? []).filter(
      (b) =>
        (status === 'all' || (status === 'published') === b.isPublished) &&
        (!term || `${b.title} ${b.category ?? ''}`.toLowerCase().includes(term))
    );
  }, [data, query, status]);

  const confirmDelete = async () => {
    setBusy(true);
    setFailure('');
    try {
      await adminApi.deleteBlog(toDelete.id);
      setMessage(`"${toDelete.title}" was deleted.`);
      setToDelete(null);
      await reload();
    } catch (err) {
      setFailure(err.message);
      setToDelete(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="adm-pagehead">
        <div>
          <h1>Blogs</h1>
          <p className="adm-sub">Create, edit and remove the articles shown on the public Blog page.</p>
        </div>
        <Link to="/admin/blogs/new" className="adm-btn">
          <i className="fa-solid fa-plus" aria-hidden="true" /> New Blog
        </Link>
      </div>
      {message && <div className="adm-alert is-ok" role="status">{message}</div>}
      {(error || failure) && <div className="adm-alert is-error" role="alert">{error || failure}</div>}
      <div className="adm-toolbar">
        <input type="search" placeholder="Search by title or category…" aria-label="Search blogs" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>
      <div className="adm-tablewrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th className="adm-hide-sm">Category</th>
              <th className="adm-hide-sm">Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id}>
                <td>{b.image ? <img className="adm-thumb" src={b.image} alt="" loading="lazy" /> : <div className="adm-thumb" />}</td>
                <td className="adm-title">{b.title}</td>
                <td className="adm-hide-sm">{b.category}</td>
                <td className="adm-hide-sm" style={{ whiteSpace: 'nowrap' }}>{formatDate(b.publishedAt)}</td>
                <td>
                  <span className={`adm-badge ${b.isPublished ? 'is-ok' : 'is-warn'}`}>{b.isPublished ? 'Published' : 'Draft'}</span>
                </td>
                <td>
                  <div className="adm-actions">
                    <Link to={`/admin/blogs/edit/${b.id}`} className="adm-btn is-ghost is-small">
                      Edit
                    </Link>
                    <button type="button" className="adm-btn is-danger is-small" onClick={() => setToDelete(b)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && rows.length === 0 && <p className="adm-empty">No blogs found.</p>}
        {loading && <p className="adm-empty">Loading…</p>}
      </div>
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete this blog?"
        message={`"${toDelete?.title}" will be permanently removed from the website. This cannot be undone.`}
        busy={busy}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
