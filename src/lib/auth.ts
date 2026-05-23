import { generateOtp } from "@/utils/generateOtp";

export async function createOtp() {
  const otp = generateOtp();

  const expiresAt =
    Date.now() + 5 * 60 * 1000;

  return {
    otp,
    expiresAt,
  };
}