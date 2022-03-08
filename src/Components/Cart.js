import React, { useState } from "react";
import { useCart } from "../Components/Context/CartContext";
import ProductAddedCart from "./ProductAddedCart";
import Title from "./Title";
import ActionButton from "../Components/ActionButton";
import ControlledOpenSelect from "./SelectTable";
import { createOrder } from "./Context/FirestoreServices";
import Error from "./Error";
import { useAuth } from "./Context/AuthContext";
// import {makeStyles} from ""

import "../Assets/Cart.css";

const Cart = ({ cantEdit }) => {
  const [clientName, setClientName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [isInfoEmpty, setIsInfoEmpty] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [closeX, setCloseX] = useState(false);

  const { cart, setCart } = useCart();
  const { user } = useAuth();

  console.log("MI MESA ES , ", tableNumber);
  const itemsPrice = cart.reduce((a, b) => a + Number(b.totalCost), 0);
  const qtyItems = cart.reduce((a, b) => a + Number(b.qty), 0);
  console.log("carrito actual", cart);
  const handleOrder = () => {
    setIsCartEmpty(false);
    setIsInfoEmpty(false);
    if (cart.length === 0) {
      return setIsCartEmpty(true);
    } else if (clientName === "" || tableNumber === "") {
      return setIsInfoEmpty(true);
    } else {
      setOrderNumber(orderNumber + 1);
      createOrder(user.currentUser, clientName, tableNumber, "Waiting", cart);
      setCart([]);
    }
  };

  return (
    <>
      <div className="cart-content">
        <Title title="Order" quantity={qtyItems} />
        <div className="client-info--content">
          <input
            type="text"
            id="client"
            className="client--input"
            placeholder="Client Name"
            onChange={(ev) => setClientName(ev.target.value)}
          ></input>
          <select
            className="table--input"
            placeholder="Nº Table"
            name="Nº Table"
            id="table"
            onChange={(ev) => setTableNumber(ev.target.value)}
          >
            <option value="Table 1">Table 1</option>
            <option value="Table 2">Table 2</option>
            <option value="Table 3">Table 3</option>
          </select>

          {/* <ControlledOpenSelect
            getTable={(tableNumber) => setTableNumber(tableNumber)}
          /> */}
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
