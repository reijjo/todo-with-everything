import { createSlice } from "@reduxjs/toolkit";
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

interface TodoCreateResponse {
  data: Todo;
  ok: boolean;
  message: string;
}

type NewTodo = Pick<Todo, "content">;
type UpdateTodo = Pick<Todo, "id" | "done">;

const { URL } = config;

// Condition double checks that there is no re-renders
export const fetchTodos = createAppAsyncThunk(
  "todos/fetchTodos",
  async () => {
    const response = await axios.get<TodoApiResponse>(`${URL}/api/todos`);
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
    const response = await axios.post<TodoCreateResponse>(
      `${URL}/api/todos`,
      initialTodo,
    );
    return response.data.data;
  },
);

export const updateTodoStatus = createAppAsyncThunk(
  "todos/updateTodoStatus",
  async (todo: UpdateTodo) => {
    const response = await axios.patch<TodoCreateResponse>(
      `${URL}/api/todos/${todo.id}`,
      { done: !todo.done },
    );
    return response.data.data;
  },
);

export const removeTodo = createAppAsyncThunk(
  "todos/removeTodo",
  async (id: number | string) => {
    await axios.delete(`${URL}/api/todos/${id}`);
    return id;
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
  reducers: {},
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
      })
      .addCase(updateTodoStatus.fulfilled, (state, action) => {
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.done = action.payload.done;
        }
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;

// Helper state selectors
export const findTodos = (state: RootState) => state.todos.todos;
export const findTodoById = (state: RootState, id: number | string) =>
  state.todos.todos.find((todo) => todo.id === id);
export const todosStatus = (state: RootState) => state.todos.status;
export const todosError = (state: RootState) => state.todos.error;
