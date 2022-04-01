import React, { useState, useEffect } from "react";
import "../Assets/Cart.css";
//Context
import { useAuth } from "./Context/AuthContext";
import { useCart } from "../Components/Context/CartContext";
//Components
import Title from "./Title";
import ProductAddedCart from "./ProductAddedCart";
import ActionButton from "../Components/ActionButton";
import Error from "./Error";
import Success from "./Successfull";
import InputInfoClient from "./InputInfoClient";
import TrashButton from "./Trash";
//Helpers
import formatNum from "format-num";
//Firebase Conection
import { createOrder, getUser } from "../Services/FirestoreServices";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../Config/initialize";

const Cart = ({ cantEdit, handleGoCart }) => {
  const [isInfoEmpty, setIsInfoEmpty] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [userName, setUserName] = useState("");
  //States for success message
  const [load, setLoad] = useState(true);
  const [state, setState] = useState("none");

  //States for error Message
  const [errorMessage, setErrorMessage] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const handleDisplayError = () => {
    setDisplayError(false);
  };
  // call the info from context Cart and Auth
  const {
    cart,
    setCart,
    clientName,
    setClientName,
    tableNumber,
    setTableNumber,
    isClean,
    setIsClean,
  } = useCart();
  const { user } = useAuth();

  //Setting the name of the Current User
  useEffect(() => {
    async function settingUserName() {
      const { user_name } = await getUser(user.currentUser);
      setUserName(user_name);
    }
    settingUserName();
  }, [user]);
  //We declare the Correlative Number od the Order
  const [orderCorrelative, setOrderCorrelative] = useState(0);
  useEffect(() => {
    const orderRef = collection(db, "orders");
    onSnapshot(orderRef, (snapshot) => {
      setOrderCorrelative(snapshot.size + 1);
    });
  }, [orderCorrelative]);

  //-------------------------------Sum of costs
  const itemsPrice = cart.reduce((a, b) => a + Number(b.totalCost), 0);
  const qtyItems = cart.reduce((a, b) => a + Number(b.qty), 0);

  const handleOrder = () => {
    setErrorMessage("");
    setDisplayError(false);
    // setIsCartEmpty(false);
    // setIsInfoEmpty(false);
    setTimeout(async () => {
      if (cart.length === 0) {
        setErrorMessage("The cart must not be empty");
        setDisplayError(true);
        return;
        // return setIsCartEmpty(true);
      } else if (clientName === "" || tableNumber === "") {
        setErrorMessage("Fields must be filled");
        setDisplayError(true);
        return;
        // return setIsInfoEmpty(true);
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
    }, 200);
  };

  const cleanInputs = () => {
    setTableNumber("");
    setClientName("");
    setCart([]);
  };

  return (
    <>
      <Error
        message={errorMessage}
        onClose={handleDisplayError}
        isVisible={displayError}
      />
      <div className="cart-content">
        <Title title="Order" quantity={qtyItems} />
        <div className="client-info--content">
          <InputInfoClient />
          <div width={30} onClick={cleanInputs}>
            <TrashButton />
          </div>
        </div>
        {/* {isInfoEmpty && (
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
        )} */}

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
            <div className="large-button__content" onClick={handleOrder}>
              <ActionButton title="Send to Chef" className={"button--pink"} />
            </div>
            <div
              className="large-button__content--white"
              onClick={handleGoCart}
            >
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
