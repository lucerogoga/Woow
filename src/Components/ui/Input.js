import React from "react";

const Input = ({ id, className, type, placeholder, onChange }) => {
  return (
    <input
      id={id}
      className={className}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    ></input>
  );
};

export default Input;
