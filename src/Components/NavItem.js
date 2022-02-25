import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ icon, path, children }) => {
  return (
    <li>
      <Link className="navBar--link" to={path}>
        {children}
      </Link>
    </li>
  );
};

// ! LINKS CON ICONOS
// const NavItem = ({ icon, path }) => {
//   return (
//     <li>
//       <Link className="navBar--link" to={path}>
//         {icon}
//       </Link>
//     </li>
//   );
// };

export default NavItem;
