import { createSlice } from "@reduxjs/toolkit";

import { Todo } from "../../utils/types";

// Empty array as an initial state
const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
});

export default todosSlice.reducer;
