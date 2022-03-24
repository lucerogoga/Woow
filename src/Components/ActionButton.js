import React from "react";
import "../Assets/DetailProduct.css";

const ActionButton = (props) => {
  const { title, className } = props;
  return <button className={className}>{title}</button>;
};

export default ActionButton;
