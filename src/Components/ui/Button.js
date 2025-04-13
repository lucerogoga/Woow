import React from "react";

const Button = ({ id, className, text, ...props }) => {
  return (
    <button id={id} className={className} {...props}>
      {text}
    </button>
  );
};

export default Button;
