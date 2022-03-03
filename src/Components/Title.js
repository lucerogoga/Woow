import React, { useState } from "react";
import "../Assets/Titles.css";
const Title = (props) => {
  const { title, quantity } = props;
  return (
    <div className="title-container">
      <h1>{title}</h1>
      <div className="product-card--button">
        <div className="product-card--buttonIcon">{quantity}</div>
      </div>
    </div>
  );
};
export default Title;
