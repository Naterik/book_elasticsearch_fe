import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Layout from "@/layout/ClientLayout";
import AboutPage from "@/pages/client/About";
import HomePage from "@/pages/client/Home";

import LoginPage from "@/pages/auth/Login";

import RegisterPage from "@/pages/auth/Register";
import BookPage from "@/pages/client/Book";
import DetailPage from "@/pages/client/BookDetail";
import InfoPage from "@/pages/client/Info";
import { getBookByIdAPI } from "@/services/api";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "book", Component: BookPage },
      // { path: "bookdetail", Component: DetailPage },
      {
        path: "book/:id",
        Component: DetailPage,
      },
      { path: "info", Component: InfoPage },
    ],
  },
  { path: "login", Component: LoginPage },
  { path: "register", Component: RegisterPage },
  {
    path: "/admin",
  },
]);
export function AppRouter() {
  return <RouterProvider router={router} />;
}
