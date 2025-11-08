import { useCurrentApp } from "@/app/providers/app.context";
import ForbiddenPage from "@/pages/403";
import NotFoundPage from "@/pages/404";
import { useLocation } from "react-router-dom";

type IProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: IProps) => {
  const { isAuthenticated, user } = useCurrentApp();
  const location = useLocation();
  const isAdminRoute = location.pathname.includes("/admin");
  if (isAuthenticated === false) {
    return <NotFoundPage />;
  }

  if (isAdminRoute) {
    if (user?.role !== "ADMIN") {
      return <ForbiddenPage />;
    }
  }
  return <>{children}</>;
};

export default ProtectedRoute;
