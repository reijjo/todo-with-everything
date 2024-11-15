import express from "express";
import {
  getLists,
  createList,
  getListById,
} from "../controllers/listController";

const listRouter = express.Router({ mergeParams: true });

listRouter.get("/", getLists);
listRouter.post("/", createList);

listRouter.get("/:listId", getListById);

export default listRouter;
