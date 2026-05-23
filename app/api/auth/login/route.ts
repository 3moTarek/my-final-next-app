import { NextResponse } from "next/server";

import { createOtp } from "@/lib/auth";
import { comparePasswords } from "@/lib/hash";
import { sendOtpEmail } from "@/lib/email";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { saveOtp } from "@/lib/otpStore";
import { findUserByEmail, normalizeEmail } from "@/lib/users";

export async function POST(request: Request) {
  try {
    const { email, password, turnstileToken } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = normalizeEmail(email);

    if (!turnstileToken) {
      return NextResponse.json(
        { message: "Human verification is required" },
        { status: 400 }
      );
    }

    const isHuman = await verifyTurnstileToken(turnstileToken);

    if (!isHuman) {
      return NextResponse.json(
        { message: "Human verification failed" },
        { status: 403 }
      );
    }

    const user = findUserByEmail(normalizedEmail);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const otpData = await createOtp();

    saveOtp(
      normalizedEmail,
      otpData.otp,
      otpData.expiresAt
    );

    try {
      await sendOtpEmail(normalizedEmail, otpData.otp);
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          message:
            "Could not send OTP email. Check Gmail App Password configuration on the server.",
        },
        { status: 502 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      email: normalizedEmail,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
