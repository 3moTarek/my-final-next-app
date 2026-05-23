export type UserRole =
  | "admin"
  | "user";

export interface LoginPayload {
  email: string;
  password: string;
  role: UserRole;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}