import React, { useState, useEffect } from "react";
import { useCart } from "../Components/Context/CartContext";
import ProductAddedCart from "./ProductAddedCart";
import Title from "./Title";
import ActionButton from "../Components/ActionButton";
import ControlledOpenSelect from "./SelectTable";
import {
  createOrder,
  getOrderNumberCorrelative,
  getUser,
} from "../Services/FirestoreServices";
import Error from "./Error";
import { useAuth } from "./Context/AuthContext";
import InputInfoClient from "./InputInfoClient";
import "../Assets/Cart.css";
// ! ----
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  orderRef,
  documentSnapshots,
} from "firebase/firestore";
import { db } from "../Config/initialize";

const Cart = ({ cantEdit }) => {
  const [clientName, setClientName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [isInfoEmpty, setIsInfoEmpty] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [userName, setUserName] = useState("");
  const [closeX, setCloseX] = useState(false);

  const [isClean, setIsClean] = useState(false);

  const { cart, setCart } = useCart();
  const { user } = useAuth();

  // ! --------
  const [orderCorrelative, setOrderCorrelative] = useState(0);

  useEffect(() => {
    async function settingUserName() {
      const { user_name } = await getUser(user.currentUser);
      setUserName(user_name);
    }
    settingUserName();
  }, []);

  useEffect(() => {
    const orderRef = collection(db, "orders");

    onSnapshot(orderRef, (snapshot) => {
      setOrderCorrelative(snapshot.size + 1);
    });
  }, [orderCorrelative]);

  // ! -------------------------------

  console.log("MI CLIENTE ES , ", clientName);
  console.log("MI MESA ES , ", tableNumber);
  console.log("EL WAITER ES, ", userName);
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
      setOrderNumber(orderNumber + 1);
      createOrder(
        user.currentUser,
        userName,
        clientName,
        tableNumber,
        "Pending",
        cart,
        orderCorrelative
      );
      // createOrder(user.currentUser, clientName, tableNumber, "Pending", cart);
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
        </div>
        {/* <div className="client-err-container"> */}
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
        {/* </div> */}
        <div className="cart-product--content">
          {/* </div> */}
          <div className="cart-product--productContainer">
            <div></div>
            {cart.map((cartProduct) => (
              <ProductAddedCart
                cantEdit={cantEdit}
                cartProduct={cartProduct}
                key={cartProduct.idProductCart}
              />
            ))}
          </div>
          <div className="footer-content">
            <div className="price-content">
              <h3>Total Cost</h3>
              {/* <h3 className="price-total-cost">$ {"prueba"}</h3> */}
              <h3 className="price-total-cost">$ {itemsPrice}</h3>
            </div>
            <div className="large-button--content" onClick={handleOrder}>
              <ActionButton title="Send to Chef" className={"pink-button"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
