import express from "express";
import { createTodo } from "../controllers/todoController";

const todoRouter = express.Router({ mergeParams: true });

todoRouter.post("/", createTodo);

export default todoRouter;
