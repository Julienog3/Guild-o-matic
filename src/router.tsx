import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Guilds from "./pages/Guilds";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Guild from "./pages/Guild";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: 'guilds',
        element: <Guilds />
      },
      {
        path: 'guilds/:guildId',
        element: <Guild />
      },
      {
        path: 'sign-up',
        element: <SignUp />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  }
  
])

export default router;