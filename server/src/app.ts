import express from "express";
import morgan from "morgan";
import cors from "cors";
import { todoRouter } from "./routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/todos", todoRouter);

app.use(errorHandler);

export default app;
