import React, { useState, useEffect } from "react";
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
import ProductCart from "./ProductCard";
import ButtonFilter from "./ButtonFilter";
import iconComponents from "../Assets/CustomLogo";
import {
  getProducts,
  getProductsCategories,
  filterProductByCategorie,
} from "./Context/FirestoreContext";

const TakeOrder = () => {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  const handleCategorie = async (catUid, catName) =>
    await filterProductByCategorie(catUid, catName);
  useEffect(() => {
    getProducts().then((products) => setProducts(products));
    getProductsCategories().then((category) => setProductCategories(category));
  }, []);

  const handleClick = ({ cat_uid, cat_name }) => {
    handleCategorie(cat_uid, cat_name).then((items) => {
      setProducts(items);
    });
  };
  return (
    <>
      <div className="categories-container">
        {productCategories.map((cat, i) => {
          return (
            <ButtonFilter
              item={cat.cat_name}
              uid={cat.cat_uid}
              icon={iconComponents[i]}
              key={cat.cat_uid}
              // cat = {objeto}
              // funcion 1
              //funcion 2
              onClick={() => {
                handleClick(cat);
              }}
            />
          );
        })}
      </div>
      <div className="products-container">
        {products.map((p) => {
          return <ProductCart product={p} />;
        })}
      </div>
    </>
  );
};

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
          {/* <h1>holddda</h1> */}
          {/* <Routes>
            <Route
              path="/chef/orders-delivered"
              render={() => <div>AAAAAAAAAAAAAAAAA</div>}
            />
            <Route path="/orders-delivered" render={() => <div>Home</div>} />
          </Routes> */}
          <TakeOrder />
        </div>
      </div>
    </>
  );
};

export default WaiterView;

// export const WaiterView = () => {
//   return (
//     <>
//       // <NavBarChef />
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
