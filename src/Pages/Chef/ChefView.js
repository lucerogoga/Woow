import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Components/Context/AuthContext";
import "../../Assets/Navbar.css";
import "../../Assets/Sidebar.css";
import "../../Assets/OrderCard.css";

import NavBarChef from "../../Components/NavBarChef";
import SideBarChef from "../../Components/SideBarChef";
import OrdersToDoChef from "./OrdersToDoChef";

export const ChefView = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  let location = useLocation();
  const { pathname } = location;
  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <NavBarChef
        onClickMenu={() => setOpen(!open)}
        currentPath={pathname}
        onClickLogout={handleLogout}
      />
      <div>
        {open && (
          <SideBarChef
            onClose={(e) => setOpen(false)}
            onClickLogout={handleLogout}
          />
        )}
        <div className="content">
          <OrdersToDoChef />
        </div>
      </div>
    </>
  );
};

export default ChefView;
