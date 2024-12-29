import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../features/api/apiSlice";
import todoReducer from "../features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: import.meta.env.NODE_ENV !== "production",
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch; // Infer the `AppDispatch` type from the store itself
export type RootState = ReturnType<typeof store.getState>; // Same for the `RootState` type
