import { Todo } from "../utils/types";

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const baseUrl = `${BASE_URL}/api/todos`;

interface TodoResponse {
  data: Todo[];
  ok: boolean;
  message: string;
}

const allTodos = async (): Promise<TodoResponse> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createTodo = async (content: string): Promise<TodoResponse> => {
  console.log("API", content);
  const response = await axios.post(baseUrl, { content });
  return response.data;
};

const updateTodo = async (id: number) => {
  const response = await axios.patch(`${baseUrl}/${id}`);
  return response.data;
};

const deleteTodo = async (id: number) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export const todoApi = { allTodos, createTodo, updateTodo, deleteTodo };
