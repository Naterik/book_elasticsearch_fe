import { useCurrentApp } from "@/app/providers/app.context";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useCurrentApp();
  const location = useLocation();

  // Đang kiểm tra authentication
  if (isAuthenticated === null || isAuthenticated === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto mb-2" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Chưa đăng nhập → Block
  if (isAuthenticated !== true) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Đã đăng nhập → Allow
  return <Outlet />;
};

export default ProtectedRoute;
