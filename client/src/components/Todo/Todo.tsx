import "./Todo.css";
import { Divider, IconButton } from "../common";
import { TodoContent } from "../../utils/types";

type TodoProps = {
  todo: TodoContent;
};

export const Todo = ({ todo }: TodoProps) => {
  return (
    <>
      <div className="my-todo">
        <input type="checkbox" className="my-todo-checkbox" />
        <p className="my-todo-content">{todo.content}</p>
        <div style={{ transform: "translateX(-4px)" }}>
          <IconButton size={18} iconName="trash" />
        </div>
      </div>
      <Divider margin={0} />
    </>
  );
};
