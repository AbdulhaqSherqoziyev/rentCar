import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { config } from "../../config";

dotenv.config();

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mailer.email,
    pass: config.mailer.password,
  },
});
