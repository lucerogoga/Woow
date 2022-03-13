import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../Assets/Navbar.css";
import "../Assets/Sidebar.css";

import { ReactComponent as MenuBurger } from "../Assets/icons/menu-burger.svg";
import { ReactComponent as Admin } from "../Assets/icons/admin.svg";
import { ReactComponent as ShoppingCart } from "../Assets/icons/shopping-cart.svg";
import { ReactComponent as FoodMenu } from "../Assets/icons/food-menu.svg";
import { ReactComponent as LogoWoow } from "../Assets/icons/logo-woow.svg";
import { ReactComponent as Logout } from "../Assets/icons/logout.svg";

import { useCart } from "../Components/Context/CartContext";
import { useAuth } from "./Context/AuthContext";

import { getUser } from "../Services/FirestoreServices";
const NavBarAdmin = ({
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
            <MenuBurger width={30} onClick={onClickMenu} />
          </div>
          <div className="logo-container">
            <LogoWoow width="70" height="70" />
          </div>
        </div>

        <ul className="menu">
          <li className="menu--list">
            <Link className="menu--link" to={""}>
              Employes
            </Link>
          </li>
          <li className="menu--list">
            <Link className="menu--link" to={"orders"}>
              Orders
            </Link>
          </li>
          <li className="menu--list">
            <Link className="menu--link" to={"addProducts"}>
              Add Products
            </Link>
          </li>
        </ul>

        <div className="navbar--block">
          {/* {currentPath === "/waiter/order-cart" ? (
            <Link className="menu--link" to={""}>
              <FoodMenu width={35} height={35} />
            </Link>
          ) : (
            <div className="cart--container" onClick={onClickSideBar}>
              <ShoppingCart fill="#fff" width={50} height={35} />
              <span className="cart--counter">{cart.length}</span>
            </div>
          )} */}
          <p className="user-name--content">{userName}</p>
          <div style={{ marginLeft: "15px" }}>
            <div>
              <Admin width={35} height={35} />
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

export default NavBarAdmin;
