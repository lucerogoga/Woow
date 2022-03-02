import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { getProducts } from "../../Components/Context/FirestoreServices";

const Cart = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const OrderContext = ({ children }) => {
  const products = [
    { a: "si", b: "no" },
    { a: "si", b: "no" },
    { a: "si", b: "no" },
  ];

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
};
// export const OrderContext = ({ children }) => {
//   const [productsContext, setProducts] = useState([]);

//   useEffect(() => {
//     getProducts().then((productsContextFirestore) =>
//       setProducts(productsContextFirestore)
//     );
//   }, []);

//     const prueba = [
//       { a: "si", b: "no" },
//       { a: "si", b: "no" },
//       { a: "si", b: "no" },
//     ];

//   //   useEffect(() => {
//   //     setProducts(prueba);
//   //   }, []);

//   console.log("seteando234, ", productsContext);

//   const [state, dispatch] = useReducer(cartReducer, {
//     productsContext,
//     cart: [],
//   });

//   console.log("mi state está ok? ", state);
//     // console.log("pruebefldskfjdslñkj , ", prueba);
//   //   return <Cart.Provider value={{ state, dispatch }}></Cart.Provider>;
//   //   return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
// //   <Cart.Provider value={{ state, dispatch, productsContext }}>
//   return (
//     <Cart.Provider value={{ state, dispatch, productsContext }}>
//       {children}
//     </Cart.Provider>
//   );
// };

// export default OrderContext;

export const CartState = () => {
  return useContext(Cart);
};
