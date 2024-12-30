// RTK Query methods
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { config } from "../../utils/config";
// Use the `Todo` type from the `types.ts` file
// and the re-export it for ease of use
import { Todo, TodosResponse } from "../../utils/types";

export type { Todo };
const { URL } = config;

// Define single API slice object
export const apiSlice = createApi({
  reducerPath: "api", // The cache reducer expects to be added at `state.api` by default
  baseQuery: fetchBaseQuery({ baseUrl: `${URL}/api` }), // Base URL for all requests
  tagTypes: ["Todo"], // Define the tag types for the cache
  // Define the endpoints
  endpoints: (builder) => ({
    // The return value is a `Todo[]` array and it takes no arguments
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos", // The endpoint URL
      providesTags: ["Todo"], // Define the tags for the cache
      // We need the transformResponse because our API returns an object with a `data` key
      transformResponse: (response: TodosResponse) => {
        return response.data;
      },
    }),
    getTodoById: builder.query<Todo, number>({
      query: (id) => `/todos/${id}`,
    }),
    addNewTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (content) => ({
        url: "/todos",
        method: "POST",
        body: content,
      }),
      invalidatesTags: ["Todo"], // Tells the RTK Query that cache data is outdated and makes a refetch
    }),
    editTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todo"], // Tells the RTK Query that cache data is outdated and makes a refetch
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

// Export the auto-generated hooks for the API endpoints
export const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useAddNewTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
