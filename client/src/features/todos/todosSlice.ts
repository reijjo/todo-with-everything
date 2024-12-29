import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { Todo } from "../../utils/types";
import { apiSlice } from "../api/apiSlice";

type TodosState = {
  list: Todo[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

// Updated initial state with the new TodosState interface
const initialState: TodosState = {
  list: [],
  status: "idle",
  error: null,
};

// addMatcher handles different actions from API calls
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiSlice.endpoints.getTodos.matchFulfilled,
        (state, action) => {
          state.list = action.payload;
        },
      )
      .addMatcher(
        apiSlice.endpoints.getTodos.matchRejected,
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message ?? null;
        },
      );
  },
});

export default todosSlice.reducer;

// Helper state selectors
export const findTodoById = (state: RootState, id: number | string) =>
  state.todos.list.find((todo) => todo.id === id);
