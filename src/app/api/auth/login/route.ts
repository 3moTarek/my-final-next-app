import { NextResponse } from "next/server";

import { createOtp } from "@/lib/auth";
import { comparePasswords } from "@/lib/hash";
import { sendOtpEmail } from "@/lib/email";
import { verifyTurnstileToken } from "@/lib/turnstile";

const mockUser = {
  email: "admin@example.com",
  password:
    "$2b$10$FmGnD/K.7egV1FmtCqZfE.I3w4isVH0ZQ7I6bFAaEyjeIPJe58un6",
  role: "admin",
};

export async function POST(request: Request) {
  try {
    const { email, password, role, turnstileToken } = await request.json();

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

    if (email !== mockUser.email || role !== mockUser.role) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePasswords(password, mockUser.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const otpData = await createOtp();

    await sendOtpEmail(email, otpData.otp);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}