import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { useAuth } from "./Context/AuthContext";
import { useSideBarCart } from "./Context/SideBarCartContext";
import "../Assets/Navbar.css";
import "../Assets/Sidebar.css";
import "../Assets/OrderCard.css";

import NavBarWaiter from "../Components/NavBarWaiter";
import SideBarWaiter from "../Components/SideBarWaiter";
import SideBarCart from "../Components/SideBarCart";

export const WaiterView = () => {
  const [open, setOpen] = useState(false);
  const { isSideBarCartOpen, setIsSideBarCartOpen } = useSideBarCart();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <NavBarWaiter
        onClickMenu={() => setOpen(!open)}
        onClickSideBar={() => setIsSideBarCartOpen(!isSideBarCartOpen)}
      />
      <div>
        {isSideBarCartOpen && (
          <SideBarCart onClose={(e) => setIsSideBarCartOpen(false)} />
        )}
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
