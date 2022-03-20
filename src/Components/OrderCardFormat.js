import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Assets/OrderCard.css";
import Grid from "@mui/material/Grid";
import { pad } from "../helpers/mathFunctions";
import { updateOrder, updateStatusOrder } from "../Services/FirestoreServices";
import { useAuth } from "./Context/AuthContext";
import { getUser } from "../Services/FirestoreServices";
import ActionButton from "./ActionButton";
import { useRol } from "./Context/RolContex";
import Time from "./Time";
import { createRows } from "../helpers/mathFunctions";
import TableCard from "./TableCard";
import { abbrevName, UpperCaseName } from "../helpers/nameFormatted";
import { serverTimestamp } from "firebase/firestore";

const OrderCardFormat = ({ orderData }) => {
  const [userName, setUserName] = useState("");
  let location = useLocation();
  const { pathname } = location;
  const userRole = useRol();
  const {
    user: { currentUser },
  } = useAuth();

  const rows = createRows(orderData);

  // Getting chef_id
  let chefId;
  !orderData.chef_name
    ? (chefId = "Not assigned")
    : (chefId = orderData.chef_name);

  // ! --------------------

  const handleStatus = () => {
    console.log("click hola!!");
    //CONDITIONS WAITER
    if (orderData.order_status === "Pending" && userRole === "waiter") {
      // Si el estado está en pendiente siendo waiter , puede cancelar la orden
      // updateStatusOrder(orderData.id, "Canceled");
      console.log("deberia poder cancelar");
      updateStatusOrder(orderData.id, "Canceled", userRole);
    }
    if (orderData.order_status === "Ready to Serve" && userRole === "waiter") {
      console.log("Ready to Serve && waiter");
      // Si el estado está en ready to Serve, el waiter puede marcar la orden como Delivered
      updateStatusOrder(orderData.id, "Delivered");
    }
    //CONDITIONS CHEF
    if (orderData.order_status === "Pending" && userRole === "chef") {
      // ! EMPIEZA EL CRONOMETRO CUANDO HAYA EMPEZADO.
      // Si el estado está en pendiente, el chef puede tomar el pedido y cambia su estado Cooking
      updateOrder(currentUser, orderData.id, "Cooking", userName);
    }
    if (orderData.order_status === "Cooking" && userRole === "chef") {
      // Si el estado está en Cooking, el chef cambia su estado a Ready to Serve
      updateStatusOrder(orderData.id, "Ready to Serve", userName);
      // ! FINALIZA EL CRONOMETRO
    }
  };

  //GETTING NAME OF CHEF FOR THE ORDER
  // useEffect(() => {
  //   async function settingUserName() {
  //     const { user_name } = await getUser(currentUser);
  //     setUserName(user_name);
  //   }
  //   settingUserName();
  // }, []);

  // console.log("ESTE ES MI ORDER STATUS", orderData.order_status);
  // console.log("ORDER TIME START", orderData.order_timestamp);
  // console.log("ORDER TIME START AHORA", orderData.order_timestamp.toDate());
  // ! ------------------------------------------------------------
  const [ayudaTime, setAyudaTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });

  // ! ------------------------------------------------------------
  return (
    <div className="order-container">
      <div className="order-card">
        <div className="order-card--header">
          <div className="order-card--info-container">
            <div className="order-card--titles-container">
              <h3 className="order-card--info-title">Order N°:</h3>
              <h3 className="order-card--info-title">Client:</h3>
              <h3 className="order-card--info-title">Chef:</h3>
              <h3 className="order-card--info-title">Waiter:</h3>
              <h3 className="order-card--info-title">Table N°:</h3>
            </div>
            <div className="order-card--infos-container">
              <div className="order-card--info-p">
                {pad(orderData.order_number, 6)}
              </div>
              <div className="order-card--info-p">
                {UpperCaseName(orderData.client_name)}
              </div>
              <div className="order-card--info-p">{chefId}</div>
              <div className="order-card--info-p">
                {abbrevName(orderData.waiter_name)}
              </div>
              <div className="order-card--info-p">{orderData.table}</div>
            </div>
          </div>
          <div className="order-card--right-container">
            <div className="order-cart--containertime">
              {/* <Time
                start={orderData.order_timestamp_start}
                end={orderData.order_timestamp_end}
              /> */}
            </div>
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
