import { useCallback, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '../adminApi';
import RichTextEditor from '../components/RichTextEditor';
import useAdminData from '../useAdminData';

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 110);

const inThirtyDays = () => new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10);

const EMPTY = {
  title: '',
  slug: '',
  department: '',
  location: '',
  provinceCountry: 'Punjab, Pakistan',
  shift: '',
  experience: '',
  lastDate: inThirtyDays(),
  isActive: true,
  description: '',
};

function Editor({ id, existing }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(() => (existing ? { ...EMPTY, ...existing } : EMPTY));
  const [slugTouched, setSlugTouched] = useState(Boolean(existing));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (id) await adminApi.updateJob(id, form);
      else await adminApi.createJob(form);
      navigate('/admin/jobs', { state: { notice: id ? 'Job updated.' : 'Job created.' } });
    } catch (err) {
      setError(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="adm-pagehead">
        <div>
          <h1>{id ? 'Edit Job' : 'New Job'}</h1>
          <p className="adm-sub">These fields match the public job page.</p>
        </div>
        <div className="adm-formbar">
          {id && form.isActive && (
            <a href={`/career/${form.slug}`} target="_blank" rel="noopener noreferrer" className="adm-btn is-ghost">
              View on site
            </a>
          )}
          <Link to="/admin/jobs" className="adm-btn is-ghost">
            Cancel
          </Link>
          <button type="submit" className="adm-btn" disabled={saving}>
            {saving ? 'Saving…' : id ? 'Save changes' : 'Publish job'}
          </button>
        </div>
      </div>
      {error && (
        <div className="adm-alert is-error" role="alert">
          {error}
        </div>
      )}
      <div className="adm-form">
        <div className="adm-card adm-stack">
          <div className="adm-field">
            <label htmlFor="j-title">Job title</label>
            <input
              id="j-title"
              required
              maxLength={200}
              value={form.title}
              onChange={(e) => set({ title: e.target.value, ...(slugTouched ? {} : { slug: slugify(e.target.value) }) })}
            />
          </div>
          <div className="adm-field">
            <label htmlFor="j-slug">Slug (web address)</label>
            <input
              id="j-slug"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set({ slug: slugify(e.target.value) });
              }}
            />
            <p className="adm-help">/career/{form.slug || 'job-title'}</p>
          </div>
          <div>
            <span className="adm-label">Job description</span>
            <RichTextEditor key={id || 'new'} value={form.description} onChange={(description) => set({ description })} placeholder="Describe the role, responsibilities, requirements and benefits…" />
          </div>
        </div>
        <div className="adm-stack">
          <div className="adm-card adm-stack">
            <div className="adm-field">
              <label htmlFor="j-status">Status</label>
              <select id="j-status" value={form.isActive ? 'active' : 'inactive'} onChange={(e) => set({ isActive: e.target.value === 'active' })}>
                <option value="active">Active (shown on Careers)</option>
                <option value="inactive">Inactive (hidden)</option>
              </select>
            </div>
            <div className="adm-field">
              <label htmlFor="j-dept">Department / industry</label>
              <input id="j-dept" required maxLength={120} value={form.department} onChange={(e) => set({ department: e.target.value })} />
            </div>
            <div className="adm-field">
              <label htmlFor="j-loc">Location</label>
              <input id="j-loc" required maxLength={160} value={form.location} onChange={(e) => set({ location: e.target.value })} />
            </div>
            <div className="adm-field">
              <label htmlFor="j-prov">Province - country</label>
              <input id="j-prov" maxLength={120} value={form.provinceCountry} onChange={(e) => set({ provinceCountry: e.target.value })} />
            </div>
            <div className="adm-field">
              <label htmlFor="j-shift">Employment type / shift</label>
              <input id="j-shift" list="j-shift-list" maxLength={60} value={form.shift} onChange={(e) => set({ shift: e.target.value })} />
              <datalist id="j-shift-list">
                <option value="Day" />
                <option value="Night" />
                <option value="Full Time" />
                <option value="Part Time" />
                <option value="Remote" />
              </datalist>
            </div>
            <div className="adm-field">
              <label htmlFor="j-exp">Work experience</label>
              <input id="j-exp" maxLength={100} placeholder="e.g. 6 Months +" value={form.experience} onChange={(e) => set({ experience: e.target.value })} />
            </div>
            <div className="adm-field">
              <label htmlFor="j-date">Last date to apply</label>
              <input id="j-date" type="date" required value={form.lastDate} onChange={(e) => set({ lastDate: e.target.value })} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function AdminJobEditor() {
  const { id } = useParams();
  const loader = useCallback(() => (id ? adminApi.job(id) : Promise.resolve(null)), [id]);
  const { data, loading, error } = useAdminData(loader);

  if (loading) return <p className="adm-sub">Loading…</p>;
  if (error) {
    return (
      <>
        <div className="adm-alert is-error">{error}</div>
        <Link to="/admin/jobs" className="adm-btn is-ghost">
          Back to jobs
        </Link>
      </>
    );
  }
  return <Editor key={id || 'new'} id={id} existing={data} />;
}
