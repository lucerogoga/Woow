import React from "react";
import "../Assets/ErrorModal.css";
import { ReactComponent as X } from "../Assets/icons/x.svg";

const ErrorModal = ({ message, onClose, isVisible }) => {
  return (
    <div className={"err-msg-modal " + (isVisible ? "" : "hide")}>
      <div className="err-msg__content">
        <span className="err-msg__close-icon" onClick={onClose}>
          <X className="err-msg-x" />
        </span>

        <h1 className="err-msg--text">{message}</h1>
      </div>
    </div>
  );
};

export default ErrorModal;
