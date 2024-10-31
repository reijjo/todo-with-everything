import "./Navbar.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">HOME</NavLink>
      <NavLink to="/todo">todo</NavLink>
      <NavLink to="/todo/todo2">todo1</NavLink>
      <NavLink to="/about">about</NavLink>
    </nav>
  );
};
