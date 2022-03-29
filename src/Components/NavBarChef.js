import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Assets/Navbar.css";
import "../Assets/Sidebar.css";
//Context
import { useAuth } from "./Context/AuthContext";
//Firebase Conection
import { getUser } from "../Services/FirestoreServices";
//Components
import { ReactComponent as MenuBurger } from "../Assets/icons/menu-burger.svg";
import { ReactComponent as Chef } from "../Assets/icons/chef-hat.svg";
import { ReactComponent as LogoWoow } from "../Assets/icons/logo-woow.svg";
import { ReactComponent as Logout } from "../Assets/icons/logout.svg";
//Helpers
import { abbrevName } from "../helpers/nameFormatted";

const NavBarChef = ({ onClickMenu, onClickLogout }) => {
  const {
    user: { currentUser },
  } = useAuth();
  //GETTING NAME OF CHEF FOR THE ORDER
  const [userName, setUserName] = useState("");
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
          <Link to={""} className="logo-container">
            <LogoWoow width="70" height="70" />
          </Link>
        </div>
        <div className="navbar--block">
          <p className="user-name--content">{abbrevName(userName)}</p>
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
