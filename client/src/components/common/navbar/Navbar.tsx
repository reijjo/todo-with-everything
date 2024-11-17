import "./Navbar.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <NavLink to="/">HOME</NavLink>
      </div>
    </nav>
  );
};
