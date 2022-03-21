import React, { useState, useContext, createContext } from "react";

const Cart = createContext();

const CartContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  return <Cart.Provider value={{ cart, setCart }}>{children}</Cart.Provider>;
};

export default CartContext;

export const useCart = () => useContext(Cart);
