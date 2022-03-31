import React, { useState, useEffect } from "react";
import "../../Assets/Navbar.css";
import "../../Assets/Sidebar.css";
import "../../Assets/WaiterView.css";
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
import Search from "../../Components/Search";
import { useAuth } from "../../Components/Context/AuthContext";

export const OrdersToDoChef = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [quantityByStatus, setQuantityByStatus] = useState("");
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
    let q;
    if (
      selectedOrderStatus === "Cooking" ||
      selectedOrderStatus === "Delivered"
    ) {
      q = query(
        collection(db, "orders"),
        where("order_status", "==", selectedOrderStatus),
        where("chef_id", "==", currentUser),
        orderBy("order_timestamp", "desc")
      );
    }

    if (selectedOrderStatus === "Pending") {
      q = query(
        collection(db, "orders"),
        where("order_status", "==", selectedOrderStatus),
        orderBy("order_timestamp", "desc")
      );
    }
    // }

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
    // const arrayOfOrdersByStatus = ordersStatus.map((elem) =>
    //   allOrders.filter((doc) => doc.order_status === elem)
    // );

    // En mesero solo puede ver sus ordenes en cualqiuirea  de los estados   y el otro que sirve
    // En chef cuando esté en estado coocking - ready y deliver (que tenga id de chef)

    const arrayOfPendingOrders = allOrders.filter(
      (doc) => doc.order_status === "Pending"
    ).length;

    const arrayOfOrdersByIdChef = allOrders.filter(
      (doc) => doc.chef_id === currentUser
    );

    const arrayOfCookingOrders = arrayOfOrdersByIdChef.filter(
      (doc) => doc.order_status === "Cooking"
    ).length;

    const arrayOfDeliveredOrders = arrayOfOrdersByIdChef.filter(
      (doc) => doc.order_status === "Delivered"
    ).length;

    // return arrayOfOrdersByStatus.map((elem) => elem.length);
    return [arrayOfPendingOrders, arrayOfCookingOrders, arrayOfDeliveredOrders];
  };
  const QuantityForTtitle = (elem) => {
    const arrayOfOrdersByStatus = allOrders.filter(
      (doc) => doc.order_status === elem
    );
    // setQuantityByStatus(arrayOfOrdersByStatus.length);
    return arrayOfOrdersByStatus.length;
  };
  const filteredOrdersQuantity = filterOrders();
  const QuantifiedForTitle = QuantityForTtitle(selectedOrderStatus);

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
              filteredOrdersQuantity={filteredOrdersQuantity[i]}
            />
          );
        })}
      </div>
      <Title
        title={`Orders ${selectedOrderStatus}`}
        // quantity={QuantifiedForTitle}
        quantity={orders.length}
      />
      <div>
        {orders.map((order) => (
          <OrderCardFormat key={order.id} orderData={order} />
        ))}
      </div>
    </>
  );
};

export default OrdersToDoChef;
