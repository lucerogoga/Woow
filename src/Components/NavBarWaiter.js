import React, { useState } from "react";
// import "../Assets/Home.css";
import "../Assets/Navbar.css";
import "../Assets/Sidebar.css";
import LogoWoowRotate from "./LogoWoow";
import { ReactComponent as MenuBurger } from "../Assets/icons/menu-burger.svg";
// import { ReactComponent as Chef } from "../Assets/icons/chef-hat.svg";
import { ReactComponent as Waiter } from "../Assets/icons/waiter.svg";
import { ReactComponent as ShoppingCart } from "../Assets/icons/shopping-cart.svg";
import { ReactComponent as X } from "../Assets/icons/x.svg";
import { ReactComponent as LogoWoow } from "../Assets/logo-woow.svg";
import { useAuth } from "./Context/AuthContext";
import { Link } from "react-router-dom";

export const NavBarChef = () => {
  const [open, setOpen] = useState(false);
  // const { user, logout } = useAuth();

  // const handleLogout = async () => {
  //   await logout();
  // };

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
            <Link className="menu--link" to={"/"}>
              Home
            </Link>
          </li>
          <li className="menu--list">
            <Link className="menu--link" to={"/order-resume"}>
              Order Resume
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
              <Waiter width={30} height={30} />
              {/* <Chef width={30} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default NavBarChef;

export const SideBar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar--header">
          {/* <span onClick={() => setOpen(false)}> */}
          {/* <X width={15} height={15} /> */}
          <X className="x-icon" width={25} rotate="45deg" />
          {/* </span> */}
        </div>

        <div className="sidebar--menu">
          <div className="sidebar--item">
            <Link className="sidebar--link" to={"/"}>
              Home
            </Link>
          </div>
          <div className="sidebar--item">
            <Link className="sidebar--link" to={"/"}>
              Take Order
            </Link>
          </div>
          <div className="sidebar--item">
            <Link className="sidebar--link" to={"/order-resume"}>
              Order Resume
            </Link>
          </div>
          <div className="sidebar--item">
            <button className="sidebar--logout">Logout</button>
            {/* <button onClick={handleLogout}>Logout</button> */}
          </div>
        </div>
      </div>
    </>
  );
};
