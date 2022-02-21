import React from "react";
import "../Assets/Error.css";

const Error = ({ message }) => {
  console.log(message);
  return (
    <>
      <div class="err-msg">
        <h1 class="err-msg--text">{message}</h1>
      </div>
      {/* <h1>Datos inválidos</h1> */}
    </>
  );
};

export default Error;
