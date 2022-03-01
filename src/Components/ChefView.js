import React, { useState } from "react";
import { ReactComponent as MenuBurger } from "../Assets/icons/menu-burger.svg";
import { ReactComponent as ShoppingCart } from "../Assets/icons/shopping-cart.svg";
import { ReactComponent as X } from "../Assets/icons/x.svg";
import { ReactComponent as LogoWoow } from "../Assets/logo-woow.svg";
import { useAuth } from "./Context/AuthContext";
import { Link } from "react-router-dom";
import "../Assets/Navbar.css";
import "../Assets/Sidebar.css";
import { ReactComponent as Chef } from "../Assets/icons/chef-hat.svg";
import { Route, Routes } from "react-router-dom";

// OrdersToDoChef

// import {
//   getProducts,
//   getProductsCategories,
//   filterProductByCategorie,
// } from "./Context/FirestoreContext";

export const ChefView = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const NavBarChef = () => {
    return (
      <div className="navbar">
        <div className="navbar--container">
          <div className="navbar--block">
            <div className="navbar--burger-container">
              <MenuBurger width={30} onClick={() => setOpen(true)} />
            </div>

            <div className="logo-container">
              <LogoWoow width={70} height={70} />
            </div>
          </div>

          <ul className="menu">
            <li className="menu--list">
              <Link className="menu--link" to={"chef/orders-to-do"}>
                Orders To Do
              </Link>
            </li>
            <li className="menu--list">
              <Link className="menu--link" to={"chef/orders-delivered"}>
                Orders Delivered
              </Link>
            </li>
          </ul>

          <div className="navbar--block">
            <div className="cart--container">
              <Link className="menu--link" to={"/waiter/order-cart"}>
                <ShoppingCart fill="#fff" width={30} />
                <span className="cart--counter">3</span>
              </Link>
            </div>
            <div style={{ marginLeft: "15px" }}>
              <div className="user--container">
                <Chef width={30} />
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
              <Link className="sidebar--link" to={"chef/orders-to-do"}>
                Orders To Do
              </Link>
            </div>
            <div className="sidebar--item">
              <Link className="sidebar--link" to={"orders-delivered"}>
                Orders Delivered
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
      <NavBarChef />
      <div>
        <SideBar className={open ? "showSidebar" : null} />
        {/* <SideBar className={open ? 'text-strike' : null}/> */}
        {/* {open && <SideBar />} */}
        <div className="content"></div>
      </div>
    </>
  );
};

export default ChefView;
