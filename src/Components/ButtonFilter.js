import React from "react";
import "../Assets/ButtonFilter.css";
export function ButtonFilter(props) {
  const { item, icon, onClick } = props;
  return (
    <>
      <button className="button-card" onClick={onClick}>
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
