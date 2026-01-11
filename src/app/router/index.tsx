import AuthCallback from "@/features/auth/pages/AuthCallbackPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import AdminLayout from "@/layout/AdminLayout";
import ClientLayout from "@/layout/ClientLayout";
import ProtectedRoute from "@/layout/ProtectedRoute";
import ForbiddenPage from "@/pages/403";
import NotFoundPage from "@/pages/404";
import AuthorManagementPage from "@admin/author/pages/AuthorManagementPage";
import BookCopyManagementPage from "@admin/book-copy/pages/BookCopyManagementPage";
import BookManagement from "@admin/book/pages/BookManagementPage";
import { DashboardPage } from "@admin/dashboard";
import FineManagementPage from "@admin/fine/pages/FineManagementPage";
import GenreManagementPage from "@admin/genre/pages/GenreManagementPage";
import LoanManagementPage from "@admin/loan/pages/LoanManagementPage";
import PaymentManagementPage from "@admin/payment/pages/PaymentManagementPage";
import PublisherManagementPage from "@admin/publisher/pages/PublisherManagementPage";
import ReservationManagementPage from "@admin/reservation/pages/ReservationManagementPage";
import UserManagement from "@admin/user/pages/UserManagementPage";
import AboutPage from "@client/about/pages/AboutPage";
import DetailPage from "@client/book/pages/BookDetailPage";
import BookPage from "@client/book/pages/BookPage";
import HomePage from "@client/home/pages/HomePage";
import InfoPage from "@client/info/pages/InfoPage";
import LoanPage from "@client/loan/pages/LoanPage";
import MemberPage from "@client/member/pages/MemberPage";
import NotificationsPage from "@client/notification/pages/NotificationPage";
import ReturnPayment from "@client/payment/pages/ReturnPaymentPage";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";

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
