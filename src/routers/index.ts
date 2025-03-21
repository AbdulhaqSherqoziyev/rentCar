import { Request, Response, Router } from "express";
import { setUpRouter } from "./setup";
import { authRouter } from "./auth.routes";

export const appRouter = Router();

appRouter.use("/setup", setUpRouter);
appRouter.use('/auth', authRouter)
appRouter.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found" });
});
