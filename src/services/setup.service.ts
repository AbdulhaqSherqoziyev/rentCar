import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { pool } from "../config";

export const setUpDB = async () => {
  try {
    const sqlQueries = await readFile(
      join(__dirname, "..", "..", "db", "main.sql"),
      "utf-8"
    );

    await pool.query(sqlQueries);
    console.log("Database setup successful.");
  } catch (error) {
    console.error("Error setting up database:", error);
  } finally {
    await pool.end();
  }
};
