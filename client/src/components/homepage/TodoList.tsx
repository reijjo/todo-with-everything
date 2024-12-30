import "./TodoList.css";

import { useMemo } from "react";

import { useGetTodosQuery } from "../../features/api/apiSlice";
import { TodoComponent } from "./TodoComponent";

export const TodoList = () => {
  const { data: todos = [], isLoading, isError, error } = useGetTodosQuery();

  // useMemo prevents the sorting function from being called on every render
  const sortedTodos = useMemo(() => {
    const sortedTodos = todos.slice();
    sortedTodos.sort((a, b) => Number(a.id) - Number(b.id));

    return sortedTodos;
  }, [todos]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.toString()}</div>;

  return (
    <div className="todo-list" data-testid="todo-list">
      {sortedTodos.map((todo) => (
        <TodoComponent key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
