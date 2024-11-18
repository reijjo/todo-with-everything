import type { Request, Response, NextFunction } from "express";
import { ConnectionRefusedError } from "sequelize";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error caught:", error);

  if (error instanceof ConnectionRefusedError) {
    res.status(500).json({
      error: "Database connection refused. Check that database is running.",
    });
  }

  next();
};
