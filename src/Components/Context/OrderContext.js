import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { getProducts } from "../../Components/Context/FirestoreServices";

const CartContext = createContext();

export const CartState = () => useContext(CartContext);
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD-TO-CARD":
      return {
        ...state,
        cart: [...state.products, ...action.payload],
      };
    default:
      return state;
  }
};

// export const OrderContext = ({ children }) => {
//   const products = [
//     { a: "si", b: "no" },
//     { a: "si", b: "no" },
//     { a: "si", b: "no" },
//   ];

//   const [state, dispatch] = useReducer(cartReducer, {
//     products: products,
//     cart: [],
//   });

//   return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
// };
export const OrderContext = ({ children }) => {
  const [productsContext, setProductsContext] = useState([]);

  useEffect(() => {
    getProducts().then((products) => setProductsContext(products));
  }, []);
  // const handleSearch = async () => {
  //   const products = await getProducts();
  //   setProductsContext(products);
  // };

  // handleSearch();

  const [state, dispatch] = useReducer(cartReducer, {
    productsContext,
    cart: [],
  });

  console.log("mi state está ok? ", productsContext);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
