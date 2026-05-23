import { NextResponse } from "next/server";

import { createOtp } from "@/lib/auth";
import { comparePasswords } from "@/lib/hash";
import { sendOtpEmail } from "@/lib/email";

const mockUser = {
  email: "admin@example.com",
  password:
    "$2b$10$FmGnD/K.7egV1FmtCqZfE.I3w4isVH0ZQ7I6bFAaEyjeIPJe58un6",
  role: "admin",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password, role } = body;

    if (email !== mockUser.email || role !== mockUser.role) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePasswords(
      password,
      mockUser.password
    );

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