import React, { useState, useEffect } from "react";
import "../../Assets/Navbar.css";
import "../../Assets/Sidebar.css";
import "../../Assets/WaiterView.css";
import ProductCart from "../../Components/ProductCard";
import ButtonFilter from "../../Components/ButtonFilter";
import iconOrderChefComponents from "../../Assets/iconComponent/CustomOrdersChef";
import Title from "../../Components/Title";
import OrderCardFormat from "../../Components/OrderCardFormat";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../Config/initialize";

import {
  getProducts,
  getProductsCategories,
  filterProductByCategorie,
  getOrderStatus,
  getOrders,
  ordersListener,
  getUser,
} from "../../Services/FirestoreServices";
import Search from "../../Components/Search";
import { useAuth } from "../../Components/Context/AuthContext";

export const OrdersToDoChef = () => {
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState("");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("Pending");
  const [ordersStatus, setOrdersStatus] = useState([
    "Pending",
    "Cooking",
    "Delivered",
  ]);

  const {
    user: { currentUser },
  } = useAuth();

  const handleClick = (statusOrder) => {
    setSelectedOrderStatus(statusOrder);
  };

  useEffect(() => {
    // async function getUserFirestore() {
    //   const { user_name } = await getUser(currentUser);
    //   setUserName(user_name);
    // }
    const q = query(
      collection(db, "orders"),
      where("order_status", "==", selectedOrderStatus)
      // where("order_status", "==", "Pending")
      // orderBy("order_timestamp", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, [selectedOrderStatus]);

  console.log("quién está seleccionado?, ", selectedOrderStatus);
  console.log("orderStatus Array, ", ordersStatus);
  return (
    <>
      <Search onChange={"algo"} placeholder={"Search N° Order"}></Search>
      <div className="categories-container">
        {ordersStatus.map((cat, i) => {
          return (
            <ButtonFilter
              item={cat}
              uid={cat.cat_uid}
              active={cat === selectedOrderStatus}
              icon={iconOrderChefComponents[i]}
              key={cat.cat_uid}
              onClick={() => {
                handleClick(cat);
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
