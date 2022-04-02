import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Assets/OrderCard.css";
//Firebase Conection
import {
  updateOrder,
  updateStatusOrder,
  getUser,
} from "../Services/FirestoreServices";
//Contexts
import { useAuth } from "./Context/AuthContext";
import { useRol } from "./Context/RolContex";
//Components
import ActionButton from "./ActionButton";
import Time from "./Time";
import TableCard from "./TableCard";
//Helpers
import { createRows } from "../helpers/mathFunctions";
import { pad } from "../helpers/mathFunctions";
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

  //GETTING NAME OF CHEF FOR THE ORDER
  useEffect(() => {
    async function settingUserName() {
      const { user_name } = await getUser(currentUser);
      setUserName(user_name);
    }
    settingUserName();
  }, []);

  const handleStatus = () => {
    //CONDITIONS WAITER
    if (orderData.order_status === "Pending" && userRole === "waiter") {
      // If the status is pending being waiter , the waiter can cancel the order
      updateStatusOrder(orderData.id, "Canceled", userRole);
    }
    if (orderData.order_status === "Ready to Serve" && userRole === "waiter") {
      // If the status is ready to Serve, the waiter can mark the order as Delivered
      updateStatusOrder(orderData.id, "Delivered");
    }
    //CONDITIONS CHEF
    if (orderData.order_status === "Pending" && userRole === "chef") {
      // If the status is pending, the chef can take the order and changes his Cooking status
      updateOrder(currentUser, orderData.id, "Cooking", userName);
    }
    if (orderData.order_status === "Cooking" && userRole === "chef") {
      // If the status is Cooking, the chef changes his status to Ready to Serve
      updateStatusOrder(orderData.id, "Ready to Serve", userName);
    }
  };

  // ! ------------------------------------------------------------
  return (
    <div className="order-container">
      <div className="order-card">
        <div className="order-card__header">
          <div className="order-card__info-container">
            <div className="order-card__titles-container">
              <h3 className="order-card__info-title">Order N°:</h3>
              <h3 className="order-card__info-title">Client:</h3>
              <h3 className="order-card__info-title">Chef:</h3>
              <h3 className="order-card__info-title">Waiter:</h3>
              <h3 className="order-card__info-title">Table N°:</h3>
            </div>
            <div className="order-card__infos-container">
              <div className="order-card__info-p">
                {pad(orderData.order_number, 6)}
              </div>
              <div className="order-card__info-p">
                {upperCaseFirstLetter(orderData.client_name)}
              </div>
              <div className="order-card__info-p"> {abbrevName(chefId)}</div>
              <div className="order-card__info-p">
                {abbrevName(orderData.waiter_name)}
              </div>
              <div className="order-card__info-p">{orderData.table}</div>
            </div>
          </div>
          <div className="order-card__right-container">
            <div className="order-cart__containertime">
              {orderData.order_status !== "Canceled" && (
                <Time
                  start={orderData.order_timestamp_start}
                  end={orderData.order_timestamp_end}
                  status={orderData.order_status}
                />
              )}
            </div>
          </div>
        </div>
        <div className="order-card__table-container">
          <TableCard rows={rows} />
        </div>
        {pathname === "/waiter/orders-resume" && (
          <div
            onClick={() => handleStatus()}
            className="order-card__buttonsContainer"
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

        {pathname === "/chef" && (
          <div
            onClick={() => handleStatus()}
            className="order-card__buttonsContainer"
          >
            {orderData.order_status === "Pending" ? (
              <ActionButton
                onClick={() => handleStatus()}
                title="Start Cooking"
                className="order-card__button"
              />
            ) : orderData.order_status === "Cooking" ? (
              <ActionButton
                onClick={() => handleStatus()}
                title="Order Ready"
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
