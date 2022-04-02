import React, { useState, useContext, createContext, useEffect } from "react";

const Cart = createContext();

const CartContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [clientName, setClientName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [isClean, setIsClean] = useState(false);

  useEffect(() => {}, [tableNumber, clientName, isClean]);

  useEffect(() => {
    if (isClean) {
      setTableNumber("");
      setClientName("");
    }
  }, [isClean]);

  return (
    <Cart.Provider
      value={{
        cart,
        setCart,
        clientName,
        setClientName,
        tableNumber,
        setTableNumber,
        isClean,
        setIsClean,
      }}
    >
      {children}
    </Cart.Provider>
  );
};

export default CartContext;

export const useCart = () => useContext(Cart);
