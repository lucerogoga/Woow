import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../Components/Context/CartContext";
import ProductAddedCart from "./ProductAddedCart";
import Title from "./Title";
import ActionButton from "../Components/ActionButton";
import { createOrder, getUser } from "../Services/FirestoreServices";
import Error from "./Error";
import { useAuth } from "./Context/AuthContext";
import InputInfoClient from "./InputInfoClient";
import "../Assets/Cart.css";
import formatNum from "format-num";
import Success from "./Successfull";

import { onSnapshot, collection } from "firebase/firestore";

import { db } from "../Config/initialize";
import TrashButton from "./Trash";

const Cart = ({ cantEdit, handleGoCart }) => {
  const [clientName, setClientName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [isInfoEmpty, setIsInfoEmpty] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [userName, setUserName] = useState("");

  const [load, setLoad] = useState(true);
  const [state, setState] = useState("none");

  const [isClean, setIsClean] = useState(false);

  const { cart, setCart } = useCart();
  const { user } = useAuth();
  const [orderCorrelative, setOrderCorrelative] = useState(0);

  useEffect(() => {
    async function settingUserName() {
      const { user_name } = await getUser(user.currentUser);
      setUserName(user_name);
    }
    settingUserName();
  }, [user]);

  useEffect(() => {
    const orderRef = collection(db, "orders");

    onSnapshot(orderRef, (snapshot) => {
      setOrderCorrelative(snapshot.size + 1);
    });
  }, [orderCorrelative]);

  // ! -------------------------------Sum of costs
  const itemsPrice = cart.reduce((a, b) => a + Number(b.totalCost), 0);
  const qtyItems = cart.reduce((a, b) => a + Number(b.qty), 0);

  const handleOrder = () => {
    setIsCartEmpty(false);
    setIsInfoEmpty(false);

    if (cart.length === 0) {
      return setIsCartEmpty(true);
    } else if (clientName === "" || tableNumber === "") {
      return setIsInfoEmpty(true);
    } else {
      setState("flex");
      setOrderNumber(orderNumber + 1);
      createOrder(
        user.currentUser,
        userName,
        clientName,
        tableNumber,
        "Pending",
        cart,
        orderCorrelative
      ).then(() => {
        setLoad(false);
      });
      setCart([]);
      setIsClean(true);
    }
  };

  const handleChange = (nameClient) => {
    setClientName(nameClient);
  };

  const handleChangeTable = (table) => {
    setTableNumber(table);
  };

  return (
    <>
      <div className="cart-content">
        <Title title="Order" quantity={qtyItems} />
        <div className="client-info--content">
          <InputInfoClient
            onChange={handleChange}
            setTable={handleChangeTable}
            cleanInfo={isClean} //empieza en false
          />
          <div width={30} onClick={() => setCart([])}>
            <TrashButton />
          </div>
        </div>
        {isInfoEmpty && (
          <Error
            message={"Fields must be filled"}
            onClose={(e) => setIsInfoEmpty(false)}
          />
        )}
        {isCartEmpty && (
          <Error
            message={"The cart must not be empty"}
            onClose={(e) => setIsCartEmpty(false)}
          />
        )}

        <div className="cart-product--content">
          <div className="cart-product--productContainer">
            <Success estado={state} loading={load} />

            {cart.map((cartProduct) => (
              <ProductAddedCart
                cantEdit={cantEdit}
                cartProduct={cartProduct}
                key={cartProduct.idProductCart}
              />
            ))}
          </div>
          <div className="footer-content">
            <div className="total-price">
              <h3>Total Cost</h3>
              <h3 className="total-price__price">
                {"$ " +
                  formatNum(itemsPrice, {
                    minFraction: 2,
                    maxFraction: 2,
                  })}
              </h3>
            </div>
            <div className="large-button--content" onClick={handleOrder}>
              <ActionButton title="Send to Chef" className={"button--pink"} />
            </div>
            <div className="large-button--content" onClick={handleGoCart}>
              <ActionButton
                title="Check my Cart"
                className={"button--white"}
              ></ActionButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
