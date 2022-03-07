import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../Components/Context/AuthContext";
import "../../Assets/Navbar.css";
import "../../Assets/Sidebar.css";
import "../../Assets/OrderCard.css";

import NavBarAdmin from "../../Components/NavBarAdmin";
import SideBarAdmin from "../../Components/SideBarAdmin";

export const AdminView = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  let location = useLocation();
  const { pathname } = location;
  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <NavBarAdmin onClickMenu={() => setOpen(!open)} currentPath={pathname} />
      <div>
        {open && (
          <SideBarAdmin
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

export default AdminView;
