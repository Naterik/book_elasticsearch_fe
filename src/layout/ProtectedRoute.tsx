import { useCurrentApp } from "@/app/providers/app.context";
import ForbiddenPage from "@/pages/403";
import NotFoundPage from "@/pages/404";
import { GlobalLoader } from "@/components/Loader";
import { useLocation } from "react-router-dom";

type IProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: IProps) => {
  const { isAuthenticated, user, isLoading } = useCurrentApp();
  const location = useLocation();
  const isAdminRoute = location.pathname.includes("/admin");

  // Chỉ hiển thị GlobalLoader khi:
  // 1. Đang load auth ban đầu (chưa có isAuthenticated)
  // 2. Hoặc đang load ở trang Client (không phải Admin)
  // Đối với Admin route đã đăng nhập: Không hiện GlobalLoader để hiển thị Skeleton trong page
  if (isLoading && (!isAuthenticated || !isAdminRoute)) {
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
