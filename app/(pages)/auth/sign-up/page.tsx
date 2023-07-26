"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { signUpWithCredentials } from "@/app/actions/authActions";
import { toast } from "react-toastify";
import Link from "next/link";

const SignupPage = () => {
  const { pending } = useFormStatus();

  const handleCredentialsSignup = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    toast.success("Registering...");

    if (name && email && password) {
      const res = await signUpWithCredentials({ name, email, password });
      if (res?.message) toast.success(res.message);
    }
  };

  return (
    <div className="flex w-[30%] flex-col mx-auto items-center mt-[15%]">
      <h1 className="text-4xl font-bold my-10">Sign Up</h1>

      <form
        action={handleCredentialsSignup}
        className="mt-1 flex flex-col gap-4 w-full"
      >
        <Input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="p-4 text-lg"
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="p-4 text-lg"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="p-4 text-lg"
        />
        <Button disabled={pending}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up
        </Button>

        <div className="mt-5 text-center">
          <Link className="cursor-pointer" href="/auth/sign-in">
            Already have Account? Sing In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
