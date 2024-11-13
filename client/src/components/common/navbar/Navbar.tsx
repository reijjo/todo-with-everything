import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { Button } from "../";

type NavbarProps = {
  handleModal: () => void;
};

export const Navbar = ({ handleModal }: NavbarProps) => {
  return (
    <nav>
      <div className="nav-wrapper">
        <NavLink to="/">HOME</NavLink>
        <div className="nav-create">
          <Button
            children="Create new list"
            type="button"
            className="btn btn-filled"
            onClick={handleModal}
          />
        </div>
        {/* <NavLink to="/todo">todo</NavLink>
      <NavLink to="/todo/todo2">todo1</NavLink>
      <NavLink to="/about">about</NavLink> */}
      </div>
    </nav>
  );
};
