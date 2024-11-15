import express from "express";
import morgan from "morgan";
import cors from "cors";
import { listRouter, todoRouter } from "./routes";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/lists", listRouter);
app.use("/api/lists/:listId/todos", todoRouter);

export default app;
