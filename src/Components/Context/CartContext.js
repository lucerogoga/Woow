import React,{useState, useContext, createContext} from "react"

const Cart = createContext();

const CartContext = ({children}) => {

    const [cart, setCart ] = useState([]);
    const [idDetail, setIdDetail] = useState(1);
    return <Cart.Provider value={{cart, setCart, idDetail, setIdDetail}}>{children}</Cart.Provider>
} 

export default CartContext

export const useCart = () => useContext(Cart);