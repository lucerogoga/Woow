import React from "react";
import { useCart } from "../Components/Context/CartContext";
import ProductAddedCart from "./ProductAddedCart";

const Cart = () => {
  const { cart } = useCart();
  console.log(cart);

  return cart.map(product => <ProductAddedCart product={product}/>)
  
};

export default Cart;
