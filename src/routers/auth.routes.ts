import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export const authRouter = Router()

authRouter.post('/register', AuthController.register)
authRouter.post('/verify', AuthController.verify)
authRouter.post('/login', AuthController.login)
authRouter.post('/refresh-tokens')

