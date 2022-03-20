import { Link } from "react-router-dom";
import { ReactComponent as X } from "../Assets/icons/x.svg";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import * as React from "react";

const SidebarChefContainer = ({ onClose, onClickLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar--header">
        <span onClick={onClose}>
          <X className="x-icon" width={25} />
        </span>
      </div>

      <div className="sidebar--menu">
        <div className="sidebar--item">
          <Link className="sidebar--link sidebar--link--active" to={""}>
            Orders
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

const SideBarChef = ({ isOpen, onClose, onClickLogout }) => {
  console.log(isOpen);
  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"left"} open={isOpen} onClose={onClose}>
          <Box sx={{ width: 250, bgcolor: "#ffefc0", height: "100vh" }}>
            <SidebarChefContainer
              onClose={onClose}
              onClickLogout={onClickLogout}
            />
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default SideBarChef;
