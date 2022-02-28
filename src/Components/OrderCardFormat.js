import React from "react";
import { ReactComponent as Clock } from "../Assets/icons/clock.svg";

const OrderCardFormat = () => {
  return (
    <div className="products-container">
      <div className="order-card">
        <div className="order-card--header">
          <div className="order-card--info-container">
            <div className="order-card--titles-container">
              <h3 className="order-card--info-title">Order N°:</h3>
              <h3 className="order-card--info-title">Client:</h3>
              <h3 className="order-card--info-title">Chef:</h3>
              <h3 className="order-card--info-title">Table N°:</h3>
            </div>
            <div className="order-card--infos-container">
              <div className="order-card--info-p">000036</div>
              <div className="order-card--info-p">Mariana Rodriguez</div>
              <div className="order-card--info-p">Pancho Hernandez</div>
              <div className="order-card--info-p">1</div>
            </div>
          </div>
          <div className="order-card--right-container">
            <div className="order-cart--containertime">
              <Clock className="order-cart--clock" width={16} height={16} />
              <h3 className="order-cart--minutes">00:30:00</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCardFormat;
