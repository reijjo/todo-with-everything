import "./Homepage.css";

import { TextInput } from "../common";
import { Todo } from "./Todo";

export const Homepage = () => {
  return (
    <main className="wrapper">
      <div className="align-center">
        <h1>To-do list</h1>
        <Todo />
        <div className="single-todo">
          <TextInput
            label="create todo"
            name="todo"
            id="todo"
            placeholder="What to do..."
            value="heih"
            // onChange={handleTodoChange}
            width="50%"
          />
        </div>
      </div>
    </main>
  );
};
