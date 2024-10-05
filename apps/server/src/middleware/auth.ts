import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ErrorResponse } from "../types";

const JWT_SECRET = process.env.JWT_TOP_SECRET || "default_secret";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      status: "error",
      error: "Token is required",
    } as ErrorResponse);
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as {
      userId: string;
    };
    (req as any).userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      error: "Invalid token",
    } as ErrorResponse);
    return;
  }
};
