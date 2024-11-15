import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const createTodo = async (listId: number, content: string) => {
  const { data } = await axios.post(`${BASE_URL}/api/lists/${listId}/todos`, {
    content,
  });
  return data;
};

export const todoApi = {
  createTodo,
};
