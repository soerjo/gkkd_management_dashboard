import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const app_url = process.env.APP_URL || "";
  const path = request.url.replace(app_url, "");
  const currentUser = request.cookies.get("currentUser")?.value;

  if (path == "/") return NextResponse.redirect(new URL("/home", request.url));

  // if (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt) {
  //   request.cookies.delete("currentUser");
  //   const response = NextResponse.redirect(new URL("/auth/login", request.url));
  //   response.cookies.delete("currentUser");

  //   return response;
  // }

  return;
}

export const config = {
  matcher: ["/", "/home/:path*", "/jemaat/:path*", "/pemuridan/:path*", "/user/:path*", "/wilayah/:path*"],
};
