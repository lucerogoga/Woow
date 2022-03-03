import React from "react";
import { useCart } from "../Components/Context/CartContext";
import ProductAddedCart from "./ProductAddedCart";
import Title from "./Title";

const Cart = () => {
  const { cart } = useCart();
  console.log(cart);

  return (
    <>
      <Title title="Order" quantity={cart.length} />
      <div>
        {cart.map((p) => (
          <ProductAddedCart product={p} />
        ))}
      </div>
    </>
  );
};

export default Cart;
