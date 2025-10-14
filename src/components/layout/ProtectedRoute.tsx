import { useCurrentApp } from "@/app/providers/app.context";
import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, ShieldAlert, Lock } from "lucide-react";

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useCurrentApp();
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);
  const [showUnauthorizedPage, setShowUnauthorizedPage] = useState(false);
  const [countdown, setCountdown] = useState(3);
  useEffect(() => {
    hasShownToast.current = false;
  }, [location.pathname, isAuthenticated]);
  useEffect(() => {
    if (showUnauthorizedPage) {
      // Countdown timer
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      const redirectTimer = setTimeout(() => {
        navigate("/login", { state: { from: location }, replace: true });
      }, 3000);

      return () => {
        clearInterval(countdownInterval);
        clearTimeout(redirectTimer);
      };
    }
  }, [showUnauthorizedPage, navigate, location]);

  if (isAuthenticated === null || isAuthenticated === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) {
    if (!hasShownToast.current) {
      toast.error("You need to log in to access this page", {
        duration: 3000,
      });
      hasShownToast.current = true;
    }
    if (!showUnauthorizedPage) {
      setShowUnauthorizedPage(true);
    }
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          {/* Animated Icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <ShieldAlert className="h-32 w-32 text-red-200" />
            </div>
            <div className="relative flex items-center justify-center animate-bounce">
              <Lock className="h-20 w-20 text-red-500" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-red-600 mb-4">401</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Unauthorized Access
          </h2>
          <p className="text-gray-600 mb-8">
            You need to be logged in to access this page.
            <br />
            Redirecting to login in{" "}
            <span className="font-bold text-red-600">{countdown}</span>{" "}
            seconds...
          </p>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
            <div
              className="bg-red-500 h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${((3 - countdown) / 3) * 100}%` }}
            />
          </div>

          <button
            onClick={() =>
              navigate("/login", { state: { from: location }, replace: true })
            }
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            Go to Login Now
          </button>
        </div>
      </div>
    );
  }

  if (location.pathname.startsWith("/admin") && user?.role !== "ADMIN") {
    if (!hasShownToast.current) {
      toast.error("You do not have permission to access this page", {
        duration: 3000,
      });
      hasShownToast.current = true;
    }
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
