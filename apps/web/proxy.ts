import { authkit } from "@workos-inc/authkit-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

const unauthenticatedPaths = [
  "/",
  "/login",
  "/callback",
  "/_next",
  "/favicon.ico",
];

function isUnauthenticatedPath(pathname: string): boolean {
  return unauthenticatedPaths.some(
    path => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function forwardAuthkitHeaders(response: Response, headers: Headers) {
  for (const [key, value] of headers) {
    if (key.toLowerCase() === "set-cookie") {
      response.headers.append(key, value);
    } else {
      response.headers.set(key, value);
    }
  }
}

export default async function proxy(request: NextRequest) {
  const {
    session,
    headers: authkitHeaders,
    authorizationUrl,
  } = await authkit(request);

  const { pathname } = new URL(request.url);

  if (!isUnauthenticatedPath(pathname) && !session.user) {
    if (!authorizationUrl) {
      return NextResponse.next();
    }
    const response = NextResponse.redirect(
      new URL(authorizationUrl, request.url),
    );
    forwardAuthkitHeaders(response, authkitHeaders);
    return response;
  }

  const response = NextResponse.next({
    request: { headers: new Headers(request.headers) },
  });

  forwardAuthkitHeaders(response, authkitHeaders);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
