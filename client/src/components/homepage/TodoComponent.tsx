import "./TodoComponent.css";

import {
  deleteTodo,
  findTodoById,
  updateTodo,
} from "../../features/todos/todosSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Todo } from "../../utils/types";
import { Icon } from "../common/icon/Icon";

interface TodoComponentProps {
  todo: Todo;
}

export const TodoComponent = ({ todo }: TodoComponentProps) => {
  // Finds the todo by ID
  const foundTodo = useAppSelector((state) => findTodoById(state, todo.id));
  const dispatch = useAppDispatch();

  const handleTodoDone = () => {
    // If the foundTodo exists, dispatch the updateTodo action
    if (foundTodo) {
      dispatch(
        updateTodo({
          ...foundTodo,
          done: !foundTodo.done,
        }),
      );
    }
  };

  const handleTodoDelete = () => {
    // If the foundTodo exists, dispatch the deleteTodo action
    if (foundTodo) {
      dispatch(deleteTodo(foundTodo.id));
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
