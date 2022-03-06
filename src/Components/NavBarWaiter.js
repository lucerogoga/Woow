import React from "react";
import { Link } from "react-router-dom";

import "../Assets/Navbar.css";
import "../Assets/Sidebar.css";

import { ReactComponent as MenuBurger } from "../Assets/icons/menu-burger.svg";
import { ReactComponent as Waiter } from "../Assets/icons/waiter.svg";
import { ReactComponent as ShoppingCart } from "../Assets/icons/shopping-cart.svg";
import { ReactComponent as LogoWoow } from "../Assets/logo-woow.svg";

import { useCart } from "../Components/Context/CartContext";

const NavBarWaiter = ({ onClickMenu, onClickSideBar }) => {
  const { cart } = useCart();

  return (
    <div className="navbar">
      <div className="navbar--container">
        <div className="navbar--block">
          <div className="navbar--burger-container">
            <MenuBurger width={30} onClick={onClickMenu} />
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
          <div className="cart--container" onClick={onClickSideBar}>
            {/* <Link
              className="menu--link"
              to={""}
              // onClick={setIsSideBarCartOpen(!isSideBarCartOpen)}
            > */}
            <ShoppingCart fill="#fff" width={30} height={30} />
            <span className="cart--counter">{cart.length}</span>
            {/* </Link> */}
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

export default NavBarWaiter;
