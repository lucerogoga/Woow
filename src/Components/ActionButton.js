import React from "react";
import "../Assets/DetailProduct.css";

const LargeButton = (props) => {
  const { title } = props;
  return (
    <>
      <button className="pink-button">{title}</button>
    </>
  );
};

export default LargeButton;
