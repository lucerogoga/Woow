import React, { useState, useContext, createContext } from "react";

const Cart = createContext();

const CartContext = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [idDetail, setIdDetail] = useState(1);
  // const [state, dispatch] = useReducer(cartReducer, { count: cartProduct.qty });

  // const AddProductToCart = (cartProduct,cart) => {
  //     const exist = cart.find((x) => x.idChanges);
  //     setCart(
  //       cart.map((x) =>
  //         x.idChanges === cartProduct.idChanges
  //           ? {
  //               ...exist,
  //               qty: state.count + 1,
  //               totalCost: cartProduct.unitCost * (state.count + 1),
  //             }
  //           : x
  //       )
  //     );
  // }

  return (
    <Cart.Provider value={{ cart, setCart, idDetail, setIdDetail }}>
      {children}
    </Cart.Provider>
  );
};

export default CartContext;

export const useCart = () => useContext(Cart);
