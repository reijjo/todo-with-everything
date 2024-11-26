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
		console.log("Database connection refused.")
    res.status(500).json({
      error: "Check that database is running.",
			details: error.message
    });
    return;
  }

  res.status(500).json({
    error: "An unexpected error occurred.",
    details: error instanceof Error ? error.message : String(error),
  });

  // next();
};
