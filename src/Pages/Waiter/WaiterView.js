import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../Components/Context/AuthContext";
import { useSideBarCart } from "../../Components/Context/SideBarCartContext";
import "../../Assets/Navbar.css";
import "../../Assets/Sidebar.css";
import "../../Assets/OrderCard.css";

import NavBarWaiter from "../../Components/NavBarWaiter";
import SideBarWaiter from "../../Components/SideBarWaiter";
import SideBarCart from "../../Components/SideBarCart";

export const WaiterView = () => {
  const [open, setOpen] = useState(false);
  const { isSideBarCartOpen, setIsSideBarCartOpen } = useSideBarCart();
  const { logout } = useAuth();
  let location = useLocation();
  const { pathname } = location;
  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <NavBarWaiter
        onClickMenu={() => setOpen(!open)}
        onClickSideBar={() => setIsSideBarCartOpen(!isSideBarCartOpen)}
        currentPath={pathname}
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
