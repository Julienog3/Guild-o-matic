import { createBrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import Home from './pages/Home';
import Guilds from './pages/GuildsPage';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Guild from './pages/Guild';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Legal from './pages/LegalPage';
import PrivacyPolicy from './pages/PrivacyPolicyPage';
import FaqPage from './pages/FaqPage';
import LegalPage from './pages/LegalPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import LoadingPage from './pages/Loading';

const GuildPage = React.lazy(() => import('./pages/Guild'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: 'guilds',
        element: <Guilds />,
      },
      {
        path: 'guilds/:guildId',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <GuildPage />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'legal',
        element: <LegalPage />,
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicyPage />,
      },
      {
        path: 'faq',
        element: <FaqPage />,
      },
    ],
  },
]);

export default router;
