import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JwtEnumKey } from "./common/enum/localstorage.enum";

export function middleware(request: NextRequest) {
  const app_url = process.env.APP_URL || "";
  const path = request.url.replace(app_url, "");

  const jwt = request.cookies.get(JwtEnumKey.JWT)?.value;

  if (jwt && path.includes("/auth")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!jwt && !path.includes("/auth")) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));

    request.cookies.delete("jwt");
    response.cookies.delete("jwt");

    return response;
  }

  if (path === "/") {
    console.log("triger");
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return;
}

export const config = {
  matcher: ["/", "/auth/:path*", "/home/:path*", "/user/:path*", "/data/:path*"],
};
