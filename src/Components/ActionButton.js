import React from "react";
import "../Assets/DetailProduct.css";

const LargeButton = (props) => {
  const { title, className } = props;
  return (
    <>
      <button className={className}>{title}</button>
    </>
  );
};

export default LargeButton;
