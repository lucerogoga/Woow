import React from "react";
import LogoWoow from "./LogoWoow";
import { Link } from "react-router-dom";
import "../Assets/"

import "../Assets/NavBar.css";

const NavBar = () => {
  return (
    <nav className="NavBar">
      <LogoWoow className="navBar--logo" />
      <LogoWoow fill="#800" width="80" height="80" />
      {/* <LogoWoow className="navBar--logo" fill="#800" width="80" height="80" /> */}

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/waiter/product-detail">Product Detail</Link>
        </li>
        <li>
          <Link to="/chef">Chef</Link>
        </li>
        <li>
          <Link to="/waiter/order-cart">Order Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
