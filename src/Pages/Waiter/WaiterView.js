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
  const handleSidebarOpen = () => {
    setOpen(true);
  };
  const handleSidebarClose = () => {
    setOpen(false);
  };

  const { openCart, setOpenCart } = useSideBarCart();

  const handleSidebarCartOpen = () => {
    setOpenCart(true);
  };
  const handleSidebarCartClose = () => {
    setOpenCart(false);
  };

  const { logout } = useAuth();
  let location = useLocation();
  const { pathname } = location;
  const handleLogout = async () => {
    console.log("ejecutado logout");
    await logout();
  };

  return (
    <>
      <NavBarWaiter
        onClickMenu={handleSidebarOpen}
        onClickSideBar={handleSidebarCartOpen}
        currentPath={pathname}
        onClickLogout={handleLogout}
      />
      <div>
        <SideBarCart isOpen={openCart} onClose={handleSidebarCartClose} />
        <SideBarWaiter
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

export default WaiterView;
