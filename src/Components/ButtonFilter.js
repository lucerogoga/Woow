import React from "react";
import { useLocation } from "react-router-dom";
import "../Assets/ButtonFilter.css";

export function ButtonFilter(props) {
  const { item, icon, onClick, active, filteredOrdersQuantity } = props;
  let location = useLocation();
  const { pathname } = location;

  const isPathnameDetail = location.pathname.includes("detail-product");

  return (
    <>
      <button
        className={
          (isPathnameDetail ? "button-card--detail " : "button-card ") +
          (active ? "active" : "")
        }
        onClick={onClick}
      >
        {pathname === "/waiter/orders-resume" ||
        pathname === "/chef" ||
        pathname === "/admin/orders" ? (
          <div className="button-order--quantity">
            <h2>{filteredOrdersQuantity}</h2>
          </div>
        ) : null}
        {/* render icono to props */}
        <div
          className={
            isPathnameDetail
              ? "button-card--content-detail"
              : "button-card--content"
          }
        >
          <div
            className={
              isPathnameDetail
                ? "button-card--icon-container-detail"
                : "button-card--icon-container"
            }
          >
            {icon}
          </div>
          <div
            className={
              isPathnameDetail
                ? "button-card--text-content-detail"
                : "button-card--text-content"
            }
          >
            {/* render the item name to props */}
            <h3 className="button-card--title">{item}</h3>
          </div>
        </div>
      </button>
    </>
  );
}

export default ButtonFilter;
