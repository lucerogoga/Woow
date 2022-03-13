import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../Assets/Navbar.css";
import "../Assets/Sidebar.css";

import { ReactComponent as MenuBurger } from "../Assets/icons/menu-burger.svg";
import { ReactComponent as Chef } from "../Assets/icons/chef-hat.svg";
import { ReactComponent as LogoWoow } from "../Assets/icons/logo-woow.svg";
import { ReactComponent as Logout } from "../Assets/icons/logout.svg";

import { useAuth } from "./Context/AuthContext";

import { getUser } from "../Services/FirestoreServices";

const NavBarChef = ({
  onClickMenu,
  onClickSideBar,
  currentPath,
  onClickLogout,
}) => {
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

        {/* <ul className="menu">
          <li className="menu--list">
            <Link className="menu--link" to={"chef/take-order"}>
              Take Order
            </Link>
          </li>
          <li className="menu--list">
            <Link className="menu--link" to={"chef/orders-resume"}>
              Orders Resume
            </Link>
          </li>
        </ul> */}

        <div className="navbar--block">
          <p className="user-name--content">{userName}</p>
          <div style={{ marginLeft: "15px" }}>
            <div>
              <Chef width={35} height={35} />
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

export default NavBarChef;
