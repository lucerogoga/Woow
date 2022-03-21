import React from "react";
import { useLocation } from "react-router-dom";
import "../Assets/ButtonFilter.css";
export function ButtonFilter(props) {
  const { item, icon, onClick, active, filteredOrdersQuantity } = props;
  let location = useLocation();
  const { pathname } = location;
  return (
    <>
      <button
        className={`button-card ${active ? "active" : ""}`}
        onClick={onClick}
      >
        {pathname === "/waiter/orders-resume" ? (
          <div className="button-order--quatity">
            <h2>{filteredOrdersQuantity}</h2>
          </div>
        ) : null}
        {/* renderiamos el icono por props */}
        <div className="button-card--content">
          {icon}
          <div className="button-card--text-content">
            {/* renderizamos el item name por props */}
            <h3 className="button-card--title">{item}</h3>
          </div>
        </div>
      </button>
    </>
  );
}

export default ButtonFilter;
