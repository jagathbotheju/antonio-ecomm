"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { Role, User } from "@prisma/client";

interface Props {
  session: Session | null;
}

const AuthButton = ({ session }: Props) => {
  const router = useRouter();
  const user = session?.user as User;

  return (
    <div>
      {session && session.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={session.user.image || "/images/blank-profile.svg"}
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-28 bg-white rounded-md shadow-md mt-2">
            {/* profile */}
            <DropdownMenuItem
              className="p-2 hover:outline-none hover:bg-gray-200 cursor-pointer"
              onClick={() => router.push("/profile")}
            >
              Profile
            </DropdownMenuItem>

            {/* admin */}
            {user && user.role === Role.ADMIN && (
              <DropdownMenuItem
                className="p-2 hover:outline-none hover:bg-gray-200 cursor-pointer"
                onClick={() => router.push("/admin")}
              >
                Admin
              </DropdownMenuItem>
            )}

            {/* log out */}
            <DropdownMenuItem
              className="p-2 hover:outline-none hover:bg-gray-200 cursor-pointer"
              onClick={() => signOut()}
            >
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button onClick={() => router.push("/auth/sign-in")}>
            <LogIn className="mr-2" />
            Log In
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthButton;
