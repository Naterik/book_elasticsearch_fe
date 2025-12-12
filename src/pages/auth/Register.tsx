import { useState } from "react";
import { registerAPI } from "@/lib/api";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type FieldType = {
  username: string;
  password: string;
  confirmPassword: string;
  fullName?: string;
};

const initialValues: FieldType = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const [formValues, setFormValues] = useState<FieldType>(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFinish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fullName, username, password, confirmPassword } = formValues;

    try {
      setIsSubmit(true);
      const res = await registerAPI(
        username,
        password,
        confirmPassword,
        fullName
      );
      if (res.data) {
        toast.success("Register success! Redirecting to login page...");
        navigate("/login");
      } else {
        toast.error(`Registration failed: ${res.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
    } finally {
      setIsSubmit(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password, confirmPassword } = formValues;
    if (!username || !password || !confirmPassword) {
      toast.warning("Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      toast.warning("Password and Confirm Password do not match.");
      return;
    }
    onFinish(e);
  };

  return (
    <div className="grid place-content-center h-dvh">
      <form onSubmit={handleSubmit} className="w-xl">
        <div className="p-10 rounded-2xl shadow-xl/30 min-w-[400px]">
          <h1 className="text-3xl font-semibold">Register</h1>
          <Separator className="my-4" />

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formValues.fullName}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="username">Email</Label>
              <Input
                id="username"
                name="username"
                type="email"
                value={formValues.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" disabled={isSubmit} className="w-full">
              {isSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmit ? "Registering..." : "Submit"}
            </Button>
          </div>

          <div className="flex items-center flex-col mt-6">
            <p className="font-semibold capitalize">or</p>
            <p>
              Have already an account?{" "}
              <button
                type="button"
                className="font-semibold underline"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
