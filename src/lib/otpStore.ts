type OtpRecord = {
  otp: string;
  expiresAt: number;
};

const otpStore = new Map<
  string,
  OtpRecord
>();

export function saveOtp(
  email: string,
  otp: string
) {
  otpStore.set(email, {
    otp,
    expiresAt:
      Date.now() +
      5 * 60 * 1000,
  });
}

export function verifyOtp(
  email: string,
  otp: string
) {
  const record =
    otpStore.get(email);

  if (!record) {
    return false;
  }

  if (
    Date.now() >
    record.expiresAt
  ) {
    otpStore.delete(email);

    return false;
  }

  const isValid =
    record.otp === otp;

  if (isValid) {
    otpStore.delete(email);
  }

  return isValid;
}