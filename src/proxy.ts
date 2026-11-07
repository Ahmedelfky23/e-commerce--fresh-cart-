import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const { pathname } = req.nextUrl;

  const authRoutes = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];

  const protectedRoutes = [
    "/profile",
    "/cart",
    "/checkout",
    "/orders",
    "/allorders",
    "/wishlist",
  ];

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && isProtectedRoute) {
    const signInUrl = new URL("/signin", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/allorders/:path*",
    "/wishlist/:path*",
    "/signin",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ],
};
