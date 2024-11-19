import type { Request, Response, NextFunction } from "express";
import { ConnectionRefusedError } from "sequelize";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Error caught:", error);

  if (error instanceof ConnectionRefusedError) {
    res.status(500).json({
      error: "Database connection refused. Check that database is running.",
    });
    return;
  }

  res.status(500).json({
    error: "An unexpected error occurred.",
    details: error instanceof Error ? error.message : String(error),
  });

  // next();
};