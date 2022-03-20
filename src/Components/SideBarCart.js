import Cart from "./Cart";
import "../Assets/SideBarCart.css";
import { ReactComponent as X } from "../Assets/icons/x.svg";
import ActionButton from "./ActionButton";
import { useNavigate } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import * as React from "react";

const Caja = ({ onClose }) => {
  let navigate = useNavigate();
  const handleGoCart = () => {
    navigate("../waiter/order-cart");
    onClose();
  };

  return (
    <div className="">
      <div className="sidebar--header">
        <span onClick={onClose}>
          <X className="x-icon" width={25} />
        </span>
      </div>
      <Cart cantEdit={true} />
      <div className="large-button--content">
        <ActionButton
          title="Ver Carrito"
          className={"pink-button-sidebarcart"}
        ></ActionButton>
      </div>
    </div>
  );
};

const SideBarCart = ({ isOpen, onClose }) => {
  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"right"} open={isOpen} onClose={onClose}>
          <Box sx={{ width: 500, height: "100vh", padding: "1rem" }}>
            <Caja onClose={onClose} />
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

// const SideBarCart = ({ onClose }) => {
//   let navigate = useNavigate();
//   const handleGoCart = () => {
//     navigate("../waiter/order-cart");
//     onClose();
//   };
//   return (
//     <>
//       <div className="sideBarCart-content">
//         <div className="sidebar--header">
//           <span onClick={onClose}>
//             <X className="x-icon" width={25} />
//           </span>
//         </div>
//         <Cart cantEdit={true} />
//         <div className="large-button--content" onClick={handleGoCart}>
//           <ActionButton
//             title="Ver Carrito"
//             className={"pink-button-sidebarcart"}
//           ></ActionButton>
//         </div>
//       </div>
//     </>
//   );
// };
export default SideBarCart;
