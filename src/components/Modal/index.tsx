import React from "react";
import Close from "../svgs/Close";
import "./styles.css";

interface Props {
  handleClose: () => void;
  children: React.ReactNode;
  hidden?: boolean;
}

// modal component
const Modal = ({ handleClose, children, hidden }: Props) => {
  return (
    <div className={`modal ${hidden ? "hidden" : ""}`}>
      <div className="modal-close" onClick={handleClose} />
      <div className="modal_content">
        <div className="modal_close" onClick={handleClose}>
          <Close />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
