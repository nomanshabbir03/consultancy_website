import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/NotFound';
import { routes } from './routeConfig';

// Admin panel: its own lazy chunk (never downloaded by public visitors), no public header / footer.
const AdminRoot = lazy(() => import('../admin/AdminRoot'));
const AdminLayout = lazy(() => import('../admin/AdminLayout'));
const AdminLogin = lazy(() => import('../admin/pages/AdminLogin'));
const AdminDashboard = lazy(() => import('../admin/pages/AdminDashboard'));
const AdminBlogs = lazy(() => import('../admin/pages/AdminBlogs'));
const AdminBlogEditor = lazy(() => import('../admin/pages/AdminBlogEditor'));
const AdminJobs = lazy(() => import('../admin/pages/AdminJobs'));
const AdminJobEditor = lazy(() => import('../admin/pages/AdminJobEditor'));
const AdminMeetings = lazy(() => import('../admin/pages/AdminMeetings'));
const RequireAdmin = lazy(() => import('../admin/AdminAuth').then((m) => ({ default: m.RequireAdmin })));

export default function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {routes.map(({ path, component: Page, meta, transparentHeader, footerBackground }) => (
          <Route
            key={path}
            path={path}
            element={
              <MainLayout meta={meta} transparentHeader={transparentHeader} footerBackground={footerBackground}>
                <Page />
              </MainLayout>
            }
          />
        ))}
        <Route path="/admin" element={<AdminRoot />}>
          <Route path="login" element={<AdminLogin />} />
          <Route element={<RequireAdmin />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="blogs/new" element={<AdminBlogEditor />} />
              <Route path="blogs/edit/:id" element={<AdminBlogEditor />} />
              <Route path="jobs" element={<AdminJobs />} />
              <Route path="jobs/new" element={<AdminJobEditor />} />
              <Route path="jobs/edit/:id" element={<AdminJobEditor />} />
              <Route path="meetings" element={<AdminMeetings />} />
            </Route>
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <MainLayout meta={{ title: 'Page not found | Cornerstone Medical Solutions' }}>
              <NotFound />
            </MainLayout>
          }
        />
      </Routes>
    </Suspense>
  );
}
