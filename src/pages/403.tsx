import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Home, ArrowLeft, Lock } from "lucide-react";
import { useEffect, useState } from "react";
const ForbiddenPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div
        className={`max-w-2xl w-full transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center space-y-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-red-500/20 dark:bg-red-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative">
              <ShieldAlert className="w-32 h-32 mx-auto text-red-500 dark:text-red-400 animate-bounce" />
              {/* <Lock className="w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 dark:text-red-300" /> */}
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 dark:from-red-400 dark:via-orange-400 dark:to-yellow-400 animate-pulse">
              403
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Access Denied
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Oops! You don't have permission to access this page.
            </p>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              This area is restricted. If you believe this is a mistake, please
              contact your administrator or try logging in with proper
              credentials.
            </p>
          </div>
          <div className="relative py-8">
            <div className="flex justify-center items-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-red-500 dark:bg-red-400 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              onClick={handleGoBack}
              variant="outline"
              className="w-full sm:w-auto gap-2 text-base hover:scale-105 transition-transform"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
            <Button
              size="lg"
              onClick={handleGoHome}
              className="w-full sm:w-auto gap-2 text-base bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white hover:scale-105 transition-transform shadow-lg"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help? Contact support or check your permissions.
            </p>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-300/20 dark:bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/20 dark:bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-300/10 dark:bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
