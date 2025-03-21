import { verify } from "crypto";
import { ICreateUserDTO, ILogin, IUser, IVerify } from "../constants";
import { compare, sendOtp } from "../utils";
import { generateOtp, getByUserId, saveOtp } from "./otp.service";
import {
  createUser,
  findOneByEmail,
  isEmailExists,
  update,
} from "./user.service";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt/jwt.service";

export const AuthService = {
  async register(body: ICreateUserDTO): Promise<IUser> {
    const isUserExists = await isEmailExists(body.email);
    if (isUserExists) {
      throw new Error("Email already exists");
    }
    const user = await createUser(body);
    const otp = generateOtp();
    const expires_at = new Date(Date.now() + 4 * 60 * 1000);
    await Promise.all([
      sendOtp(body.email, otp),
      saveOtp(user.id, otp, expires_at),
    ]);
    delete user.password;
    return user;
  },

  async verify(body: IVerify): Promise<void> {
    const otpData = await getByUserId(body.user_id);
    const now = new Date(Date.now());
    if (body.otp !== otpData.otp) {
      throw new Error("Invalid otp");
    }
    if (otpData.expires_at < now) {
      throw new Error("Otp expired");
    }

    await update(body.user_id, { is_active: true });
  },

  async login(body: ILogin) {
    const user = await findOneByEmail(body.email);
    const checkPassword = compare(body.password, user.password);
    if (!user.is_active) {
      throw new Error("User is not activated");
    }
    if (!checkPassword) {
      throw new Error("Invalid password");
    }

    const payload = {
      id: user.id,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return {
      accessToken,
      refreshToken,
    };
  },
};
