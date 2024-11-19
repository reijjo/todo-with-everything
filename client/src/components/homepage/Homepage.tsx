import "./Homepage.css";

import { Todo } from "./Todo";

export const Homepage = () => {
  return (
    <main className="wrapper">
      <div className="align-center">
        <h1>To-do list</h1>
        <Todo />
      </div>
    </main>
  );
};
