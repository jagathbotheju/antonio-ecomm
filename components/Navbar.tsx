import { getServerSession } from "next-auth";
import AuthButton from "./AuthButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex w-full justify-between p-5 px-10 shadow-md">
      <Link href="/" className="font-bold text-2xl">
        ECOMM
      </Link>
      <AuthButton session={session} />
    </div>
  );
};

export default Navbar;
