import React, { useState, useEffect } from "react";
import "../../Assets/Navbar.css";
import "../../Assets/Sidebar.css";
import "../../Assets/WaiterView.css";
import ProductCart from "../../Components/ProductCard";
import ButtonFilter from "../../Components/ButtonFilter";
import iconOrderChefComponents from "../../Assets/CustomOrdersChef";
import Title from "../../Components/Title";
import OrderCardFormat from "../../Components/OrderCardFormat";

import {
  getProducts,
  getProductsCategories,
  filterProductByCategorie,
  getOrderStatus,
  getOrders,
} from "../../Components/Context/FirestoreServices";
import Search from "../../Components/Search";

export const OrdersToDoChef = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [ordersStatus, setOrdersStatus] = useState(["Todo", "Delivered"]);

  useEffect(() => {
    // getProducts().then((products) => setProducts(products));
    getOrders().then((order) => setOrders(order));
    // console.log(orders)
  }, []);

  
  return (
    <>
      <Search onChange={"algo"} placeholder={"Search N° Order"}></Search>
      <div className="categories-container">
        {ordersStatus.map((cat, i) => {
          return (
            <ButtonFilter
              item={cat}
              uid={cat.cat_uid}
              //   active={cat.cat_uid === selectedCategory}
              icon={iconOrderChefComponents[i]}
              key={cat.cat_uid}
              onClick={() => {
                // handleClick(cat);
              }}
            />
          );
        })}
      </div>
      <Title title="Orders To Do" quantity={orders.length} />
      <div>
        {orders.map((order) => (
          <OrderCardFormat orderData={order} />
        ))}
      </div>
    </>
  );
};

export default OrdersToDoChef;
