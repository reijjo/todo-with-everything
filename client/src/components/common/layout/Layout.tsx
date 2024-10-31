import "./Layout.css";
import { Navbar, Footer } from "../";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
