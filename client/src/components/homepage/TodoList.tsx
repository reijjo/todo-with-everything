import "./TodoList.css";

import { useEffect } from "react";

import {
  fetchTodos,
  findTodos,
  todosStatus,
} from "../../features/todos/todosSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { TodoComponent } from "./TodoComponent";

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(findTodos); // Gets the todos from the Redux store
  const todoStatus = useAppSelector(todosStatus); // Gets the status of the todos from the Redux store
  const todosError = useAppSelector((state) => state.todos.error);

  // To prevent re-renders we start fetching when the status is idle
  useEffect(() => {
    if (todoStatus === "idle") {
      dispatch(fetchTodos());
    }
  }, [dispatch, todoStatus]);

  console.log("todos", todos);

  if (todoStatus === "pending") return <div>Loading...</div>;
  if (todoStatus === "failed") return <div>{todosError}</div>;

  return (
    <div className="todo-list" data-testid="todo-list">
      {todos.map((todo) => (
        <TodoComponent key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
