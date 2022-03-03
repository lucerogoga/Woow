import React from "react";
import { useCart } from "../Components/Context/CartContext";

const Cart = () => {
  const { cart } = useCart();
  console.log(cart);
  return <h1>Hola Cart</h1>;
};

export default Cart;
