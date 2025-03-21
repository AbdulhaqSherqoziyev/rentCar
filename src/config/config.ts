import { config as dotConfig } from "dotenv";

dotConfig();

export const config = {
  app: {
    port: process.env.PORT,
  },
  db: {
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: {
    access: {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN),
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN),
    },
  },
  mailer: {
    email: process.env.MAIL_USER,
    password: process.env.MAIL_PASS,
  },
};
