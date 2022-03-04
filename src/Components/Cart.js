import React, { useState } from "react";
import { useCart } from "../Components/Context/CartContext";
import ProductAddedCart from "./ProductAddedCart";
import Title from "./Title";

const Cart = () => {
  const [clientName, setClientName] = useState("");
  const [mesaNumber, setMesaNumber] = useState("");
  const { cart } = useCart();
  console.log(cart);

  return (
    <>
      <Title title="Order" quantity={cart.length} />
      <input
        id="client"
        className="client--input"
        placeholder="Client Name"
        onChange={(ev) => setClientName(ev.target.value)}
      ></input>
      <div>
        {cart.map((cartProduct) => (
          <ProductAddedCart
            cartProduct={cartProduct}
            key={cartProduct.idChanges}
          />
        ))}
      </div>
    </>
  );
};

export default Cart;
