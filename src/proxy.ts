import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  console.log("pathname, token, role", pathname, token, role);
  const isLoginPage = pathname === "/login";
  const isAdminPage = pathname.startsWith("/admin");
  if (isLoginPage) {
    if (token) {
      if (role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (isAdminPage) {
    if (!token || role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*"],
};
