import { Link } from 'react-router-dom';
import { adminApi } from '../adminApi';
import useAdminData from '../useAdminData';

function Stat({ value, label, note, to }) {
  return (
    <Link to={to} className="adm-card adm-stat" style={{ display: 'block' }}>
      <strong>{value}</strong>
      <span>{label}</span>
      {note && <small>{note}</small>}
    </Link>
  );
}

export default function AdminDashboard() {
  const { data, loading, error } = useAdminData(adminApi.dashboard);

  return (
    <>
      <div className="adm-pagehead">
        <div>
          <h1>Dashboard</h1>
          <p className="adm-sub">A quick overview of your website content.</p>
        </div>
      </div>
      {error && <div className="adm-alert is-error">{error}</div>}
      {loading && <p className="adm-sub">Loading…</p>}
      {data && (
        <div className="adm-grid3">
          <Stat to="/admin/blogs" value={data.blogs} label="Total Blogs" note={`${data.publishedBlogs} published`} />
          <Stat to="/admin/jobs" value={data.jobs} label="Total Jobs" note={`${data.activeJobs} active`} />
          <Stat to="/admin/meetings" value={data.pendingMeetings} label="Upcoming Meetings" note={`${data.meetings} requests in total`} />
        </div>
      )}
      <div className="adm-formbar" style={{ marginTop: 28 }}>
        <Link to="/admin/blogs/new" className="adm-btn">
          New Blog
        </Link>
        <Link to="/admin/jobs/new" className="adm-btn is-ghost">
          New Job
        </Link>
      </div>
    </>
  );
}
