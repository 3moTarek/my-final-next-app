import { NextResponse } from "next/server";

import { generateToken } from "@/lib/jwt";
import { verifyOtp } from "@/lib/otpStore";
import { findUserByEmail, normalizeEmail } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = normalizeEmail(email);
    const user = findUserByEmail(normalizedEmail);

    if (
      !user ||
      !verifyOtp(normalizedEmail, otp)
    ) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" },
        { status: 401 }
      );
    }

    const token = generateToken({
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      role: user.role,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
