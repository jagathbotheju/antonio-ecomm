"use client";
import SignIn from "@/components/SignIn";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

interface Props {
  searchParams: {
    callbackUrl: string;
  };
}

const SignInPage = ({ searchParams }: Props) => {
  //const [pending, setPending] = useState(false);
  const { pending } = useFormStatus();

  const handleCredentialsLogin = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signIn("credentials", {
      email,
      password,
      callbackUrl: searchParams.callbackUrl || "/",
    });
  };

  return (
    <div className="flex w-[30%] flex-col mx-auto items-center mt-[15%]">
      <h1 className="text-4xl font-bold my-10">Sign In</h1>

      <form
        action={handleCredentialsLogin}
        className="mt-1 flex flex-col gap-4 w-full"
      >
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
          Credentials
        </Button>
      </form>

      <div className="mt-5">
        <Link className="cursor-pointer" href="/auth/sign-up">
          Do not have Account? Sing Up
        </Link>
      </div>
      {/* <div className="mt-10">
        <SignIn callbackUrl={searchParams.callbackUrl || "/"} />
      </div> */}

      {/* <div className="mt-10">
        <Link
          className="py-2 px-4 bg-amber-500 rounded-md text-black font-bold"
          href="/signup"
        >
          Sign Up
        </Link>
      </div> */}
    </div>
  );
};

export default SignInPage;
