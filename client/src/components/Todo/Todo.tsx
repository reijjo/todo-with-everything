import { Outlet } from "react-router-dom";

export const Todo = () => {
  return (
    <div>
      <h1>TODO MAIN</h1>
      <Outlet />
    </div>
  );
};
