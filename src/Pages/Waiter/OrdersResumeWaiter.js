import React, { useState, useEffect } from "react";
import "../../Assets/Navbar.css";
import "../../Assets/Sidebar.css";
import ButtonFilter from "../../Components/ButtonFilter";
import { v4 as uuidv4 } from "uuid";
import OrderCardFormat from "../../Components/OrderCardFormat";
import iconOrderComponents from "../../Assets/iconComponent/CustomLogoOrders";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "../../Components/Context/AuthContext";
import { db } from "../../Config/initialize";

const OrdersResumeWaiter = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [productOrderCategories, setProductOrderCategories] = useState([
    "Pending",
    "Cooking",
    "Ready to Serve",
    "Delivered",
    "Canceled",
  ]);
  const [orders, setOrders] = useState([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("Pending");

  // const handleCategorie = async (catUid, catName) =>
  //   await filterProductByCategorie(catUid, catName);

  const {
    user: { currentUser },
  } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("order_status", "==", selectedOrderStatus),
      where("waiter_id", "==", currentUser),
      orderBy("order_timestamp", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, [selectedOrderStatus, currentUser]);

  //!---------------------traer canticadad de cada orden ----
  useEffect(() => {
    const q = query(collection(db, "orders"));
    return onSnapshot(q, (snapshot) => {
      setAllOrders(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const filterOrders = () => {
    const arrayOfOrdersByStatus = productOrderCategories.map((elem) =>
      allOrders.filter((doc) => doc.order_status === elem)
    );
    return arrayOfOrdersByStatus.map((elem) => elem.length);
  };

  const filteredOrdersQuantity = filterOrders();

  const handleClick = (cat) => {
    setSelectedOrderStatus(cat);
  };
  console.log("all orders ", allOrders);
  return (
    <>
      <div className="categories-container">
        {productOrderCategories.map((cat, i) => {
          return (
            <ButtonFilter
              item={cat}
              icon={iconOrderComponents[i]}
              key={uuidv4()}
              active={cat === selectedOrderStatus}
              onClick={() => {
                handleClick(cat);
              }}
              orders={orders}
              filteredOrdersQuantity={filteredOrdersQuantity[i]}
            />
          );
        })}
      </div>

      <div>
        {orders.map((order) => (
          <OrderCardFormat orderData={order} />
        ))}
      </div>
    </>
  );
};

export default OrdersResumeWaiter;
