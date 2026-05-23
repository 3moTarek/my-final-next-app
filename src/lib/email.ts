import nodemailer from "nodemailer";

type SendOtpEmailResult = {
  accepted: string[];
  rejected: string[];
  messageId: string;
};

export async function sendOtpEmail(
  email: string,
  otp: string
): Promise<SendOtpEmailResult> {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword =
    process.env.EMAIL_APP_PASSWORD;

  if (!emailUser || !emailPassword) {
    throw new Error(
      "Gmail OTP email is not configured. Set EMAIL_USER and EMAIL_APP_PASSWORD in .env.local."
    );
  }

  try {
    const transporter =
      nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      });

    await transporter.verify();

    const result = await transporter.sendMail({
      from: `"Library System" <${emailUser}>`,
      to: email,
      subject: "OTP Verification",
      text: `Your Library System OTP code is ${otp}. This code expires in 5 minutes.`,
      html: `
        <p>Your Library System OTP code is:</p>
        <p style="font-size: 24px; font-weight: 700; letter-spacing: 4px;">${otp}</p>
        <p>This code expires in 5 minutes.</p>
      `,
    });

    return {
      accepted: result.accepted.map(String),
      rejected: result.rejected.map(String),
      messageId: result.messageId,
    };
  } catch (error) {
    console.error(
      "Failed to send Gmail OTP. Make sure EMAIL_USER is your Gmail address and EMAIL_APP_PASSWORD is a Google App Password, not your normal Gmail password.",
      error
    );

    throw new Error(
      "Failed to send OTP email. Check Gmail App Password settings in .env.local."
    );
  }
}
