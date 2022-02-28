// import React from "react";
// import ProductCart from "./ProductCard";
// import ButtonFilter from "./ButtonFilter";
// import iconComponents from "../Assets/CustomLogo";
// import { useEffect, useState } from "react";
// import "../Assets/WaiterView.css";
// import "../Assets/Home.css";
// import { useAuth } from "./Context/AuthContext";
// import NavBar from "./NavBar";
// import NavBar2 from "./NavBar2";
// import { Link } from "react-router-dom";
// import NavItem from "./NavItem";
// import { ReactComponent as Salad } from "../Assets/icons/salad.svg";
// import { ReactComponent as Chef } from "../Assets/icons/chef-hat.svg";
// import { ReactComponent as Waiter } from "../Assets/icons/waiter.svg";
// import NavBarChef from "./NavBarChef";
// import NavBarChef, SideBar  from "./NavBarChef";
// import { NavBarChef, SideBar } from "./NavBarChef";
// import { RoleComponent } from "./ProtectedRoutes";
// import { Routes, Route } from "react-router-dom";
// import MainView from "./Pages/MainView";
// import {MainView}
// !-----------------------------------

// import {
//   getProducts,
//   getProductsCategories,
//   filterProductByCategorie,
// } from "./Context/FirestoreContext";

// export const WaiterView = () => {
//   return (
//     <>
//       <NavBarChef />
//       <div>
//         <SideBar />
//         <div className="content">
//           <Routes>
//             <Route
//               path="/chef"
//               element={
//                 <RoleComponent role="chef">
//                   <MainView />
//                 </RoleComponent>
//               }
//             ></Route>
//           </Routes>
//         </div>
//         {/* <MainView /> */}
//       </div>
//     </>
//   );
// };

// return (
//     <>
//       <NavBarChef />
//       {/* ----------ASIDE----------- */}
//       {/* <main> */}
//       <Main>{/* <SideBar /> */}</Main>
//       <Main>
//         <SideBar />
//       </Main>
//       {/* </main> */}
//     </>
//   );

// !----------------------
// export const WaiterView = () => {
//   const [products, setProducts] = useState([]);
//   const [productCategories, setProductCategories] = useState([]);
//   const { user, logout } = useAuth();

//   console.log("estamos en el WaiterView, ", user);
//   const handleLogout = async () => {
//     await logout();
//   };
//   const handleCategorie = async (catUid, catName) =>
//     await filterProductByCategorie(catUid, catName);
//   useEffect(() => {
//     getProducts().then((products) => setProducts(products));
//     getProductsCategories().then((category) => setProductCategories(category));
//   }, []);

//   const handleClick = ({ cat_uid, cat_name }) => {
//     // console.log("consoleateeeeeeeee", e);
//     handleCategorie(cat_uid, cat_name).then((items) => {
//       setProducts(items);
//     });
//   };
//   return (
//     <>

//   <div className="categories-container">
//     {productCategories.map((cat, i) => {
//       return (
//         <ButtonFilter
//           item={cat.cat_name}
//           uid={cat.cat_uid}
//           icon={iconComponents[i]}
//           key={cat.cat_uid}
//           // cat = {objeto}
//           // funcion 1
//           //funcion 2
//           onClick={() => {
//             handleClick(cat);
//           }}
//         />
//       );
//     })}
//   </div>
//   <div className="products-container">
//     {products.map((p) => {
//       return <ProductCart product={p} />;
//     })}
//   </div>
//     </>
//   );
// };

// export default WaiterView;

// !!!---------------------

import React, { useState } from "react";
import { ReactComponent as MenuBurger } from "../Assets/icons/menu-burger.svg";
import { ReactComponent as ShoppingCart } from "../Assets/icons/shopping-cart.svg";
import { ReactComponent as X } from "../Assets/icons/x.svg";
import { ReactComponent as LogoWoow } from "../Assets/logo-woow.svg";
import { useAuth } from "./Context/AuthContext";
import { Link } from "react-router-dom";
import "../Assets/Navbar.css";
import "../Assets/Sidebar.css";
import { ReactComponent as Chef } from "../Assets/icons/chef-hat.svg";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrdersResumeWaiter from "./Pages/Waiter/OrdersResumeWaiter";
import TakeOrderWaiter from "./Pages/Waiter/TakeOrderWaiter";
// OrdersToDoChef

// import {
//   getProducts,
//   getProductsCategories,
//   filterProductByCategorie,
// } from "./Context/FirestoreContext";

export const WaiterView = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const NavBarChef = () => {
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
              <Link className="menu--link" to={"waiter/take-order"}>
                Take Order
              </Link>
            </li>
            <li className="menu--list">
              <Link className="menu--link" to={"waiter/orders-resume"}>
                Orders Resume
              </Link>
            </li>
          </ul>

          <div className="navbar--block">
            <div className="cart--container">
              <Link className="menu--link" to={"/waiter/order-cart"}>
                <ShoppingCart fill="#fff" width={30} />
                <span className="cart--counter">3</span>
              </Link>
            </div>
            <div style={{ marginLeft: "15px" }}>
              <div className="user--container">
                <Chef width={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  function closeSideBar() {
    setOpen(false);
  }
  const SideBar = () => {
    return (
      <>
        <div className="sidebar">
          <div className="sidebar--header">
            {/* <span onClick={() => setOpen(false)}> */}
            <span onClick={closeSideBar}>
              <X className="x-icon" width={25} />
            </span>
          </div>

          <div className="sidebar--menu">
            <div className="sidebar--item">
              <Link className="sidebar--link" to={"waiter/take-order"}>
                Take Order
              </Link>
            </div>
            <div className="sidebar--item">
              <Link className="sidebar--link" to={"waiter/orders-resume"}>
                Orders Resume
              </Link>
            </div>
            <div className="sidebar--item">
              <button className="sidebar--logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <NavBarChef />
      <div>
        {/* <SideBar className={open ? "showSidebar" : null} /> */}
        {/* <SideBar className={open ? "text-strike" : null} /> */}
        {open && <SideBar />}
        <div className="content">
          <h1>holddda</h1>
          <Routes>
            <Route
              path="/chef/orders-delivered"
              render={() => <div>AAAAAAAAAAAAAAAAA</div>}
            />
            {/* <Route path="/orders-delivered" render={() => <div>Home</div>} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default WaiterView;
