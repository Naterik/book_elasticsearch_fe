import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import AboutPage from "@/pages/client/About";
import HomePage from "@/pages/client/Home";

import LoginPage from "@/pages/auth/Login";

import RegisterPage from "@/pages/auth/Register";
import BookPage from "@/pages/client/Book";
import DetailPage from "@/pages/client/BookDetail";
import InfoPage from "@/pages/client/Info";
import LoanPage from "@/pages/client/Loan";
import MemberPage from "@/pages/client/Member";
import ReturnPayment from "@/pages/client/ReturnPayment";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import ClientLayout from "@/layout/ClientLayout";
import AdminLayout from "@/layout/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import UserManagement from "@/pages/admin/User";
import ForbiddenPage from "@/pages/403";
import NotFoundPage from "@/pages/404";

const router = createBrowserRouter([
  {
    path: "/403",
    Component: ForbiddenPage,
  },
  {
    path: "/404",
    Component: NotFoundPage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "book", Component: BookPage },
      {
        path: "book/:id",
        Component: DetailPage,
      },
      {
        Component: ProtectedRoute,
        children: [
          {
            path: "member",
            Component: MemberPage,
          },

          { path: "info", Component: InfoPage },
          { path: "loan", Component: LoanPage },
          {
            path: "vnpay/return-url",
            Component: ReturnPayment,
          },
        ],
      },
    ],
  },

  { path: "login", Component: LoginPage },
  { path: "register", Component: RegisterPage },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, Component: Dashboard },
          { path: "users", Component: UserManagement },
          {
            path: "books",
            element: (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">
                  Books Management
                </h2>
                <p className="text-gray-600 mt-2">Coming soon...</p>
              </div>
            ),
          },
          {
            path: "book-copies",
            element: (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">
                  Book Copies Management
                </h2>
                <p className="text-gray-600 mt-2">Coming soon...</p>
              </div>
            ),
          },
          {
            path: "authors",
            element: (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">
                  Authors Management
                </h2>
                <p className="text-gray-600 mt-2">Coming soon...</p>
              </div>
            ),
          },
          {
            path: "genres",
            element: (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">
                  Genres Management
                </h2>
                <p className="text-gray-600 mt-2">Coming soon...</p>
              </div>
            ),
          },
          {
            path: "publishers",
            element: (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">
                  Publishers Management
                </h2>
                <p className="text-gray-600 mt-2">Coming soon...</p>
              </div>
            ),
          },
          {
            path: "loans",
            element: (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">
                  Loans Management
                </h2>
                <p className="text-gray-600 mt-2">Coming soon...</p>
              </div>
            ),
          },
          {
            path: "fines",
            element: (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">
                  Fines Management
                </h2>
                <p className="text-gray-600 mt-2">Coming soon...</p>
              </div>
            ),
          },
          {
            path: "payments",
            element: (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">
                  Payments Management
                </h2>
                <p className="text-gray-600 mt-2">Coming soon...</p>
              </div>
            ),
          },
          {
            path: "reservations",
            element: (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">
                  Reservations Management
                </h2>
                <p className="text-gray-600 mt-2">Coming soon...</p>
              </div>
            ),
          },
        ],
      },
    ],
  },
]);
export function AppRouter() {
  return <RouterProvider router={router} />;
}
