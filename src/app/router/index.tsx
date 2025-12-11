import { createBrowserRouter, Outlet } from "react-router";
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
import NotificationsPage from "@/pages/client/Notifications";
import ClientLayout from "@/layout/ClientLayout";
import BookManagement from "@/features/admin/book/pages/BookManagementPage";
import AdminLayout from "@/layout/AdminLayout";
import { DashboardPage } from "@/features/admin/dashboard";
import UserManagement from "@/features/admin/user/pages/UserManagementPage";
import ForbiddenPage from "@/pages/403";
import NotFoundPage from "@/pages/404";
import AuthCallback from "@/pages/auth/AuthCallback";
import AuthorManagementPage from "@/features/admin/author/pages/AuthorManagementPage";
import PublisherManagementPage from "@/features/admin/publisher/pages/PublisherManagementPage";
import GenreManagementPage from "@/features/admin/genre/pages/GenreManagementPage";
import BookCopyManagementPage from "@/features/admin/book-copy/pages/BookCopyManagementPage";
import LoanManagementPage from "@/features/admin/loan/pages/LoanManagementPage";
import ReservationManagementPage from "@/features/admin/reservation/pages/ReservationManagementPage";
import FineManagementPage from "@/features/admin/fine/pages/FineManagementPage";
import PaymentManagementPage from "@/features/admin/payment/pages/PaymentManagementPage";
import ProtectedRoute from "@/layout/ProtectedRoute";

const router = createBrowserRouter([
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
        path: "user",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "member",
            Component: MemberPage,
          },
          { path: "info", Component: InfoPage },
          { path: "loan", Component: LoanPage },
          { path: "fine", Component: LoanPage },
          { path: "notifications", Component: NotificationsPage },
        ],
      },
      {
        path: "vnpay/return-url",
        Component: ReturnPayment,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: DashboardPage },
      { path: "users", Component: UserManagement },
      {
        path: "books",
        Component: BookManagement,
      },
      {
        path: "book-copies",
        Component: BookCopyManagementPage,
      },
      {
        path: "authors",
        Component: AuthorManagementPage,
      },
      {
        path: "genres",
        Component: GenreManagementPage,
      },
      {
        path: "publishers",
        Component: PublisherManagementPage,
      },
      {
        path: "loans",
        Component: LoanManagementPage,
      },
      {
        path: "fines",
        Component: FineManagementPage,
      },
      {
        path: "payments",
        Component: PaymentManagementPage,
      },
      {
        path: "reservations",
        Component: ReservationManagementPage,
      },
    ],
  },

  {
    path: "/403",
    Component: ForbiddenPage,
  },
  {
    path: "/404",
    Component: NotFoundPage,
  },

  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
  { path: "/login", Component: LoginPage },
  { path: "/register", Component: RegisterPage },

  {
    path: "*",
    Component: NotFoundPage,
  },
]);
export function AppRouter() {
  return <RouterProvider router={router} />;
}
