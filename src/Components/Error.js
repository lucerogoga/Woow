import React from "react";
import "../Assets/Error.css";

const Error = ({ message }) => {
  console.log(message);
  return (
    <>
      <div className="err-msg">
        <h1 clasName="err-msg--text">{message}</h1>
      </div>
      {/* <h1>Datos inválidos</h1> */}
    </>
  );
};

export default Error;
