import "./Todo.css";

import { TextInputWithButton } from "../common";

import { ChangeEvent, useState } from "react";

export const Todo = () => {
  const [todo, setTodo] = useState("");

  const handleTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
    console.log("todo", todo);
  };

  return (
    <div className="single-todo">
      <TextInputWithButton
        label="create todo"
        name="todo"
        id="todo"
        placeholder="What to do..."
        value={todo}
        onChange={handleTodoChange}
        width="50%"
      />
    </div>
  );
};
