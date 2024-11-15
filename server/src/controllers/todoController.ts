import type { Request, Response } from "express";
import { Lists, Todos } from "../models";

export const createTodo = async (req: Request, res: Response) => {
  const { content } = req.body;
  const { listId } = req.params;

  if (!content) {
    res.status(400).json({ message: "Content is required" });
    return;
  }

  if (!listId) {
    res.status(400).json({ message: "List ID is required" });
    return;
  }

  try {
    // Check that the list exists
    const listExists = await Lists.findByPk(listId);
    if (!listExists) {
      res.status(404).json({ message: `List with ID ${listId} not found` });
      return;
    }

    // Create the todo
    const newTodo = await Todos.create({ content, listId });
    res
      .status(201)
      .json({ data: newTodo, message: `'${content}' added!`, success: true });
  } catch (error: unknown) {
    console.log("Error creating todo: ", error);
    res.status(500).json({ message: "Error creating todo" });
  }
};
