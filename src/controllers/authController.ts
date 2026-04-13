import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { AppError } from "../types";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser({ name, email, password });

    res.status(201).json({
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    const err = error as AppError;
    if (err.statusCode) {
      res.status(err.statusCode).json({
        error: err.message,
      });
      return;
    }

    console.error("register error:", err.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });

    res.status(200).json({
      message: "User logged in successfully",
      token: result.token,
    });
  } catch (error) {
    const err = error as AppError;
    if (err.statusCode) {
      res.status(err.statusCode).json({
        error: err.message,
      });
      return;
    }

    console.error("register error : ", err.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export { register, login };
