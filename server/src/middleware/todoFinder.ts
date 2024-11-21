import { TodoModel } from "../models";
import type { NextFunction, Request, Response } from "express";

export const todoFinder = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;

  try {
    const todo = await TodoModel.findByPk(Number(id));

    if (!todo) {
      res.status(404).json({
        ok: false,
        message: `Todo with ID ${id} not found.`,
      });
      return;
    }

    req.todo = todo;
    next();
  } catch (error: unknown) {
    console.error("Error finding todo", error);
    res.status(500).json({
      message: "Server error finding todo.",
      ok: false,
    });
  }
};
