import React, { useState } from "react";
import "../Assets/Error.css";
import { ReactComponent as X } from "../Assets/icons/x.svg";

const Error = ({ message, onClose, isVisible }) => {
  return (
    <>
      <div className={"err-msg " + (isVisible ? "" : "hide")}>
        <div className="err-msg__content">
          <span className="err-msg__close-icon" onClick={onClose}>
            <X className="err-msg-x" />
          </span>

          <h1 className="err-msg--text">{message}</h1>
        </div>
      </div>
    </>
  );
};

export default Error;
