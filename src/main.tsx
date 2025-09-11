import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Layout from "./layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "pages/client/home";
import LoginPage from "pages/client/auth/login";
import RegisterPage from "pages/client/auth/register";

import "styles/global.css";
import { AppProvider } from "./components/context/app.context";
import ProtectedRoute from "./components/auth";
import LayoutAdmin from "./components/layout/layout.admin";
import Dashboard from "./pages/admin/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/admin/books",
      },
    ],
  },

  { path: "/login", element: <LoginPage></LoginPage> },
  { path: "/register", element: <RegisterPage></RegisterPage> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
