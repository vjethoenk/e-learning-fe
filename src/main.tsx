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
import User from "./pages/admin/user";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Category from "./pages/admin/category";
import Course from "./pages/admin/course";
import Chapter from "./pages/admin/chapter";
import Lesson from "./pages/admin/lesson";
import CoursePage from "./pages/client/courses/CoursePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/courses",
        element: <CoursePage></CoursePage>,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute roles={["ADMIN", "INSTRUCTOR"]}>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/admin/user",
        element: <User></User>,
      },
      {
        path: "/admin/category",
        element: <Category></Category>,
      },
      {
        path: "/admin/course",
        element: <Course></Course>,
      },
      {
        path: "/admin/chapter",
        element: <Chapter></Chapter>,
      },
      {
        path: "/admin/lesson",
        element: <Lesson></Lesson>,
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
      <ToastContainer />
    </AppProvider>
  </StrictMode>
);
