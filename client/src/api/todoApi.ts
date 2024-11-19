// import axios from "axios";
// import { TodoContent } from "../utils/types";

// const BASE_URL = import.meta.env.VITE_BASE_URL;

// type TodoResponse = {
//   data: TodoContent;
//   status: number;
// };

// const createTodo = async (
//   listId: number,
//   content: string
// ): Promise<TodoResponse> => {
//   const { data } = await axios.post(`${BASE_URL}/api/lists/${listId}/todos`, {
//     content,
//   });
//   return data;
// };

// const updateTodo = async (id: number, done: boolean): Promise<TodoResponse> => {
//   const { data } = await axios.put(`${BASE_URL}/api/todos/${id}`, { done });
//   return data;
// };

// export const todoApi = {
//   createTodo,
//   updateTodo,
// };
