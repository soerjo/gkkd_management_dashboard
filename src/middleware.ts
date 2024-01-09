import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  if (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt) {
    request.cookies.delete("currentUser");
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("currentUser");

    return response;
  }
}

export const config = {
  matcher: ["/jemaat/:path*", "/pemuridan/:path*", "/user/:path*", "/wilayah/:path*"],
};
