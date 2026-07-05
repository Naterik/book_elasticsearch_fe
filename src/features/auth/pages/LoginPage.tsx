// src/pages/LoginPage.tsx

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import { useCurrentApp } from "@/app/providers/app.context";
import { AuthService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { User, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useCurrentApp();

  const onFinish = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const res = await AuthService.login(
        usernameRef.current?.value || "",
        passwordRef.current?.value || ""
      );

      if (res.data) {
        setUser(res.data.user);
        setIsAuthenticated(true);
        toast.success("Login success!");
        localStorage.setItem("access_token", res.data.access_token);
        navigate("/");
      } else {
        setIsSubmit(false);
        toast.error("Have error", {
          description: res.message,
          duration: 2000,
        });
      }
    } catch (error) {
      console.error(error);
      setIsSubmit(false);
      toast.error("An unexpected error occurred");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = AuthService.getGoogleAuthUrl();
  };

  return (
    <div className="grid place-content-center h-dvh">
      <form name="login" className="w-lg" onSubmit={onFinish}>
        <div className="p-10 rounded-2xl shadow-xl/30 ">
          <h1 className="text-3xl font-semibold">Login</h1>
          <Separator className="my-4" />
          <div className="mb-4">
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Username"
                className="pl-9"
                ref={usernameRef}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                className="pl-9"
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full">
              <Button type="submit" className="w-full" disabled={isSubmit}>
                {isSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Log in
              </Button>

              <div className="flex items-center flex-col gap-4 mt-2">
                <p className="uppercase font-bold">or</p>
                <button
                  type="button"
                  className="hover:opacity-80 transition cursor-pointer"
                  onClick={handleGoogleLogin}
                  aria-label="Sign in with Google"
                >
                  <FcGoogle className="size-6" />
                </button>
                <p>
                  Have already an account?{" "}
                  <button
                    type="button"
                    className="font-semibold underline"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
