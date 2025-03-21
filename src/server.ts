import express, { Application, NextFunction, Request, Response } from "express";
import { config } from "./config";
import { appRouter } from "./routers";

const app: Application = express();

const PORT = config.app.port || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Server error";
  res.status(status).json({ message });
});

//ROUTER
app.use(appRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
