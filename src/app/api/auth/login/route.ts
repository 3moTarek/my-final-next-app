import { NextResponse } from "next/server";

import { createOtp } from "@/lib/auth";
import { comparePasswords } from "@/lib/hash";

const mockUser = {
  email: "admin@example.com",
  password:
    "$2b$10$9M1Q5xQzQ8lJw2mM8nQv8e8K5z8M8Q3xj9uM8eQ2x5Q9mL8nK3xQe",
  role: "admin",
};

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      email,
      password,
      role,
    } = body;

    if (
      email !== mockUser.email ||
      role !== mockUser.role
    ) {
      return NextResponse.json(
        {
          message:
            "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const isPasswordValid =
      await comparePasswords(
        password,
        mockUser.password
      );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message:
            "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const otpData =
      await createOtp();

    console.log(
      "Generated OTP:",
      otpData
    );

    return NextResponse.json({
      success: true,
      message:
        "OTP sent successfully",
      otp: otpData.otp,
    });
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