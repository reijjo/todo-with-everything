import { config } from "../utils/config";
import { Todo } from "../utils/types";

import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BASE_URL;
// const TEST_URL = import.meta.env.VITE_TEST_URL;
// const URL = import.meta.env.VITE_NODE_ENV === "testcicd" ? TEST_URL : BASE_URL;
const { BASE_URL, TEST_URL, URL } = config;
const baseUrl = `${URL}/api/todos`;

console.log("ENV", import.meta.env.VITE_NODE_ENV);
console.log("BASE_URL", BASE_URL);
console.log("TEST_URL", TEST_URL);
console.log("URL", URL);

interface TodoResponse {
  data: Todo[];
  ok: boolean;
  message: string;
}

const allTodos = async (): Promise<TodoResponse> => {
  const response = await axios.get(baseUrl);
  console.log("GET TODOS URL", baseUrl);
  return response.data;
};

const createTodo = async (content: string): Promise<TodoResponse> => {
  console.log("API", baseUrl);
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
