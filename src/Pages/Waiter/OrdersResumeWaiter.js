import React, { useState, useEffect } from "react";
import "../../Assets/Navbar.css";
import "../../Assets/Sidebar.css";
import ButtonFilter from "../../Components/ButtonFilter";
import iconComponents from "../../Assets/CustomLogo";
import {
  getProducts,
  getProductsCategories,
  filterProductByCategorie,
} from "../../Components/Context/FirestoreServices";
import OrderCardFormat from "../../Components/OrderCardFormat";

const OrdersResumeWaiter = () => {
  const [productCategories, setProductCategories] = useState([]);
  const handleCategorie = async (catUid, catName) =>
    await filterProductByCategorie(catUid, catName);
  useEffect(() => {
    // getProducts().then((products) => setProducts(products));
    getProductsCategories().then((category) => setProductCategories(category));
  }, []);

  const handleClick = ({ cat_uid, cat_name }) => {
    handleCategorie(cat_uid, cat_name).then((items) => {
      // setProducts(items);
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
      <OrderCardFormat />
    </>
  );
};

export default OrdersResumeWaiter;
