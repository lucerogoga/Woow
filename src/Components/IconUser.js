import React from "react";
import "../Assets/NavBar.css";
import NavItem from "./NavItem";
import { ReactComponent as Waiter } from "../Assets/icons/waiter.svg";
import { ReactComponent as Chef } from "../Assets/icons/chef-hat.svg";

const IconUser = ({ children }) => {
  return (
    <>
      <h1>O</h1>
      {/* <Chef /> */}
      {children}
    </>
  );
};

export default IconUser;
