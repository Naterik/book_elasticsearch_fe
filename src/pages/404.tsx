import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SearchX, Home, ArrowLeft, MapPin, Compass } from "lucide-react";
import { useEffect, useState } from "react";
const NotFoundPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 p-4 overflow-hidden">
      <div
        className={`max-w-2xl w-full transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center space-y-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="relative transition-transform duration-300"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              }}
            >
              <SearchX className="w-32 h-32 mx-auto text-blue-500 dark:text-blue-400 animate-bounce" />
              <Compass className="w-12 h-12 absolute -bottom-2 -right-2 text-purple-500 dark:text-purple-400 animate-spin-slow" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 relative">
              404
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 opacity-70 animate-glitch-1">
                404
              </span>
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500 opacity-70 animate-glitch-2">
                404
              </span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Page Not Found
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Oops! The page you're looking for seems to have wandered off.
            </p>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              The page might have been moved, deleted, or never existed in the
              first place. Let's get you back on track!
            </p>
          </div>
          <div className="relative py-8">
            <div className="flex justify-center items-center gap-8">
              <MapPin className="w-8 h-8 text-red-500 dark:text-red-400 animate-bounce" />
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full animate-ping"
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: "2s",
                    }}
                  />
                ))}
              </div>
              <MapPin className="w-8 h-8 text-green-500 dark:text-green-400 animate-bounce delay-300" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              onClick={handleGoBack}
              variant="outline"
              className="w-full sm:w-auto gap-2 text-base hover:scale-105 transition-transform border-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
            <Button
              size="lg"
              onClick={handleGoHome}
              className="w-full sm:w-auto gap-2 text-base bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white hover:scale-105 transition-transform shadow-lg"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              💡 Fun fact: The first 404 error was at CERN in 1992!
            </p>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${
              mousePosition.y * 0.5
            }px)`,
          }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${-mousePosition.x * 0.3}px, ${
              -mousePosition.y * 0.3
            }px)`,
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-300/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(calc(-50% + ${
              mousePosition.x * 0.2
            }px), calc(-50% + ${mousePosition.y * 0.2}px))`,
            animationDelay: "0.5s",
          }}
        ></div>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 dark:bg-blue-300/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;
