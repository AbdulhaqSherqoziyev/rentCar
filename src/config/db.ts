import { Pool } from "pg";
import dotenv from "dotenv";
import { config } from "./config";

dotenv.config();

export const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});
