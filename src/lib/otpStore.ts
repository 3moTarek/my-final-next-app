type OtpRecord = {
  otp: string;
  expiresAt: number;
};

const globalOtpStore = globalThis as typeof globalThis & {
  librarySystemOtpStore?: Map<string, OtpRecord>;
};

const otpStore =
  globalOtpStore.librarySystemOtpStore ??
  new Map<string, OtpRecord>();

globalOtpStore.librarySystemOtpStore = otpStore;

export function saveOtp(
  email: string,
  otp: string,
  expiresAt: number
) {
  otpStore.set(email, {
    otp,
    expiresAt,
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
