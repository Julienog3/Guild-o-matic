import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Guilds from './pages/Guilds';
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
        element: <Guild />,
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
