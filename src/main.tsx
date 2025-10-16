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
import PostPage from "./pages/client/PostPage";
import PostDetailPage from "./pages/client/PostDetailPage";
import Dashboard from "./pages/admin/dashboard";
import User from "./pages/admin/user";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Category from "./pages/admin/category";
import Course from "./pages/admin/course";
import Chapter from "./pages/admin/chapter";
import Lesson from "./pages/admin/lesson";
import CategoryPage from "./pages/client/category";
import CoursePage from "./pages/client/course";
import CourseDetail from "./components/client/courses/detail.course";
import Checkout from "./pages/client/checkout";
import PaymentSuccess from "./components/client/checkout/success.checkout";
import PaymentFail from "./components/client/checkout/fail.checkout";
import LessonPage from "./pages/client/lesson";
import Quiz from "./pages/admin/quiz";
import Message from "./pages/admin/message";
import Post from "./pages/admin/post";

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
        path: "/post",
        element: <PostPage></PostPage>,
      },
      {
        path: "/posts/:id",
        element: <PostDetailPage />,
      },
      {
        path: "/courses",
        element: <CoursePage></CoursePage>,
      },
      {
        path: "/category",
        element: <CategoryPage></CategoryPage>,
      },
      {
        path: "/courses/:id",
        element: <CourseDetail></CourseDetail>,
      },
      {
        path: "/payment/success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/payment/fail",
        element: <PaymentFail></PaymentFail>,
      },

      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout></Checkout>
          </ProtectedRoute>
        ),
      },
      {
        path: "/lesson/:id",
        element: <LessonPage></LessonPage>,
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
      {
        path: "/admin/quiz",
        element: <Quiz></Quiz>,
      },
      {
        path: "/admin/message",
        element: <Message></Message>,
      },
      {
        path: "/admin/post",
        element: <Post></Post>,
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
