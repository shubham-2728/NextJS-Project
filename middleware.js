import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  const url = req.nextUrl.pathname;

  // Restricting access based on roles
  if (url.startsWith("/admin") && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (url.startsWith("/manager") && token.role !== "MANAGER" && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/manager/:path*"],
};
