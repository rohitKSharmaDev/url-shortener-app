import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import LinkPage from './pages/LinkPage';
import RedirectLinkPage from './pages/RedirectLink';
import UrlProvider from './Context';
import RequireAuth from './components/RequireAuth';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/dashboard',
        element: (
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        )
      },
      {
        path: '/auth',
        element: <AuthPage />
      },
      {
        path: '/link/:id',
        element: (
          <RequireAuth>
            <LinkPage />
          </RequireAuth>
        )
      },
      {
        path: '/:id',
        element: <RedirectLinkPage />
      },
    ]
  }
]);

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  )
}

export default App