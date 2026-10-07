import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/NotFound';
import { routes } from './routeConfig';

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
