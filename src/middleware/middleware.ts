import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

export function middleware(
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
    pathname.startsWith(
      "/books"
    )
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  if (token) {
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as {
        role: string;
      };

    if (
      pathname.startsWith(
        "/admin"
      ) &&
      decoded.role !==
        "admin"
    ) {
      return NextResponse.redirect(
        new URL(
          "/books",
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