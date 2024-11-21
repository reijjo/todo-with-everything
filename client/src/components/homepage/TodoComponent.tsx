import "./TodoComponent.css";

import { Todo } from "../../utils/types";
import { Icon } from "../common/icon/Icon";

import { ChangeEvent } from "react";

interface TodoComponentProps {
  todo: Todo;
  updateTodo: (id: number, done: boolean) => void;
  deleteTodo: (id: number) => void;
}

export const TodoComponent = ({
  todo,
  updateTodo,
  deleteTodo,
}: TodoComponentProps) => {
  const handleTodoDone = (e: ChangeEvent<HTMLInputElement>) => {
    updateTodo(todo.id, e.target.checked);
    console.log("todo id done", todo.id);
  };

  return (
    <div className="single-todo">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.done}
        onChange={handleTodoDone}
        id="todo"
        name="todo"
        // value={todo.done}
      />
      <a className={`todo-content-wrapper ${todo.done ? "todo-done" : ""}`}>
        <p className="todo-content">{todo.content}</p>
      </a>
      <button
        className="todo-delete"
        disabled={!todo.done}
        onClick={() => deleteTodo(todo.id)}
      >
        <Icon name="trash" strokeWidth={2} />
      </button>
    </div>
  );
};