import { NextResponse } from "next/server";

import { generateToken } from "@/lib/jwt";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const { otp } = body;

    if (otp !== "123456") {
      return NextResponse.json(
        {
          message: "Invalid OTP",
        },
        {
          status: 401,
        }
      );
    }

    const token =
      generateToken({
        email:
          "admin@example.com",

        role: "admin",
      });

    const response =
      NextResponse.json({
        success: true,
      });

    response.cookies.set(
      "token",
      token,
      {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
      }
    );

    return response;
  } catch {
    return NextResponse.json(
      {
        message:
          "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}