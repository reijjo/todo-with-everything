import "./TodoComponent.css";

import { useState } from "react";

import {
  findTodoById,
  removeTodo,
  updateTodoStatus,
} from "../../features/todos/todosSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Todo } from "../../utils/types";
import { Icon } from "../common/icon/Icon";

interface TodoComponentProps {
  todo: Todo;
}

export const TodoComponent = ({ todo }: TodoComponentProps) => {
  const [todoStatus, setTodoStatus] = useState<"idle" | "pending">("idle");
  // Finds the todo by ID
  const foundTodo = useAppSelector((state) => findTodoById(state, todo.id));
  const dispatch = useAppDispatch();

  const handleTodoDone = async () => {
    if (todoStatus === "pending") return;
    if (!foundTodo) return;

    try {
      setTodoStatus("pending");
      await dispatch(
        updateTodoStatus({ id: foundTodo.id, done: !foundTodo.done }),
      ).unwrap();
    } catch (error: unknown) {
      console.log("Error updating todo", error);
    } finally {
      setTodoStatus("idle");
    }
  };

  const handleTodoDelete = async () => {
    if (todoStatus === "pending") return;
    if (!foundTodo) return;

    try {
      setTodoStatus("pending");
      await dispatch(removeTodo(foundTodo.id)).unwrap();
    } catch (error: unknown) {
      console.log("Error deleting todo", error);
    } finally {
      setTodoStatus("idle");
    }
  };

  return (
    <div className="single-todo">
      <label className="single-todo-label">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.done}
          onChange={handleTodoDone}
          name="todo-checkbox"
        />
        <a className={`todo-content-wrapper ${todo.done ? "todo-done" : ""}`}>
          <p className="todo-content">{todo.content}</p>
        </a>
      </label>
      <button
        className="todo-delete"
        disabled={!todo.done}
        onClick={handleTodoDelete}
      >
        <Icon name="trash" strokeWidth={2} />
      </button>
    </div>
  );
};
