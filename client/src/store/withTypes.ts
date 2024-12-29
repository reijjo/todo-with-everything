import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "./store";

// Create a pre-typed `createAsyncThunk` function
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();
