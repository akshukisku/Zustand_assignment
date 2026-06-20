"use client";
// import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@/services/validation/login.validation";
import { loginInputField } from "@/services/json/login.input";
import DyanmicInput from "@/components/DyanmicInput";
import { LoginPayload } from "@/types/interfaces/auth.interface";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

const Login = () => {
  const router = useRouter();
  const { loginUser, isLoading, isError } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginPayload>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      const res = await loginUser(data);

      if (res.success) {
        toast.success(res.message);
        reset();

        if (res.data.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <div className="min-h-screen flex">
      {/* Left Side */}

      <div className="relative hidden lg:flex lg:w-1/2 overflow-hidden bg-background">
        {/* Interactive Grid */}
        <InteractiveGridPattern
          className="absolute inset-0 h-full w-full opacity-40"
          width={70}
          height={70}
          squares={[80, 80]}
          squaresClassName="hover:fill-primary/70"
        />

        {/* Radial overlay for depth */}


        {/* Brand */}
        <div className="absolute bottom-10 left-10 z-20">
          <h2 className="text-8xl font-black text-white tracking-tight">
            Scribblr
          </h2>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center bg-background px-6 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <span className="text-4xl">👋</span>

            <h2 className="mt-4 text-4xl font-bold">Welcome to Scribblr!</h2>

            <p className="mt-2 text-muted-foreground">
              Sign in to continue your journey.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {loginInputField.map((input, index) => (
              <div key={index}>
                <DyanmicInput
                  label={input.label}
                  name={input.name}
                  type={input.type}
                  register={register}
                  error={errors[input.name as keyof LoginPayload]?.message}
                />
              </div>
            ))}

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>

              <Link
                href="/forgot-password"
                className="text-pink-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            {isError && <p className="text-red-400 text-sm">{isError}</p>}
            <Button
              type="submit"
              className="h-12 w-full rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:opacity-90"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>

            <div className="text-center text-sm">
              Not registered yet?{" "}
              <Link
                href="/signup"
                className="font-medium text-pink-500 hover:underline"
              >
                Create an Account
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button variant="outline" className="h-12 w-full rounded-full">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
                />
              </svg>
              Sign in with Google
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
