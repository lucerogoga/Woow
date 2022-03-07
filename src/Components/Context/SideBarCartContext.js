import React, { useState, useContext, createContext } from "react";

const SideBarCart = createContext();

const SideBarCartContext = ({ children }) => {
  const [isSideBarCartOpen, setIsSideBarCartOpen] = useState(false);
  return (
    <SideBarCart.Provider value={{ isSideBarCartOpen, setIsSideBarCartOpen }}>
      {children}
    </SideBarCart.Provider>
  );
};

export default SideBarCartContext;

export const useSideBarCart = () => useContext(SideBarCart);
