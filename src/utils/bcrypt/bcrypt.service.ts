import bcrypt from "bcrypt";
const salt = 10;

export async function generate(password: string): Promise<string> {
  return await bcrypt.hash(password, salt);
}
export async function compare(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
