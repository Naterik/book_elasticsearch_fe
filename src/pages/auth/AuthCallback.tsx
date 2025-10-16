import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCurrentApp } from "@/app/providers/app.context";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useCurrentApp();

  useEffect(() => {
    const token = searchParams.get("token");
    const userString = searchParams.get("user");

    if (token && userString) {
      try {
        const user = JSON.parse(decodeURIComponent(userString));
        localStorage.setItem("access_token", token);
        setUser(user);
        setIsAuthenticated(true);
        toast.success("Login with Google successful!");
        navigate("/");
      } catch (error) {
        console.error("Error parsing user data:", error);
        toast.error("Authentication failed. Please try again.");
        navigate("/login");
      }
    } else {
      toast.error("Authentication failed. Please try again.");
      navigate("/login");
    }
  }, [searchParams, navigate, setUser, setIsAuthenticated]);

  return (
    <div className="grid place-content-center h-dvh">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg font-medium">Authenticating with Google...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
