import React from "react";

export function ButtonFilter(props) {
  const { item, icon, onClick } = props;
  return (
    <>
      <button className="button-card" onClick={onClick}>
        {/* renderiamos el icono por props */}
        {icon}
        {/* renderizamos el item name por props */}
        <h3 className="button-card--title">{item}</h3>
      </button>
    </>
  );
}

export default ButtonFilter;
