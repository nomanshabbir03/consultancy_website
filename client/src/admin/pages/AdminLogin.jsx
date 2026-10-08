import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../AdminAuth';

export default function AdminLogin() {
  const { status, login } = useAdminAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (status === 'authed') return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(form.email, form.password);
      navigate(state?.from && state.from.startsWith('/admin') ? state.from : '/admin', { replace: true });
    } catch (err) {
      setError(err.message);
      setForm((f) => ({ ...f, password: '' }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-login">
      <form className="adm-card" onSubmit={onSubmit} noValidate>
        <img src="/assets/pics/company_logo.jpeg" alt="Cornerstone Medical Solutions" />
        <h1>Admin Login</h1>
        <p className="adm-sub">Sign in to manage the website.</p>
        {error && (
          <div className="adm-alert is-error" role="alert">
            {error}
          </div>
        )}
        <div className="adm-field" style={{ marginBottom: 14 }}>
          <label htmlFor="adm-email">Email</label>
          <input id="adm-email" type="email" autoComplete="username" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="adm-field" style={{ marginBottom: 20 }}>
          <label htmlFor="adm-password">Password</label>
          <input id="adm-password" type="password" autoComplete="current-password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <button type="submit" className="adm-btn" style={{ width: '100%' }} disabled={busy || !form.email || !form.password}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
