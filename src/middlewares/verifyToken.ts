import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types/index";

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      error: "Access denied. No token provided.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({
      error: "Invalid or expired token.",
    });
  }
};

export default verifyToken;
