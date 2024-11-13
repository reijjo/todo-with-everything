import { Icon } from "../icon/Icon";
import "./Modal.css";
import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: ModalProps) => (
  <div className="modal-base">
    <main className="modal-container">
      <div className="modal-header">
        <h4>header</h4>
        <button onClick={onClose}>
          <Icon name="x" size={18} />
        </button>
      </div>
      <div>{children}</div>
    </main>
  </div>
);
