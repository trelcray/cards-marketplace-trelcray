import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("token")?.value;
  const isLogin = request.cookies.get("currentUser")?.value;

  if (isAuthenticated && isLogin) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/me/cards", "/me/trade", "/cards", "/trade"],
};
