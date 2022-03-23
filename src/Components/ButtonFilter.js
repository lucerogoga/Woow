import React from "react";
import { useLocation } from "react-router-dom";
import "../Assets/ButtonFilter.css";

export function ButtonFilter(props) {
  const { item, icon, onClick, active, filteredOrdersQuantity } = props;
  let location = useLocation();
  const { pathname } = location;

  // className={
  //   "navbar " +
  //   (location.pathname.includes("detail-product") ? "navbar--absolute" : "")
  // }
  // --
  // className={`button-card ${active ? "active" : ""}`}
  const isPathnameDetail = location.pathname.includes("detail-product");

  console.log("dime que si, ", isPathnameDetail);

  return (
    <>
      <button
        className={
          (isPathnameDetail ? "button-card--detail " : "button-card ") +
          (active ? "active" : "")
        }
        onClick={onClick}
      >
        {pathname === "/waiter/orders-resume" || pathname === "/chef" ? (
          <div className="button-order--quatity">
            <h2>{filteredOrdersQuantity}</h2>
          </div>
        ) : null}
        {/* renderiamos el icono por props */}
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
            {/* renderizamos el item name por props */}
            <h3 className="button-card--title">{item}</h3>
          </div>
        </div>
      </button>
    </>
  );
}

export default ButtonFilter;

// button-card--content
// button-card--icon-container
// button-card--text-content

// button-card--content-detail
// button-card--icon-container-detail
// button-card--text-content-detail

// export function ButtonFilter(props) {
//   const { item, icon, onClick, active, filteredOrdersQuantity } = props;
//   let location = useLocation();
//   const { pathname } = location;

//   // className={
//   //   "navbar " +
//   //   (location.pathname.includes("detail-product") ? "navbar--absolute" : "")
//   // }
//   // --
//   // className={`button-card ${active ? "active" : ""}`}
//   const isPathnameDetail = location.pathname.includes("detail-product");

//   console.log("dime que si, ", isPathnameDetail);

//   return (
//     <>
//       <button
//         className={
//           (isPathnameDetail ? "button-card--detail " : "button-card ") +
//           (active ? "active" : "")
//         }
//         onClick={onClick}
//       >
//         {pathname === "/waiter/orders-resume" ? (
//           <div className="button-order--quatity">
//             <h2>{filteredOrdersQuantity}</h2>
//           </div>
//         ) : null}
//         {/* renderiamos el icono por props */}
//         <div className="button-card--content">
//           {icon}
//           <div className="button-card--text-content">
//             {/* renderizamos el item name por props */}
//             <h3 className="button-card--title">{item}</h3>
//           </div>
//         </div>
//       </button>
//     </>
//   );
// }
