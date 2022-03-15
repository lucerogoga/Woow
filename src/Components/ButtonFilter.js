import React, { useEffect } from "react";
import "../Assets/ButtonFilter.css";
export function ButtonFilter(props) {
  const { item, icon, onClick, active } = props;

  console.log("Está activo el botón?, ", active);
  return (
    <>
      <button
        className={`button-card ${active ? "active" : ""}`}
        onClick={onClick}
      >
        {/* renderiamos el icono por props */}
        <div className="button-card--content">
          {icon}
          <div className="button-card--text-content">
            <h3 className="button-card--title">{item}</h3>
          </div>
        </div>
        {/* renderizamos el item name por props */}
      </button>
    </>
  );
}

export default ButtonFilter;
