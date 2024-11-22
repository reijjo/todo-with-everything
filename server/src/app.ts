import { errorHandler } from "./middleware/errorHandler";
import { unknownEndpoint } from "./middleware/unknownEndpoint";
import { todoRouter } from "./routes";
import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.static("dist"));

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/todos", todoRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

export default app;
