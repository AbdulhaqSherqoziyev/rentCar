import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

declare module "express" {
  interface Request {
    user?: { id: string };
  }
}

export const authGuard = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, config.jwt.access.secret) as JwtPayload;
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
