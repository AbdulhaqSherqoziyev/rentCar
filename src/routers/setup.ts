import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { setUpDB } from "../services";

const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    setUpDB();
    res.send("table created");
  } catch (error) {
    next(error);
  }
});

export { router as setUpRouter };
