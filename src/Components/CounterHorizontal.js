import React, { useState } from "react";
import "../Assets/DetailProduct.css";

const CounterHorizontal = () => {
  const [count, setCount] = useState(1);

  return (
    <>
      <div className="counter-content">
        <button className="counter-button" onClick={() => setCount(count - 1)}>
          -
        </button>
        <p>{count}</p>
        <button className="counter-button" onClick={() => setCount(count + 1)}>
          +
        </button>
      </div>
    </>
  );
};

export default CounterHorizontal;
