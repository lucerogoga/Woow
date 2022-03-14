import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../Assets/Navbar.css";
import "../Assets/Sidebar.css";

import { ReactComponent as MenuBurger } from "../Assets/icons/menu-burger.svg";
import { ReactComponent as Back } from "../Assets/icons/back.svg";
import { ReactComponent as Waiter } from "../Assets/icons/waiter.svg";
import { ReactComponent as ShoppingCart } from "../Assets/icons/shopping-cart.svg";
import { ReactComponent as FoodMenu } from "../Assets/icons/food-menu.svg";
import { ReactComponent as LogoWoow } from "../Assets/icons/logo-woow.svg";
import { ReactComponent as Logout } from "../Assets/icons/logout.svg";

import { useCart } from "../Components/Context/CartContext";
import { useAuth } from "./Context/AuthContext";

import { getUser } from "../Services/FirestoreServices";

const NavBarWaiter = ({
  onClickMenu,
  onClickSideBar,
  currentPath,
  onClickLogout,
}) => {
  const { cart } = useCart();
  const {
    user: { currentUser },
  } = useAuth();

  const [userName, setUserName] = useState("");
  //GETTING NAME OF CHEF FOR THE ORDER
  useEffect(() => {
    async function settingUserName() {
      const { user_name } = await getUser(currentUser);
      setUserName(user_name);
    }
    settingUserName();
  }, []);
  return (
    <div className="navbar">
      <div className="navbar--container">
        <div className="navbar--block">
          <div className="navbar--burger-container">
            {currentPath === "/waiter/detail-product" ? (
              <Link className="menu--link" to={"/waiter"}>
                <Back width={35} height={35} />
              </Link>
            ) : (
              <MenuBurger width={30} onClick={onClickMenu} />
            )}
          </div>
          <div className="logo-container">
            <LogoWoow width="70" height="70" />
          </div>
        </div>

        <ul className="menu">
          <li className="menu--list">
            <Link className="menu--link" to={""}>
              Take Order
            </Link>
          </li>
          <li className="menu--list">
            <Link className="menu--link" to={"orders-resume"}>
              Orders Resume
            </Link>
          </li>
        </ul>

        <div className="navbar--block">
          {currentPath === "/waiter/order-cart" ? (
            <Link className="menu--link" to={""}>
              <FoodMenu width={35} height={35} />
            </Link>
          ) : currentPath === "/waiter/detail-product" ? null : (
            <div className="cart--container" onClick={onClickSideBar}>
              <ShoppingCart fill="#fff" width={50} height={35} />
              <span className="cart--counter">{cart.length}</span>
            </div>
          )}
          <p className="user-name--content">{userName}</p>
          <div style={{ marginLeft: "15px" }}>
            <div>
              <Waiter width={35} height={35} />
            </div>
          </div>
          <div style={{ marginLeft: "15px" }}>
            <div className="user--container" onClick={onClickLogout}>
              <Logout width={25} height={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarWaiter;
