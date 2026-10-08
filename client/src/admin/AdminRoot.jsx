import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminAuthProvider } from './AdminAuth';
import './admin.css';

/** Parent of every /admin route: auth provider, no-index meta and the admin-only stylesheet (a lazy chunk, never loaded for visitors). */
export default function AdminRoot() {
  useEffect(() => {
    const previousTitle = document.title;
    let tag = document.head.querySelector('meta[name="robots"]');
    const previous = tag?.getAttribute('content');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'robots');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', 'noindex, nofollow');
    document.title = 'Admin Panel';
    return () => {
      tag.setAttribute('content', previous ?? 'index, follow');
      document.title = previousTitle;
    };
  }, []);

  return (
    <AdminAuthProvider>
      <div className="adm">
        <Outlet />
      </div>
    </AdminAuthProvider>
  );
}
