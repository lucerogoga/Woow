import React from "react";
import "../Assets/Time.css";
import { ReactComponent as Clock } from "../Assets/icons/clock.svg";

const Time = () => {
  return (
    <div className="order-cart--containertime">
      <Clock className="order-cart--clock" width={16} height={16} />
      <h3 className="order-cart--minutes">00:00:00</h3>
    </div>
  );
};

export default Time;
