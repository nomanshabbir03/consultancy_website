import { useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { SiteContentProvider } from './content/SiteContent';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const { pathname } = useLocation();
  return (
    <ErrorBoundary resetKey={pathname}>
      <SiteContentProvider>
        <AppRoutes />
      </SiteContentProvider>
    </ErrorBoundary>
  );
}
