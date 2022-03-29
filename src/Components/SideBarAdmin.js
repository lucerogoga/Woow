import React from "react";
import { Link, useLocation } from "react-router-dom";
//Component
import { ReactComponent as X } from "../Assets/icons/x.svg";
//Material UI Component
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

const SidebarAdminContainer = ({ onClose, onClickLogout }) => {
  let location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar--header">
        <span onClick={onClose}>
          <X className="x-icon" width={25} />
        </span>
      </div>

      <div className="sidebar--menu">
        <div className="sidebar--item">
          <Link
            to={""}
            className={
              "sidebar--link " +
              (location.pathname === "/admin" ? "sidebar--link--active" : "")
            }
          >
            Employes
          </Link>
        </div>
        <div className="sidebar--item">
          <Link
            to={"orders"}
            className={
              "sidebar--link " +
              (location.pathname === "/admin/orders"
                ? "sidebar--link--active"
                : "")
            }
          >
            Orders
          </Link>
        </div>
        <div className="sidebar--item">
          <Link
            to={"add-products"}
            className={
              "sidebar--link " +
              (location.pathname === "/admin/add-products"
                ? "sidebar--link--active"
                : "")
            }
          >
            Products
          </Link>
        </div>
        <div className="sidebar--item">
          <button className="sidebar--logout" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const SideBarAdmin = ({ isOpen, onClose, onClickLogout }) => {
  console.log(isOpen);
  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"left"} open={isOpen} onClose={onClose}>
          <Box
            sx={{
              width: 250,
              bgcolor: "#ffefc0",
              height: "100vh",
              padding: "1rem",
            }}
          >
            <SidebarAdminContainer
              onClose={onClose}
              onClickLogout={onClickLogout}
            />
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default SideBarAdmin;
