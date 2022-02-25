import React from "react";
import ProductCart from "./ProductCard";
import ButtonFilter from "./ButtonFilter";
import iconComponents from "../Assets/CustomLogo";
import { useEffect, useState } from "react";
import "../Assets/Home.css";
import { useAuth } from "./Context/AuthContext";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { ReactComponent as Salad } from "../Assets/icons/salad.svg";
// import { ReactComponent as ShoppingCart } from "../Assets/icons/shopping-cart.svg";
// import { ReactComponent as Waiter } from "../Assets/icons/waiter.svg";
import { ReactComponent as Chef } from "../Assets/icons/chef-hat.svg";

import {
  getProducts,
  getProductsCategories,
  filterProductByCategorie,
} from "./Context/FirestoreContext";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const { user, logout } = useAuth();

  console.log("estamos en el HOME, ", user);
  const handleLogout = async () => {
    await logout();
  };
  const handleCategorie = async (catUid, catName) =>
    await filterProductByCategorie(catUid, catName);
  useEffect(() => {
    getProducts().then((products) => setProducts(products));
    getProductsCategories().then((category) => setProductCategories(category));
  }, []);

  const handleClick = ({ cat_uid, cat_name }) => {
    // console.log("consoleateeeeeeeee", e);
    handleCategorie(cat_uid, cat_name).then((items) => {
      setProducts(items);
    });
  };
  return (
    <>
      <NavBar rol="chef">
        {/* <NavItem icon={<Salad />} path="/pancito" /> */}
        <NavItem path="/">Take Order</NavItem>
        <NavItem path="/orders-resume">Orders Resume</NavItem>
      </NavBar>

      <h1>{user.uid}</h1>
      <button onClick={handleLogout}>logout</button>

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

export default Home;

// <NavBar>
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
//       </NavBar>
