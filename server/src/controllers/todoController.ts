import { TodoModel } from "../models";
import type { Request, Response } from "express";

//
// GET
// Get all todos
export const allTodos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const todos = await TodoModel.findAll({
			order: [["createdAt", "ASC"]],
		});
    res.status(200).json({ data: todos, ok: true });
  } catch (error: unknown) {
    console.error("Error fetching all todos", error);
    res
      .status(500)
      .json({ message: "Server error fetching todos.", ok: false });
  }
};

//
// POST
// Create a todo
export const createTodo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { content } = req.body;

  if (!content) {
    res
      .status(400)
      .json({ message: "Don't even try to add empty todo.", ok: false });
    return;
  }

  try {
    const todo = await TodoModel.create({ content: content });
    res.status(201).json({ data: todo, ok: true, message: "Todo created." });
  } catch (error: unknown) {
    console.error("Error creating todo", error);
    res.status(500).json({ message: "Server error creating todo.", ok: false });
  }
};

//
// PATCH
// Update todo status
export const updateTodo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const todo = req.todo as TodoModel;

  try {
    const updatedTodo = await todo.update({
      done: !todo.getDataValue("done"),
    });

    res.status(200).json({
      ok: true,
      message: "Todo updated.",
      data: updatedTodo,
    });
  } catch (error: unknown) {
    console.error("Error updating todo", error);
    res.status(500).json({ message: "Server error updating todo.", ok: false });
  }
};

//
// DELETE
// Delete todo
export const deleteTodo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const todo = req.todo as TodoModel;

  try {
    await todo.destroy();
    res.status(200).json({ ok: true, message: "Todo deleted." });
  } catch (error: unknown) {
    console.error("Error deleting todo", error);
    res.status(500).json({ message: "Server error deleting todo.", ok: false });
  }
};
