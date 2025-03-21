import { QueryResult } from "pg";
import { pool } from "../config";
import { ICreateUserDTO, IUpdateUserDTO, IUser } from "../constants";
import { generate } from "../utils";

export async function createUser(dto: ICreateUserDTO): Promise<IUser> {
  try {
    const query = `
      INSERT INTO users (name, email, password, country_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    dto.password = await generate(dto.password);
    const user: QueryResult = await pool.query(query, [
      dto.name,
      dto.email,
      dto.password,
      dto.country_id
    ]);
    console.log();
    
    return user.rows[0];
  } catch (error) {
    console.error("Error creating user", error);
    throw new Error("Failed to create user");
  }
}

export async function findOneByUsername(name: string): Promise<IUser | null> {
  try {
    const query = `SELECT * FROM users WHERE name = $1`;
    const result: QueryResult<IUser> = await pool.query(query, [name]);
    return result.rows.length ? result.rows[0] : null;
  } catch (error) {
    console.error("Error finding user by username", error);
    throw new Error("Failed to find user by username");
  }
}

export async function findOneByEmail(email: string): Promise<IUser | null> {
  try {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result: QueryResult<IUser> = await pool.query(query, [email]);
    return result.rows.length ? result.rows[0] : null;
  } catch (error) {
    console.error("Error finding user by email", error);
    throw new Error("Failed to find user by email");
  }
}

export async function update(id: number, dto: IUpdateUserDTO): Promise<void> {
  try {
    const user = await findOneById(id);
    if (!user) throw new Error("User not found");

    const updatedData: IUpdateUserDTO = {
      name: dto.name || user.name,
      email: dto.email || user.email,
      password: dto.password || user.password,
      country_id: dto.country_id || user.country_id,
      is_active: dto.is_active || user.is_active,
    };

    const query = `
      UPDATE users
      SET name = $1, email = $2, password = $3, country_id = $4, is_active = $5
      WHERE id = $6
    `;
    await pool.query(query, [
      updatedData.name,
      updatedData.email,
      updatedData.password,
      updatedData.country_id,
      updatedData.is_active,
      id,
    ]);
  } catch (error) {
    console.error("Error updating user", error);
    throw new Error("Failed to update user");
  }
}

export async function findOneById(id: number): Promise<IUser | null> {
  try {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result: QueryResult<IUser> = await pool.query(query, [id]);
    return result.rows.length ? result.rows[0] : null;
  } catch (error) {
    console.error("Error finding user by id", error);
    throw new Error("Failed to find user by id");
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    const query = `DELETE FROM users WHERE id = $1`;
    await pool.query(query, [id]);
  } catch (error) {
    console.error("Error deleting user", error);
    throw new Error("Failed to delete user");
  }
}

export async function isEmailExists(email: string): Promise<boolean> {
  try {
    const query = `SELECT EXISTS (SELECT 1 FROM users WHERE email = $1) AS exists`;
    const result: QueryResult<{ exists: boolean }> = await pool.query(query, [
      email,
    ]);
    return result.rows[0].exists;
  } catch (error) {
    console.error("Error checking email existence", error);
    throw new Error("Failed to check email existence");
  }
}

export async function isUsernameExists(name: string): Promise<boolean> {
  try {
    const query = `SELECT EXISTS (SELECT 1 FROM users WHERE name = $1) AS exists`;
    const result: QueryResult<{ exists: boolean }> = await pool.query(query, [
      name,
    ]);
    return result.rows[0].exists;
  } catch (error) {
    console.error("Error checking username existence", error);
    throw new Error("Failed to check username existence");
  }
}
