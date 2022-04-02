import React, { useState, useEffect } from "react";

import { useCart } from "../../Components/Context/CartContext";
import { useAuth } from "../../Components/Context/AuthContext";

import Title from "../../Components/Title";
import ProductAddedCart from "../../Components/ProductAddedCart";
import InputInfoClient from "../../Components/InputInfoClient";
import ActionButton from "../../Components/ActionButton";
import Error from "../../Components/Error";
import "../../Assets/Cart.css";
import formatNum from "format-num";
import Success from "../../Components/Successfull";

import "../../Assets/OrderCart.css";

import { db } from "../../Config/initialize";
import { onSnapshot, collection } from "firebase/firestore";
import { createOrder, getUser } from "../../Services/FirestoreServices";
import TrashButton from "../../Components/Trash";

const OrderCart = ({ cantEdit }) => {
  const [isInfoEmpty, setIsInfoEmpty] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [userName, setUserName] = useState("");
  //--------states for success message
  const [load, setLoad] = useState(true);
  const [state, setState] = useState("none");
  //------------set Number of the orders for a better Secuency of orders
  const [orderCorrelative, setOrderCorrelative] = useState(0);

  //we call the contex of our cart
  const {
    cart,
    setCart,
    clientName,
    setClientName,
    tableNumber,
    setTableNumber,
    setIsClean,
  } = useCart();

  const { user } = useAuth();

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

  //-------------------------------Sum of costs of all products
  const itemsPrice = cart.reduce((a, b) => a + Number(b.totalCost), 0);
  //-------------------------------Sum of products in the cart
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

  const cleanInputs = () => {
    setTableNumber("");
    setClientName("");
    setCart([]);
  };

  return (
    <>
      <div className="cart-content">
        <Title title="My Cart (Products)" quantity={qtyItems} />
        <div className="client-info--content">
          <InputInfoClient />
          <div width={30} onClick={cleanInputs}>
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

        <div className="cart-product__content order-cart">
          <div className="cart-product__product-container order-cart">
            <Success estado={state} loading={load} />

            {cart.map((cartProduct) => (
              <ProductAddedCart
                cantEdit={cantEdit}
                cartProduct={cartProduct}
                key={cartProduct.idProductCart}
              />
            ))}
          </div>
          <div className="footer-content order-cart">
            <div className="total-price order-cart">
              <div className="total-cost__header">
                <h3>Resume Order</h3>
              </div>
              <div className="info-order__container">
                <div className="info-order__item">
                  <h3>Client: </h3>
                  <p className="info-order__text--name">{clientName}</p>
                </div>
                <div className="info-order__item">
                  <h3>Table: </h3>
                  <p>{tableNumber}</p>
                </div>
                <div className="info-order__item">
                  <h3>Products (qty):</h3>
                  <p>{qtyItems}</p>
                </div>
              </div>
              <div className="total-cost__container">
                <h3>Total Cost</h3>
                <h3 className="total-price__price">
                  {"$ " +
                    formatNum(itemsPrice, {
                      minFraction: 2,
                      maxFraction: 2,
                    })}
                </h3>
              </div>
            </div>
            <div className="large-button__content" onClick={handleOrder}>
              <ActionButton title="Send to Chef" className={"button--pink"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCart;
