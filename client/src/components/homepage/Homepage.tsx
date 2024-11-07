import "./Homepage.css";
import { TextInput } from "../common";

export const Homepage = () => {
  return (
    <main className="wrapper">
      <div className="todo-lists">
        <h1>Todo lists!</h1>
        <div className="input-with-button">
          <TextInput
            name="AddTodo"
            id="AddTodo"
            placeholder="haloo"
            labelText="Add new todo"
            className="input-width-xs"
          />
          <button>Add to do!</button>
        </div>
      </div>
    </main>
  );
};
