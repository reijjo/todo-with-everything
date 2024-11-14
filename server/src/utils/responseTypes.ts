import type { TodoContent, TodoLists } from "./types";

export type MsgResponse = {
  success?: boolean;
  msg?: string;
};

export type TodoListResponse = MsgResponse & {
  data?: TodoLists[];
  error?: string;
};

export type TodosResponse = MsgResponse & {
  data?: TodoContent[];
  error?: string;
};
