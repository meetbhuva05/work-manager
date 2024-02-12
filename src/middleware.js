import { NextResponse } from "next/server";

export const middleware = (request) => {
  const { pathname } = request.nextUrl

  const authToken = request.cookies.get("authToken")?.value;

  if (pathname === "/api/login" || pathname === "/api/users") {
    return;
  }

  if (["/login", "/signup"].includes(pathname)) {
    if (authToken) {
      return NextResponse.redirect(new URL("/profile/user", request.url))
    }
  } else {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/add-task", "/show-tasks", "/api/:path*", "/profile/:path*"]
}