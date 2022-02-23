import React from "react";
import LogoWoow from "./LogoWoow";

// import {reactComponent as nombreAlAzar} from "./archivo.svg"

const NavBar = () => {
  return (
    <nav className="nav-home">
      {/* <img src="../Assets/logo-woow.svg"></img> */}
      {/* <img alt="logoWoow" className="login--logo--nav" src={LogoWoow} /> */}
      <LogoWoow fill="#fff" width="35" height="35" />
      <p>si</p>
    </nav>
  );
};

export default NavBar;
