import { NextResponse } from "next/server";
import { generateOtp } from "@/utils/generateOtp";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const { email, password, role } =
      body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email and password are required",
        },
        { status: 400 }
      );
    }

    // TODO: Validate credentials against database
    // For now, accept any email/password combination
    // In production, hash passwords and verify against DB

    // Generate OTP and store it
    const otp = generateOtp();

    // TODO: Store OTP in session/database with expiration
    // and send it via email
    console.log(
      `OTP for ${email}: ${otp}`
    );

    return NextResponse.json({
      success: true,
      message:
        "Login successful. Check your email for OTP.",
      email,
      role,
    });
  } catch (error) {
    console.error(
      "Login error:",
      error
    );
    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error",
      },
      { status: 500 }
    );
  }
}
