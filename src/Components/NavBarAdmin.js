import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "../Assets/Navbar.css";
import "../Assets/Sidebar.css";

import { ReactComponent as MenuBurger } from "../Assets/icons/menu-burger.svg";
import { ReactComponent as Admin } from "../Assets/icons/admin.svg";
import { ReactComponent as LogoWoow } from "../Assets/icons/logo-woow.svg";
import { ReactComponent as Logout } from "../Assets/icons/logout.svg";
import { abbrevName } from "../helpers/nameFormatted";
// import { useCart } from "../Components/Context/CartContext";
import { useAuth } from "./Context/AuthContext";
import { getUser } from "../Services/FirestoreServices";

// ---
import { ReactComponent as Back } from "../Assets/icons/back.svg";
import { ReactComponent as Waiter } from "../Assets/icons/waiter.svg";
import { ReactComponent as ShoppingCart } from "../Assets/icons/basket.svg";
import { ReactComponent as FoodMenu } from "../Assets/icons/menu-cart.svg";

// const NavBarAdmin2 = ({
//   onClickMenu,
//   onClickSideBar,
//   currentPath,
//   onClickLogout,
// }) => {
//   const { cart } = useCart();
//   const {
//     user: { currentUser },
//   } = useAuth();

//   const [userName, setUserName] = useState("");
//   //GETTING NAME OF CHEF FOR THE ORDER
//   useEffect(() => {
//     async function settingUserName() {
//       const { user_name } = await getUser(currentUser);
//       setUserName(user_name);
//     }
//     settingUserName();
//   }, []);

//   let location = useLocation();
//   return (
//     <div className="navbar">
//       <div className="navbar--container">
//         <div className="navbar--block">
//           <div className="navbar--burger-container">
//             <MenuBurger width={30} onClick={onClickMenu} />
//           </div>
//           <Link to={""} className="logo-container">
//             <LogoWoow width="70" height="70" />
//           </Link>
//         </div>

//         <ul className="menu">
//           <li className="menu--list">
//             <Link
//               to={""}
//               className={
//                 "menu--link " +
//                 (location.pathname === "/admin" ? "menu--link--active" : "")
//               }
//             >
//               Employes
//             </Link>
//           </li>
//           <li className="menu--list">
//             <Link
//               to={"orders"}
//               className={
//                 "menu--link " +
//                 (location.pathname === "/admin/orders"
//                   ? "menu--link--active"
//                   : "")
//               }
//             >
//               Orders
//             </Link>
//           </li>
//           <li className="menu--list">
//             <Link
//               to={"add-products"}
//               className={
//                 "menu--link " +
//                 (location.pathname === "/admin/add-products"
//                   ? "menu--link--active"
//                   : "")
//               }
//             >
//               Add Products
//             </Link>
//           </li>
//         </ul>

//         <div className="navbar--block">
//           <p className="user-name--content">{abbrevName(userName)}</p>
//           <div style={{ marginLeft: "15px" }}>
//             <div>
//               <Admin width={35} height={35} />
//             </div>
//           </div>
//           <div style={{ marginLeft: "15px" }}>
//             <div className="user--container" onClick={onClickLogout}>
//               <Logout width={25} height={25} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavBarAdmin2;

// ! --------

const NavBarAdmin = ({
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
  let location = useLocation();
  return (
    <div className="navbar">
      <div className="navbar--container">
        <div className="navbar--block">
          <div className="navbar--burger-container">
            {currentPath === "/waiter/detail-product" ? (
              <Link className="menu--link" to={"/waiter"}>
                <Back width={35} height={35} />
              </Link>
            ) : (
              <MenuBurger width={30} onClick={onClickMenu} />
            )}
          </div>
          <Link to={""} className="logo-container">
            <LogoWoow width="70" height="70" />
          </Link>
        </div>

        <ul className="menu">
          <li className="menu--list">
            <Link
              to={""}
              className={
                "menu--link " +
                (location.pathname === "/admin" ? "menu--link--active" : "")
              }
            >
              Employes
            </Link>
          </li>
          <li className="menu--list">
            <Link
              to={"orders"}
              className={
                "menu--link " +
                (location.pathname === "/admin/orders"
                  ? "menu--link--active"
                  : "")
              }
            >
              Orders
            </Link>
          </li>
          <li className="menu--list">
            <Link
              to={"add-products"}
              className={
                "menu--link " +
                (location.pathname === "/admin/add-products"
                  ? "menu--link--active"
                  : "")
              }
            >
              Add Products
            </Link>
          </li>
        </ul>

        <div className="navbar--block">
          <p className="user-name--content">{abbrevName(userName)}</p>
          <div style={{ marginLeft: "15px" }}>
            <div>
              <Admin width={35} height={35} />
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

export default NavBarAdmin;
