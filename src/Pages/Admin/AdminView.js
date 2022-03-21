import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Components/Context/AuthContext";
import "../../Assets/Navbar.css";
import "../../Assets/Sidebar.css";
import "../../Assets/OrderCard.css";
import NavBarAdmin from "../../Components/NavBarAdmin";
import SideBarAdmin from "../../Components/SideBarAdmin";

const AdminView = () => {
  const [open, setOpen] = useState(false);
  const handleSidebarOpen = () => {
    setOpen(true);
  };
  const handleSidebarClose = () => {
    setOpen(false);
  };

  const { logout } = useAuth();
  let location = useLocation();
  const { pathname } = location;
  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <NavBarAdmin
        onClickMenu={handleSidebarOpen}
        currentPath={pathname}
        onClickLogout={handleLogout}
      />
      <div>
        <SideBarAdmin
          isOpen={open}
          onClose={handleSidebarClose}
          onClickLogout={handleLogout}
        />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminView;
