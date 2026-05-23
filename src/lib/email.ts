import nodemailer from "nodemailer";

export async function sendOtpEmail(
  email: string,
  otp: string
) {
  const transporter =
    nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Library System OTP Code",
    text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
  });
}