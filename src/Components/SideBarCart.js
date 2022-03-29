import React from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/SideBarCart.css";
//Component
import { ReactComponent as X } from "../Assets/icons/x.svg";
import Cart from "./Cart";
//Material UI Component
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

const BoxCart = ({ onClose }) => {
  let navigate = useNavigate();
  const handleGoCart = () => {
    onClose();
    navigate("../waiter/order-cart");
  };

  return (
    <div className="">
      <div className="sidebar--header">
        <span onClick={onClose}>
          <X className="x-icon" width={25} />
        </span>
      </div>
      <Cart cantEdit={true} handleGoCart={handleGoCart} />
    </div>
  );
};

const SideBarCart = ({ isOpen, onClose }) => {
  return (
    <>
      <Drawer anchor={"right"} open={isOpen} onClose={onClose}>
        <Box
          sx={{
            width: 500,
            height: "100vh",
            padding: "1rem",
            overflow: "hidden",
            paddingBottom: "2rem",
          }}
        >
          <BoxCart onClose={onClose} />
        </Box>
      </Drawer>
    </>
  );
};
export default SideBarCart;
