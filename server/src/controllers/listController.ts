import type { Request, Response } from "express";
import { Lists, Todos } from "../models";

// Fetch all lists
export const getLists = async (_req: Request, res: Response) => {
  // Get all the lists and their associated todos
  try {
    const allLists = await Lists.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Todos,
        attributes: { exclude: ["createdAt", "updatedAt", "listId"] },
      },
    });
    res.status(200).json({ data: allLists });
  } catch (error: unknown) {
    console.log("Error fetching lists: ", error);
    res.status(500).json({ message: "Error getting all lists" });
  }
};

// Create new list
export const createList = async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  try {
    const newList = await Lists.create({ title });
    res.status(201).json({ data: newList });
  } catch (error: unknown) {
    console.log("Error creating list: ", error);
    res.status(500).json({ message: "Error creating list" });
  }
};

// Find one list
export const getListById = async (req: Request, res: Response) => {
  const { listId } = req.params;

  console.log("req.params", req.params);

  if (!listId) {
    res.status(400).json({ message: "ListID is required" });
    return;
  }

  try {
    const list = await Lists.findByPk(listId, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Todos,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });

    if (!list) {
      res.status(404).json({ message: `List with ID ${listId} not found` });
      return;
    }

    res.status(200).json({ data: list });
  } catch (error: unknown) {
    console.log("Error fetching list: ", error);
    res.status(500).json({ message: "Error getting list" });
  }
};
