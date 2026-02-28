import { GlobalLoader } from "@/components/Loader";
import AdminLayout from "@/layout/AdminLayout";
import ClientLayout from "@/layout/ClientLayout";
import ProtectedRoute from "@/layout/ProtectedRoute";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";

// Lazy load Client pages
const AuthCallback = lazy(
  () => import("@/features/auth/pages/AuthCallbackPage")
);
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const AboutPage = lazy(() => import("@client/about/pages/AboutPage"));
const DetailPage = lazy(() => import("@client/book/pages/BookDetailPage"));
const BookPage = lazy(() => import("@client/book/pages/BookPage"));
const HomePage = lazy(() => import("@client/home/pages/HomePage"));
const InfoPage = lazy(() => import("@client/info/pages/InfoPage"));
const LoanPage = lazy(() => import("@client/loan/pages/LoanPage"));
const MemberPage = lazy(() => import("@client/member/pages/MemberPage"));
const NotificationsPage = lazy(
  () => import("@client/notification/pages/NotificationPage")
);
const ReturnPayment = lazy(
  () => import("@client/payment/pages/ReturnPaymentPage")
);

// Lazy load Admin pages
const AuthorManagementPage = lazy(
  () => import("@admin/author/pages/AuthorManagementPage")
);
const BookCopyManagementPage = lazy(
  () => import("@admin/book-copy/pages/BookCopyManagementPage")
);
const BookManagement = lazy(
  () => import("@admin/book/pages/BookManagementPage")
);
// Handle named export for DashboardPage
const DashboardPage = lazy(() =>
  import("@admin/dashboard").then((module) => ({
    default: module.DashboardPage,
  }))
);
const FineManagementPage = lazy(
  () => import("@admin/fine/pages/FineManagementPage")
);
const GenreManagementPage = lazy(
  () => import("@admin/genre/pages/GenreManagementPage")
);
const LoanManagementPage = lazy(
  () => import("@admin/loan/pages/LoanManagementPage")
);
const PaymentManagementPage = lazy(
  () => import("@admin/payment/pages/PaymentManagementPage")
);
const PublisherManagementPage = lazy(
  () => import("@admin/publisher/pages/PublisherManagementPage")
);

const UserManagement = lazy(
  () => import("@admin/user/pages/UserManagementPage")
);

// Lazy load General pages
const ForbiddenPage = lazy(() => import("@/pages/403"));
const NotFoundPage = lazy(() => import("@/pages/404"));

const SuspenseLayout = () => (
  <Suspense fallback={<GlobalLoader isVisible={true} />}>
    <Outlet />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      { path: "books", Component: BookPage },
      {
        path: "books/:id",
        Component: DetailPage,
      },
      {
        path: "user",
        element: (
          <ProtectedRoute>
            <SuspenseLayout />
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

    ],
  },

  {
    element: <SuspenseLayout />,
    children: [
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
        Component: AuthCallback,
      },
      { path: "/login", Component: LoginPage },
      { path: "/register", Component: RegisterPage },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
export function AppRouter() {
  return <RouterProvider router={router} />;
}
