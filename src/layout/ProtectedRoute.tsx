import { useCurrentApp } from "@/app/providers/app.context";
import ForbiddenPage from "@/pages/403";
import NotFoundPage from "@/pages/404";
import { GlobalLoader } from "@/components/Loader";
import { useLocation } from "react-router-dom";

type IProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: IProps) => {
  const { isAuthenticated, user, authLoading } = useCurrentApp();
  const location = useLocation();
  const isAdminRoute = location.pathname.includes("/admin");

  // ✅ Hiển thị loader chung khi đang xác thực
  if (authLoading) {
    return <GlobalLoader isVisible={true} />;
  }

  if (!isAuthenticated) {
    return <NotFoundPage />;
  }

  if (isAdminRoute && user?.role !== "ADMIN") {
    return <ForbiddenPage />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
