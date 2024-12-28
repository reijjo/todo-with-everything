import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

import { RootState } from "../../store/store";
import { Todo } from "../../utils/types";

// Empty array as an initial state
const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        state.push(action.payload);
      },
      // Now we dont need to pass the ID from the component
      prepare(content: string) {
        return {
          payload: {
            id: nanoid(),
            content,
            done: false,
          },
        };
      },
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      const { id, done } = action.payload;
      const existingTodo = state.find((todo) => todo.id === id); // Finds the correct todo by ID

      if (existingTodo) {
        existingTodo.done = done;
      }
    },
    deleteTodo(state, action: PayloadAction<number | string>) {
      const id = action.payload;
      const todoToDelete = state.find((todo) => todo.id === id);

      if (todoToDelete) {
        return state.filter((todo) => todo.id !== id);
      }
    },
  },
});

// Export the action creator with the same name
export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;

// Helper state selectors
export const findTodos = (state: RootState) => state.todos;
export const findTodoById = (state: RootState, id: number | string) =>
  state.todos.find((todo) => todo.id === id);
