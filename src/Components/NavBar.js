import React, { useState } from "react";
import LogoWoow from "./LogoWoow";
import { Link } from "react-router-dom";
import "../Assets/NavBar.css";
import NavItem from "./NavItem";
// import { ReactComponent as Salad } from "../Assets/icons/salad.svg";
import { ReactComponent as Menu } from "../Assets/icons/menu-burger.svg";
import MenuBurger from "../Assets/icons/MenuBurger";
// import { ReactComponent as Waiter } from "../Assets/icons/waiter.svg";
import { ReactComponent as Chef } from "../Assets/icons/chef-hat.svg";
import { ReactComponent as ShoppingCart } from "../Assets/icons/shopping-cart.svg";

const NavBar = ({ children }) => {
  // const [dropdown, setDropdown] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <nav className="navBar">
      {/* <h1>H</h1> */}
      <button onClick={() => setOpen(!open)}>BU</button>

      {open && <DropdownMenu>{children}</DropdownMenu>}
      {/* {open && children} */}
      {/* <NavItem icon={<MenuBurger />} path="/sandwich" /> */}
      {/* <NavItem icon={<Menu />} path="/sandwich" /> */}

      <Link className="navBar--link" to={"/"}>
        <LogoWoow className="navBar--logo" fill="#fff" width="80" height="80" />
      </Link>

      <ul className="navBar--list">{children}</ul>

      {/* Iconos que no son de la lista */}
      <Link className="navBar--link cart" to={"/waiter/order-cart"}>
        <ShoppingCart />
        {/* ! acomodar */}
        <span className="cart--number">3</span>
      </Link>

      <div className="user-photo">
        <Chef className="user-photo--icon" />
      </div>
    </nav>
  );
};

function DropdownMenu() {
  const dropdownItem = ({ children }) => {
    return <Link className="menu-item">{children}</Link>;
  };
  return (
    <div className="dropdown">
      <dropdownItem>My profile</dropdownItem>
      <dropdownItem>My profile2</dropdownItem>
      <dropdownItem>My profile3</dropdownItem>
    </div>
  );
}
// const NavBar = ({children}) => {
//   return (
//     <nav className="navBar">
//       <LogoWoow className="navBar--logo" fill="#fff" width="80" height="80" />
//       <ul className="navBar--list">
//         <li>
//           <Link className="navBar--link" to="/">
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link className="navBar--link" to="/waiter/product-detail">
//             Product Detail
//           </Link>
//         </li>
//         <li>
//           <Link className="navBar--link" to="/chef">
//             Chef
//           </Link>
//         </li>
//         <li>
//           <Link className="navBar--link" to="/waiter/order-cart">
//             Order Cart
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

export default NavBar;
