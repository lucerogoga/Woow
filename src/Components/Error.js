import React, { useState } from "react";
import "../Assets/Error.css";
import { ReactComponent as X } from "../Assets/icons/x.svg";

const Error = ({ message, onClose }) => {
  // const toggle = () => {
  //   setCloseX(!closeX);
  // };

  return (
    <>
      <div className="err-msg">
        <div className="err-msg-header">
          <span onClick={onClose}>
            <X className="err-msg-x" />
          </span>
        </div>

        <h1 className="err-msg--text">{message}</h1>
      </div>
    </>
  );
};

export default Error;
