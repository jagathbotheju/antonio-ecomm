"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const ErrorsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errMsg = searchParams.get("error");

  return (
    <div className="mt-20 mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-red-500 p-10 bg-red-100 rounded-md mb-5">
        {errMsg}
      </h1>
      <Button onClick={() => router.back()}>Try Again</Button>
    </div>
  );
};

export default ErrorsPage;
