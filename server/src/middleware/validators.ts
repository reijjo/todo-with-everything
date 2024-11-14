import type { Request, Response, NextFunction } from "express";

// String
export const validateString = (field: string, errorMessage: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.body[field];

    if (!value || typeof value !== "string") {
      return res.status(400).json({ error: errorMessage });
    }

    next();
  };
};

// Boolean
export const validateBoolean = (field: string, errorMessage: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.body[field];

    if (typeof value !== "boolean") {
      return res.status(400).json({ error: errorMessage });
    }

    next();
  };
};

// Number
export const validateNumber = (field: string, errorMessage: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = req.body[field];

    if (typeof value !== "number" || isNaN(value)) {
      return res.status(400).json({ error: errorMessage });
    }

    next();
  };
};
