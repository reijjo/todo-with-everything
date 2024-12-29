// RTK Query methods
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use the `Todo` type from the `types.ts` file
// and the re-export it for ease of use
import { Todo } from "../../utils/types";

export type { Todo };

// Define single API slice object
export const apiSlice = createApi({
  reducerPath: "api", // The cache reducer expects to be added at `state.api` by default
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // Base URL for all requests
  // Define the endpoints
  endpoints: (builder) => ({
    // The return value is a `Todo[]` array and it takes no arguments
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos", // The endpoint URL
    }),
  }),
});

// Export the auto-generated hooks for the API endpoints
export const { useGetTodosQuery } = apiSlice;
