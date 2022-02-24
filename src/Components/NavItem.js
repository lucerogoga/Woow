import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ icon, path }) => {
  return (
    <li>
      {/* <Link className="navBar--link" to="/"> */}
      <Link className="navBar--link" to={path}>
        {icon}
      </Link>
    </li>
  );
};

export default NavItem;
