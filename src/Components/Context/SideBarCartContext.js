import React, { useState, useContext, createContext } from "react";

const SideBarCart = createContext();

const SideBarCartContext = ({ children }) => {
  const [openCart, setOpenCart] = useState(false);
  return (
    <SideBarCart.Provider value={{ openCart, setOpenCart }}>
      {children}
    </SideBarCart.Provider>
  );
};

export default SideBarCartContext;

export const useSideBarCart = () => useContext(SideBarCart);
