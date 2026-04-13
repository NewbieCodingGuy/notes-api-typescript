import { RowDataPacket, ResultSetHeader } from "mysql2";
import { pool } from "../config/db";
import { StringValue } from "ms";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AppError } from "../types";

const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<{ id: number; name: string; email: string }> => {
  const [existing] = await pool.execute<RowDataPacket[]>(
    "SELECT id FROM users WHERE email=?",
    [email],
  );

  if (existing.length > 0) {
    throw new AppError("Email already in use!", 409);
  }

  const hashedPassword: string = await bcrypt.hash(password, 10);

  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO users (name, email, password) VALUES(?,?,?)",
    [name, email, hashedPassword],
  );

  return {
    id: result.insertId,
    name,
    email,
  };
};

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string }> => {
  const [existing] = await pool.execute<RowDataPacket[]>(
    "SELECT id,email,password FROM users WHERE email = ?",
    [email],
  );

  if (existing.length === 0) {
    throw new AppError("Invalid email or password", 401);
  }

  const hashedPassword: string = existing[0].password;

  const isMatch: boolean = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const user = existing[0];

  const expiresIn = process.env.JWT_EXPIRES_IN as StringValue;

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn },
  );

  return { token };
};

export { registerUser, loginUser };
