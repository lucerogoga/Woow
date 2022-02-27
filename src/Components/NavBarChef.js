import React, { useState } from "react";
// import "../Assets/Home.css";
import "../Assets/ChefView.css";
import LogoWoowRotate from "./LogoWoow";
import { ReactComponent as MenuBurger } from "../Assets/icons/menu-burger.svg";
// import { ReactComponent as Chef } from "../Assets/icons/chef-hat.svg";
import { ReactComponent as Waiter } from "../Assets/icons/waiter.svg";
import { ReactComponent as ShoppingCart } from "../Assets/icons/shopping-cart.svg";
// import { ReactComponent as X } from "../Assets/icons/x.svg";
import { ReactComponent as LogoWoow } from "../Assets/logo-woow.svg";
import { useAuth } from "./Context/AuthContext";
import { Link } from "react-router-dom";

const NavBarChef = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

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
            {/* <StyledLink to={"/"}>Home</StyledLink> */}
            <Link className=" menu--link" to={"/"}>
              Home
            </Link>
          </li>
          <li className="menu--list">
            {/* <StyledLink to={"/order-resume"}>Order Resume</StyledLink> */}
            <Link className=" menu--link" to={"/order-resume"}>
              Order Resume
            </Link>
          </li>
        </ul>

        <div className="navbar--block">
          <div className="cart--Container">
            <Link className=" menu--link" to={"/waiter/order-cart"}>
              <ShoppingCart fill="#fff" width={30} />
              <span className="cart--counter">3</span>
            </Link>
          </div>
          <div style={{ marginLeft: "15px" }}>
            <div className="user--container">
              <Waiter width={30} />
              {/* <Chef width={30} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarChef;

// export const SideBar = () => {
//   return (
//     <>
//       <DropdownContainer>
//         <DropdownHeader>
//           {/* <span onClick={() => setOpen(false)}> */}
//           {/* <X width={15} height={15} /> */}
//           {/* <X width={25} rotate="45deg" /> */}
//           {/* </span> */}
//         </DropdownHeader>

//         <DropdownMenu>
//           <DropdownItem>
//             <StyledLinkDropdown to={"/"}>Home</StyledLinkDropdown>
//           </DropdownItem>
//           <DropdownItem>
//             <StyledLinkDropdown to={"/"}>Take Order</StyledLinkDropdown>
//           </DropdownItem>
//           <DropdownItem>
//             <StyledLinkDropdown to={"/order-resume"}>
//               Order Resume
//             </StyledLinkDropdown>
//           </DropdownItem>
//           <DropdownItem>
//             <button>Logout</button>
//             {/* <button onClick={handleLogout}>Logout</button> */}
//           </DropdownItem>
//         </DropdownMenu>
//       </DropdownContainer>
//     </>
//   );
// };
