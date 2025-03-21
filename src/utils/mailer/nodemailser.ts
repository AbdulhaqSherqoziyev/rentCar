import { config } from "../../config";
import { mailTransporter } from "./nodemailer.config";

export async function sendOtp(to: string, otp: string) {
  try {
    await mailTransporter.sendMail(
      {
        from: config.mailer.email,
        to,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}`,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
    console.log("sended");
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw new Error("Failed to send OTP");
  }
}

export async function sendPasswordReset(to: string, token: string) {
  try {
    await mailTransporter.sendMail({
      from: config.mailer.email,
      to,
      subject: "Reset Your Password",
      html: `<h2>Reset Your Password</h2>
               <p>Click the button below to reset your password.</p>
               <a href="https://example.com/change-password?token=${token}" style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;text-decoration:none;border-radius:5px;">Reset Password</a>`,
    });
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
}

export async function sendActivationLink(to: string, token: string) {
  try {
    await mailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Activate Your Account",
      html: `<h2>Activate Your Email</h2>
               <p>Click the button below to activate your email.</p>
               <a href="http://localhost:3000/admin/verify?token=${token}" style="display:inline-block;padding:10px 20px;background:#28a745;color:#fff;text-decoration:none;border-radius:5px;">Activate</a>`,
    });
  } catch (error) {
    console.error("Failed to send activation email:", error);
    throw new Error("Failed to send activation email");
  }
}
