import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { useAuth } from "./Context/AuthContext";

import { ReactComponent as MenuBurger } from "../Assets/icons/menu-burger.svg";
import { ReactComponent as ShoppingCart } from "../Assets/icons/shopping-cart.svg";
import { ReactComponent as X } from "../Assets/icons/x.svg";
import { ReactComponent as LogoWoow } from "../Assets/logo-woow.svg";
import { ReactComponent as Waiter } from "../Assets/icons/waiter.svg";

import "../Assets/Navbar.css";
import "../Assets/Sidebar.css";
import "../Assets/OrderCard.css";

export const WaiterView = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const NavBarWaiter = () => {
    return (
      <div className="navbar">
        <div className="navbar--container">
          <div className="navbar--block">
            <div className="navbar--burger-container">
              <MenuBurger width={30} onClick={() => setOpen(!open)} />
            </div>

            <div className="logo-container">
              <LogoWoow width="70" height="70" />
            </div>
          </div>

          <ul className="menu">
            <li className="menu--list">
              <Link className="menu--link" to={"waiter/take-order"}>
                Take Order
              </Link>
            </li>
            <li className="menu--list">
              <Link className="menu--link" to={"waiter/orders-resume"}>
                Orders Resume
              </Link>
            </li>
          </ul>

          <div className="navbar--block">
            <div className="cart--container">
              <Link className="menu--link" to={"/waiter/order-cart"}>
                <ShoppingCart fill="#fff" width={30} height={30} />
                <span className="cart--counter">3</span>
              </Link>
            </div>
            <div style={{ marginLeft: "15px" }}>
              <div className="user--container">
                <Waiter width={25} height={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  function closeSideBar() {
    setOpen(false);
  }
  const SideBar = () => {
    return (
      <>
        <div className="sidebar">
          <div className="sidebar--header">
            {/* <span onClick={() => setOpen(false)}> */}
            <span onClick={closeSideBar}>
              <X className="x-icon" width={25} />
            </span>
          </div>

          <div className="sidebar--menu">
            <div className="sidebar--item">
              <Link className="sidebar--link" to={""}>
                Take Order
              </Link>
            </div>
            <div className="sidebar--item">
              <Link className="sidebar--link" to={"orders-resume"}>
                Orders Resume
              </Link>
            </div>
            <div className="sidebar--item">
              <button className="sidebar--logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <NavBarWaiter />
      <div>
        {open && <SideBar />}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default WaiterView;
