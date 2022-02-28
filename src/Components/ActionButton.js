import React from "react";
import "../Assets/Product-Detail.css";

const LargeButton = (props) => {
  const { title } = props;
  return (
    <>
      <div className="observation-content">
        <button className="btn-action">{title}</button>
      </div>
    </>
  );
};

export default LargeButton;
