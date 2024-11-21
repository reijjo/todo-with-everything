import {
  allTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todoController";
import { todoFinder } from "../middleware/todoFinder";
import express from "express";

const todoRouter = express.Router({ mergeParams: true });

todoRouter.get("/", allTodos);
todoRouter.post("/", createTodo);
todoRouter.patch("/:id", todoFinder, updateTodo);
todoRouter.delete("/:id", todoFinder, deleteTodo);

export default todoRouter;
