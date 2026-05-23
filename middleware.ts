import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ||
    "development_secret"
);

export async function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get(
      "token"
    )?.value;

  const pathname =
    request.nextUrl.pathname;

  if (
    !token &&
    (pathname.startsWith(
      "/books"
    ) ||
      pathname.startsWith(
        "/admin"
      ))
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  if (token) {
    try {
      const { payload } =
        await jwtVerify(token, secret);

      if (
        pathname.startsWith(
          "/admin"
        ) &&
        payload.role !== "admin"
      ) {
        return NextResponse.redirect(
          new URL(
            "/books",
            request.url
          )
        );
      }
    } catch {
      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/books/:path*",
    "/admin/:path*",
  ],
};
