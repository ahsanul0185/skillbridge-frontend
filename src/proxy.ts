import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/constants/roles";
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
    if (userRole === Role.tutor) return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
    if (userRole === Role.admin) return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthenticated && !pathname.startsWith("/login") && !pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (userRole === Role.admin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (userRole !== Role.admin && pathname.startsWith("/admin/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (userRole === Role.tutor && pathname.startsWith("/dashboard") && !pathname.startsWith("/tutor")) {
    return NextResponse.redirect(new URL("/tutor/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/admin/dashboard/:path*", 
    "/tutor/dashboard/:path*", 
    "/login", 
    "/register"
  ],
};