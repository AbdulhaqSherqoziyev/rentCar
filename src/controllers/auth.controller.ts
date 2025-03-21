import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
export const AuthController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.register(req.body)
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  },
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AuthService.login(req.body)
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  },
  async verify(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.verify(req.body)
      res.status(200).json({message: "activated successfully"})
    } catch (error) {
      next(error)
    }
  },
};
