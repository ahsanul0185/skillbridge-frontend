import { NextRequest, NextResponse } from "next/server";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";

export async function proxy (request : NextRequest) {

  const { pathname } = request.nextUrl;

  let isAuthenticated = false;
  let userRole = "";

  const { data } = await userService.getSession();

  if (data?.user) {
    isAuthenticated = true;
    userRole = data.user.role;
  }

  if (isAuthenticated && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    if (userRole === Roles.tutor) return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
    if (userRole === Roles.admin) return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthenticated && (pathname.startsWith("/dashboard") || pathname.startsWith("/tutor") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && userRole !== Roles.admin) {
    const redirectPath = userRole === Roles.tutor ? "/tutor/dashboard" : "/dashboard";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (pathname.startsWith("/tutor") && userRole !== Roles.tutor) {
    const redirectPath = userRole === Roles.admin ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (pathname.startsWith("/dashboard") && userRole !== Roles.student) {
    const redirectPath = userRole === Roles.admin ? "/admin" : "/tutor/dashboard";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/tutor/:path*",
    "/login",
    "/register",
  ],
};