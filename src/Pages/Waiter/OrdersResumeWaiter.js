import React, { useState, useEffect } from "react";
import "../../Assets/Navbar.css";
import "../../Assets/Sidebar.css";
import ButtonFilter from "../../Components/ButtonFilter";
import iconComponents from "../../Assets/CustomLogo";
import { v4 as uuidv4 } from "uuid";
import {
  getProducts,
  getProductsCategories,
  filterProductByCategorie,
  getOrderStatus,
  getOrders,
} from "../../Components/Context/FirestoreServices";
import OrderCardFormat from "../../Components/OrderCardFormat";
import iconOrderComponents from "../../Assets/CustomLogoOrders";

const OrdersResumeWaiter = () => {
  const [productOrderCategories, setProductOrderCategories] = useState([
    "Waiting",
    "Cooking",
    "Ready to Serve",
    "Delivered",
    "Canceled",
  ]);
  const [orders, setOrders] = useState([]);
  
  const handleCategorie = async (catUid, catName) =>
    await filterProductByCategorie(catUid, catName);
  useEffect(() => {
    // getProducts().then((products) => setProducts(products));
    getOrders().then((order) => setOrders(order));
  }, []);

  const handleClick = ({ cat_uid, cat_name }) => {
    handleCategorie(cat_uid, cat_name).then((items) => {
      // setProducts(items);
    });
  };

  return (
    <>
      <div className="categories-container">
        {productOrderCategories.map((cat, i) => {
          return (
            <ButtonFilter
              item={cat}
              icon={iconOrderComponents[i]}
              key={uuidv4()}
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

      <div>
        {orders.map((order) => (
          <OrderCardFormat orderData = {order}/>
        ))}
      </div>
    </>
  );
};


export default OrdersResumeWaiter;
