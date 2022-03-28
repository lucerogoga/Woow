import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Assets/OrderCard.css";
import { pad } from "../helpers/mathFunctions";
import {
  updateOrder,
  updateStatusOrder,
  getUser,
} from "../Services/FirestoreServices";
import { useAuth } from "./Context/AuthContext";
import ActionButton from "./ActionButton";
import { useRol } from "./Context/RolContex";
import Time from "./Time";
import { createRows } from "../helpers/mathFunctions";
import TableCard from "./TableCard";
import { abbrevName, upperCaseFirstLetter } from "../helpers/nameFormatted";

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

  console.log("es posible?, ", orderData.order_status);
  // ! --------------------
  //GETTING NAME OF CHEF FOR THE ORDER
  useEffect(() => {
    async function settingUserName() {
      const { user_name } = await getUser(currentUser);
      setUserName(user_name);
    }
    settingUserName();
  }, []);
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
      console.log(userName);
      // Si el estado está en pendiente, el chef puede tomar el pedido y cambia su estado Cooking
      updateOrder(currentUser, orderData.id, "Cooking", userName);
    }
    if (orderData.order_status === "Cooking" && userRole === "chef") {
      // Si el estado está en Cooking, el chef cambia su estado a Ready to Serve
      updateStatusOrder(orderData.id, "Ready to Serve", userName);
      // ! FINALIZA EL CRONOMETRO
    }
  };

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
                {upperCaseFirstLetter(orderData.client_name)}
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
              {orderData.order_status !== "Canceled" && (
                <Time
                  start={orderData.order_timestamp_start}
                  end={orderData.order_timestamp_end}
                  status={orderData.order_status}
                />
              )}
              {/* <Time
                start={orderData.order_timestamp_start}
                end={orderData.order_timestamp_end}
                status={orderData.order_status}
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
              className="order-card__button"
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
                className="order-card__button"
              />
            ) : orderData.order_status === "Ready to Serve" ? (
              <ActionButton
                onClick={() => handleStatus()}
                title="Deliver Order"
                className="order-card__button"
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCardFormat;
