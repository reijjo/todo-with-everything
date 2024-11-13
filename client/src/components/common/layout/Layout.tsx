import "./Layout.css";
import { Navbar, Footer } from "../";
import { Outlet } from "react-router-dom";
import { useState } from "react";
// import { Modal } from "../modal/Modal";
// import { CreateNewList } from "../../homepage/CreateNewList";

export const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="layout">
      <Navbar handleModal={handleModal} />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
      {/* {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          children={<CreateNewList />}
        />
      )} */}
    </div>
  );
};
