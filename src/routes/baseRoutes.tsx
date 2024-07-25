import { Navigate } from "react-router-dom";

// Import layouts
import MainLayout from "src/layouts/MainLayout";

// Import pages
import HomePage from "src/pages/home";
import ChatPage from "src/pages/chat";

// Import routes configuration
import { RouteNames } from "src/routes.config";

// Import types
import type { RouteObject } from "react-router-dom";

export const BASE_ROUTES: Array<RouteObject> = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: RouteNames.home.path,
        element: <HomePage />,
      },
      {
        path: RouteNames.chat.path,
        element: <ChatPage />,
      },
      {
        path: "/",
        element: <Navigate to={RouteNames.home.path} replace />,
      },
    ],
  },
];
