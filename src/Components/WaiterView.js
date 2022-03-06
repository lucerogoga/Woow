import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { useAuth } from "./Context/AuthContext";

import "../Assets/Navbar.css";
import "../Assets/Sidebar.css";
import "../Assets/OrderCard.css";

import NavBarWaiter from "../Components/NavBarWaiter";
import SideBarWaiter from "../Components/SideBarWaiter";

export const WaiterView = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <NavBarWaiter onClickMenu={() => setOpen(!open)} />
      <div>
        {open && (
          <SideBarWaiter
            onClose={(e) => setOpen(false)}
            onClickLogout={handleLogout}
          />
        )}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default WaiterView;
