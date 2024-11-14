import "./Todo.css";
import { Divider, IconButton } from "../common";
import { TodoContent } from "../../utils/types";

type TodoProps = {
  todo: TodoContent;
  toggleTodoDone: (todoId: number) => void;
  deleteTodo: (todoId: number) => void;
};

export const Todo = ({ todo, toggleTodoDone, deleteTodo }: TodoProps) => {
  return (
    <>
      <div className="my-todo">
        <input
          type="checkbox"
          checked={todo.done}
          className="my-todo-checkbox"
          onChange={() => toggleTodoDone(todo.id)}
        />
        <p className={`my-todo-content ${todo.done ? "todo-done" : ""}`}>
          {todo.content}
        </p>
        <div style={{ transform: "translateX(-4px)" }}>
          <IconButton
            size={18}
            iconName="trash"
            disabled={!todo.done}
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      </div>
      <Divider margin={0} />
    </>
  );
};
