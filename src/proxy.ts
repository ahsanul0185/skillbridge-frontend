import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/constants/roles";
import { userService } from "@/services/user.service";

export async function proxy (request : NextRequest) {

    const pathname = request.nextUrl.pathname;
    

  let isAuthenticated = false;
  let isAdmin = false;


  const {data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Role.admin
  }

  // if (!isAuthenticated) {
  //   return NextResponse.redirect(new URL("/login", request.url))
  // }

  if (isAuthenticated && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url))
    }
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }


  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url))
  }

  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

    return NextResponse.next();
}

export const config = {
    matcher : ["/dashboard","/dashboard/:path*", "/admin-dashboard", "/admin-dashboard/:path*", "/login", "/register"]
}