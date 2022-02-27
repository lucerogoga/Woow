import React from "react";
// import ProductCart from "./ProductCard";
// import ButtonFilter from "./ButtonFilter";
// import iconComponents from "../Assets/CustomLogo";
// import { useEffect, useState } from "react";
// import "../Assets/ChefView.css";
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
import { NavBarChef, SideBar } from "./NavBarChef";
// !-----------------------------------

// import {
//   getProducts,
//   getProductsCategories,
//   filterProductByCategorie,
// } from "./Context/FirestoreContext";

export const ChefView = () => {
  return (
    <>
      <NavBarChef />
      <SideBar />
    </>
  );
};

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
// export const ChefView = () => {
//   const [products, setProducts] = useState([]);
//   const [productCategories, setProductCategories] = useState([]);
//   const { user, logout } = useAuth();

//   console.log("estamos en el ChefView, ", user);
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
//       <NavBar2 />

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

export default ChefView;
