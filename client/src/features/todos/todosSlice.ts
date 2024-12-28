import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../../store/store";
import { createAppAsyncThunk } from "../../store/withTypes";
import { config } from "../../utils/config";
import { Todo } from "../../utils/types";

interface TodosState {
  todos: Todo[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

interface TodoApiResponse {
  data: Todo[];
  ok: boolean;
  message: string;
}

type NewTodo = Pick<Todo, "content">;

const { URL } = config;

// Condition double checks that there is no re-renders
export const fetchTodos = createAppAsyncThunk(
  "todos/fetchTodos",
  async () => {
    const response = await axios.get<TodoApiResponse>(`${URL}/api/todos`);
    console.log("response", response.data);
    return response.data.data;
  },
  {
    condition(_arg, thunkApi) {
      const status = todosStatus(thunkApi.getState());
      if (status !== "idle") {
        return false;
      }
    },
  },
);

export const addNewTodo = createAppAsyncThunk(
  "todos/addNewTodo",
  async (initialTodo: NewTodo) => {
    const response = await axios.post<Todo>(`${URL}/api/todos`, initialTodo);
    return response.data;
  },
);

// Updated initial state with the new TodosState interface
const initialState: TodosState = {
  todos: [],
  status: "idle",
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    updateTodo(state, action: PayloadAction<Todo>) {
      const { id, done } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id); // Finds the correct todo by ID

      if (existingTodo) {
        existingTodo.done = done;
      }
    },
    deleteTodo(state, action: PayloadAction<number | string>) {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos.push(...action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      });
  },
});

// Export the action creator with the same name
export const { updateTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;

// Helper state selectors
export const findTodos = (state: RootState) => state.todos.todos;
export const findTodoById = (state: RootState, id: number | string) =>
  state.todos.todos.find((todo) => todo.id === id);
export const todosStatus = (state: RootState) => state.todos.status;
export const todosError = (state: RootState) => state.todos.error;
