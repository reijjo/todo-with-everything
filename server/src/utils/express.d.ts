import { TodoModel } from "../models/todoModel";

declare global {
  namespace Express {
    interface Request {
      todo?: TodoModel;
    }
  }
}

export {};
