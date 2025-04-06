import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import LinkPage from './pages/LinkPage';
import RedirectLinkPage from './pages/RedirecLink';
import UrlProvider from './Context';


const router = createBrowserRouter([
  {
    element:  <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/dashboard',
        element: <DashboardPage />
      },
      {
        path: '/auth',
        element: <AuthPage />
      },
      {
        path: '/link/:id',
        element: <LinkPage />
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
