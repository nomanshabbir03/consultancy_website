import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuth';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: 'fa-gauge', end: true },
  { to: '/admin/blogs', label: 'Blogs', icon: 'fa-newspaper' },
  { to: '/admin/jobs', label: 'Jobs', icon: 'fa-briefcase' },
  { to: '/admin/meetings', label: 'Meetings', icon: 'fa-calendar-check' },
];

/** Admin shell: sidebar (becomes a slide-over menu on phones) + page outlet. */
export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  const onLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="adm-shell">
      <header className="adm-topbar">
        <button type="button" className="adm-iconbtn" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
          <i className="fa-solid fa-bars" />
        </button>
        <strong>Admin Panel</strong>
      </header>
      {menuOpen && <div className="adm-backdrop" onClick={() => setMenuOpen(false)} />}
      <aside className={`adm-sidebar ${menuOpen ? 'is-open' : ''}`} aria-label="Admin navigation">
        <div className="adm-brand">
          <img src="/assets/pics/company_logo.jpeg" alt="Cornerstone Medical Solutions" />
          <span>Admin Panel</span>
        </div>
        <nav>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `adm-navlink ${isActive ? 'is-active' : ''}`}>
              <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
          <button type="button" className="adm-navlink adm-logout" onClick={onLogout}>
            <i className="fa-solid fa-right-from-bracket" aria-hidden="true" />
            Logout
          </button>
        </nav>
        <p className="adm-user" title={user?.email}>
          {user?.email}
        </p>
      </aside>
      <main className="adm-main">
        <Outlet />
      </main>
    </div>
  );
}
