"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { SignupPayload } from "@/types/interfaces/auth.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/services/validation/signup.validation";
import { SignupInputField } from "@/services/json/signup.input";
import DyanmicInput from "@/components/DyanmicInput";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";
import { HexagonPattern } from "@/components/ui/hexagon-pattern";

const Signup = () => {
  const router = useRouter();

  const { signupUser, isLoading, isError } = useAuthStore();
  console.log("Singup ", signupUser);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SignupPayload>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });
  console.log(errors);
  const onSubmit = async (data: SignupPayload) => {
    try {
      console.log("Form hit");
      const res = await signupUser(data);
      console.log("response in signup form", res);
      if (res.success) {
        toast.success(res.message);
        reset();
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.log("err in submit", error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="relative hidden lg:flex lg:w-1/2 overflow-hidden ">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffffff20,transparent_40%)]" />

        {/* Hexagon Pattern */}
        <HexagonPattern
          className="absolute z-1 h-full w-full opacity-30"
          size={40}
          strokeWidth={1}
        />

        {/* Glow */}
        <div className="relative flex items-center justify-center w-full z-10">
          <div className="absolute w-100 h-100 bg-yellow-300 rounded-full blur-3xl opacity-70 animate-pulse" />
        </div>

        {/* Logo */}
        <div className="absolute bottom-10 left-10 z-20">
          <h2 className="text-8xl font-black text-white tracking-tight">
            Scribblr
          </h2>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-8 sm:px-6">
        <div className="w-full max-w-md lg:max-w-lg">
          <div className="mb-8 text-center lg:text-left">
            <span className="text-4xl">🚀</span>

            <h2 className="mt-4 text-4xl font-bold">Create Account</h2>

            <p className="mt-2 text-muted-foreground">
              Join LevelUp and start your journey.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 rounded-3xl   p-6 shadow-lg"
          >
            {SignupInputField.map((input, index) => (
              <DyanmicInput
                key={index}
                type={input.type}
                name={input.name}
                label={input.label}
                register={register}
                error={errors[input.name as keyof SignupPayload]?.message}
              />
            ))}

            {isError && <p className=" text-red-400 text-2xl">{isError}</p>}
            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className=" animate-spin" />
              ) : (
                "Sign In Now"
              )}
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-12 w-full rounded-xl"
            >
              Sign up with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-pink-500 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
