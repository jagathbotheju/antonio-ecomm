// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    const { token } = req.nextauth;

    if (pathname === "/admin" && token?.user?.role !== "ADMIN") {
      return NextResponse.redirect(
        `${origin}?error=You are trying to access Admin Area, Not Authorized`
      );
      //return new NextResponse("You are not Authorized");
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/profile/:path*", "/admin/:path*"],
};
