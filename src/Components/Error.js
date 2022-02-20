import React from "react";

const Error = ({ message }) => {
  console.log(message);
  return (
    <>
      <h1>{message}</h1>
      {/* <h1>Datos inválidos</h1> */}
    </>
  );
};

export default Error;
