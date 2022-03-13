import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Assets/OrderCard.css";
import { updateOrder } from "../Services/FirestoreServices";
import { useAuth } from "./Context/AuthContext";
import { getUser } from "../Services/FirestoreServices";
// import { getUser, serverTimestamp } from "../Services/FirestoreServices";
import ActionButton from "./ActionButton";
import { useRol } from "./Context/RolContex";
import Time from "./Time";
import { createRows } from "../helpers/mathFunctions";
import TableCard from "./TableCard";

const OrderCardFormat = ({ orderData }) => {
  const [userName, setUserName] = useState("");

  const userRole = useRol();
  const {
    user: { currentUser },
  } = useAuth();

  const rows = createRows(orderData);

  let chefId;

  !orderData.chef_name
    ? (chefId = "Not assigned")
    : (chefId = orderData.chef_name);
  let location = useLocation();
  const { pathname } = location;

  // ! --------------------

  const handleStatus = (orderStatus) => {
    console.log("mi estado actual", orderData.order_status);
    console.log("el que quiero colocar", orderStatus);

    if (orderData.order_status === "Pending" && userRole === "waiter") {
      // ! EMPIEZA EL CRONOMETRO CUANDO HAYA EMPEZADO.
      console.log("Pending && waiter");
      // Si el estado está en pendiente, lo cambia a cooking
      updateOrder(currentUser, orderData.id, "Canceled", userName);
    }
    if (orderData.order_status === "Ready to Serve" && userRole === "waiter") {
      // ! EMPIEZA EL CRONOMETRO CUANDO HAYA EMPEZADO.
      console.log("Ready to Serve && waiter");
      // Si el estado está en pendiente, lo cambia a cooking
      updateOrder(currentUser, orderData.id, "Delivered", userName);
    }
    if (orderData.order_status === "Pending" && userRole === "chef") {
      console.log("Pending && chef");
      // ! EMPIEZA EL CRONOMETRO CUANDO HAYA EMPEZADO.
      // Si el estado está en pendiente, lo cambia a cooking
      updateOrder(currentUser, orderData.id, "Cooking", userName);
    }
    if (orderData.order_status === "Cooking" && userRole === "chef") {
      console.log("Cooking && chef");
      updateOrder(currentUser, orderData.id, "Ready to Serve", userName);
      // ! FINALIZA EL CRONOMETRO
    }
  };

  useEffect(() => {
    async function settingUserName() {
      const { user_name } = await getUser(currentUser);
      setUserName(user_name);
    }

    settingUserName();
  }, []);

  // console.log("ESTE ES MI ORDER STATUS", orderData.order_status);
  // console.log("ORDER TIME START", orderData.order_timestamp);
  // console.log("ORDER TIME START AHORA", orderData.order_timestamp.toDate());
  console.log("funcionan los rows?? , ", rows);
  console.log("AQUI");
  // ! --------------------

  return (
    <div className="products-container">
      <div className="order-card">
        <div className="order-card--header">
          <div className="order-card--info-container">
            <div className="order-card--titles-container">
              <h3 className="order-card--info-title">Order N°:</h3>
              <h3 className="order-card--info-title">Client:</h3>
              <h3 className="order-card--info-title">Chef:</h3>
              <h3 className="order-card--info-title">Table N°:</h3>
            </div>
            <div className="order-card--infos-container">
              <div className="order-card--info-p">000036</div>
              <div className="order-card--info-p">{orderData.client_name}</div>
              <div className="order-card--info-p">{chefId}</div>
              <div className="order-card--info-p">{orderData.table}</div>
            </div>
          </div>
          <div className="order-card--right-container">
            <div className="order-cart--containertime">
              {/* <Clock className="order-cart--clock" width={16} height={16} /> */}
              <h3 className="order-cart--minutes">00:30:00</h3>
            </div>
            {/* <Time start={orderData.order_timestamp} /> */}
          </div>
        </div>
        <div className="order-card--table-container">
          <TableCard rows={rows} />
        </div>

        {pathname === "/chef" && (
          <div className="order-card--buttonsContainer">
            <button
              onClick={() => handleStatus()}
              className="order-card--button--cooking"
            >
              {orderData.order_status === "Pending"
                ? "Start Cooking"
                : "Order Ready"}
            </button>
          </div>
        )}

        {pathname === "/waiter/orders-resume" && (
          <div
            onClick={() => handleStatus()}
            className="order-card--buttonsContainer"
          >
            {orderData.order_status === "Pending" ? (
              <ActionButton
                onClick={() => handleStatus()}
                title="Cancel Order"
                className="order-card--button--cooking"
              />
            ) : orderData.order_status === "Ready to Serve" ? (
              <ActionButton
                onClick={() => handleStatus()}
                title="Deliver Order"
                className="order-card--button--cooking"
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCardFormat;
