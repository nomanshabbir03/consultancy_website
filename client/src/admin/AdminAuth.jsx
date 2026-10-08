import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { adminApi, UNAUTHORIZED_EVENT } from './adminApi';

const AuthContext = createContext(null);
export const useAdminAuth = () => useContext(AuthContext);

/** Holds the signed-in admin. The session itself is an httpOnly cookie; this only mirrors "who am I" from the API. */
export function AdminAuthProvider({ children }) {
  const [state, setState] = useState({ status: 'loading', user: null });

  useEffect(() => {
    let alive = true;
    adminApi
      .me()
      .then((user) => alive && setState({ status: 'authed', user }))
      .catch(() => alive && setState({ status: 'anon', user: null }));
    const onUnauthorized = () => setState({ status: 'anon', user: null });
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    return () => {
      alive = false;
      window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized);
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const user = await adminApi.login(email, password);
    setState({ status: 'authed', user });
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminApi.logout();
    } finally {
      setState({ status: 'anon', user: null });
    }
  }, []);

  const value = useMemo(() => ({ ...state, login, logout }), [state, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Route guard: anything below it needs a signed-in admin (the API enforces the same rule independently). */
export function RequireAdmin() {
  const { status } = useAdminAuth();
  const location = useLocation();
  if (status === 'loading') return <div className="adm-center">Loading…</div>;
  if (status !== 'authed') return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
