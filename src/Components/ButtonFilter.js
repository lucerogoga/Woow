import React, { useState, useEffect } from "react";

export function ButtonFilter(props) {
  const { item, icon } = props;

  return (
    <>
      <button className="button-card">
        {/* <img src={Salty} className="button-image" alt="product.name" /> */}

        {icon}
        <h3 className="button-card--title">{item}</h3>
      </button>
    </>
  );
}

export default ButtonFilter;
