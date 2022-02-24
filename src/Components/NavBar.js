import React from "react";
import LogoWoow from "./LogoWoow";
import { Link } from "react-router-dom";
import "../Assets/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navBar">
      <LogoWoow className="navBar--logo" fill="#fff" width="80" height="80" />
      <ul className="navBar--list">
        <li>
          <Link className="navBar--link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="navBar--link" to="/waiter/product-detail">
            Product Detail
          </Link>
        </li>
        <li>
          <Link className="navBar--link" to="/chef">
            Chef
          </Link>
        </li>
        <li>
          <Link className="navBar--link" to="/waiter/order-cart">
            Order Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
