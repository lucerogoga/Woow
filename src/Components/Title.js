import React, { useState } from "react";

const Title = (props) => {
  const { tittle, quantity } = props;
  return (
    <div>
      <h1>{tittle}</h1>;<h2>{quantity}</h2>
    </div>
  );
};
export default Title;
