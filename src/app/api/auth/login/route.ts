import { NextResponse } from "next/server";

import { createOtp } from "@/lib/auth";
import { comparePasswords } from "@/lib/hash";
import { sendOtpEmail } from "@/lib/email";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { saveOtp } from "@/lib/otpStore";

const users = [
  {
    email: "admin@example.com",
    password:
      "$2b$10$FmGnD/K.7egV1FmtCqZfE.I3w4isVH0ZQ7I6bFAaEyjeIPJe58un6",
    role: "admin",
  },
  {
    email: "user@example.com",
    password:
      "$2b$10$FmGnD/K.7egV1FmtCqZfE.I3w4isVH0ZQ7I6bFAaEyjeIPJe58un6",
    role: "user",
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password, turnstileToken } = body;

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

    const user = users.find((currentUser) => currentUser.email === email);

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

    saveOtp(email, otpData.otp);

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