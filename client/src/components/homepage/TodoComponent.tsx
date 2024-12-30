import "./TodoComponent.css";

import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../../features/api/apiSlice";
import { findTodoById } from "../../features/todos/todosSlice";
import { useAppSelector } from "../../store/hooks";
import { Todo } from "../../utils/types";
import { Icon } from "../common/icon/Icon";

interface TodoComponentProps {
  todo: Todo;
}

export const TodoComponent = ({ todo }: TodoComponentProps) => {
  const foundTodo = useAppSelector((state) => findTodoById(state, todo.id));
  const [updateTodo, { isLoading }] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  console.log("foundTodo", foundTodo);

  const handleTodoDone = async () => {
    if (!foundTodo) return;

    console.log("update", foundTodo);

    try {
      await updateTodo({ ...foundTodo, done: !foundTodo.done }).unwrap();
    } catch (error: unknown) {
      console.log("Error updating todo", error);
    }
  };

  const handleTodoDelete = async () => {
    if (!foundTodo) return;

    console.log("delete", todo.id);

    try {
      await deleteTodo(Number(foundTodo.id)).unwrap();
    } catch (error: unknown) {
      console.log("Error deleting todo", error);
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
          disabled={isLoading}
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
