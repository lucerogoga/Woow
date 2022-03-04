import React, { useState, useReducer } from "react";
import "../Assets/ProductAddedCart.css";
import { ReactComponent as More } from "../Assets/icons/more.svg";
import { ReactComponent as Eye } from "../Assets/icons/eye.svg";
import { ReactComponent as X } from "../Assets/icons/x.svg";
import { ReactComponent as Pencil } from "../Assets/icons/pencil.svg";

// import { iconMore } from "../Assets/icons/more.svg";
import { app } from "../Config/initialize.js";
// import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// !PRUEBA ----------------
import { useCart } from "../Components/Context/CartContext";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// const auth = getAuth(app);
export function ProductAddedCart({ cartProduct }) {
  const [count, setCount] = useState(1);
  const [state, dispatch] = useReducer(cartReducer, { count: cartProduct.qty });
  // const [state, dispatch] = useReducer(cartReducer, { count: 0 });
  const { cart, setCart } = useCart();

  const increment = () => {
    dispatch({ type: "increment" });
    const exist = cart.find((x) => x.idChanges);
    setCart(
      cart.map((x) =>
        x.idChanges === cartProduct.idChanges
          ? {
              ...exist,
              qty: state.count + 1,
            }
          : x
      )
    );
  };

  const decrement = () => {
    dispatch({ type: "decrement" });
    const exist = cart.find((x) => x.idChanges);

    if (state.count < 0) {
      setCart(
        cart.map((x) =>
          x.idChanges === cartProduct.idChanges
            ? {
                ...exist,
                qty: 0,
              }
            : x
        )
      );
    }
    setCart(
      cart.map((x) =>
        x.idChanges === cartProduct.idChanges
          ? {
              ...exist,
              qty: state.count - 1,
            }
          : x
      )
    );
  };

  // !PRUEBA ----------------

  let navigate = useNavigate();
  const HandleRemoveFromCart = () => {
    console.log("ahora hayyyy, ", cart);

    const exist = cart.find((x) => x.idChanges);
    // const exist = cart.find((x) => x.id === product.id);

    console.log("este existeeeee", exist);
    console.log("son iguales?", exist.id === cartProduct.id);
    console.log("AMBAS", cartProduct);
    console.log("MIRIAN", cartProduct.idChanges);
    console.log("LUCERO", exist);

    if (exist) {
      setCart(cart.filter((x) => x.idChanges !== cartProduct.idChanges));
      // setCart(cart.filter((x) => x.id !== product.id));
    }
    // !----------------------------------
    // if (exist.qty === 1) {
    //   console.log("su qty empezó en uno!");
    //   // debugger;
    //   console.log(exist.qty, "entonces es igual a 1");
    //   setCart(cart.filter((x) => x.id !== product.id));
    // } else {
    //   setCart(
    //     cart.map((x) =>
    //       x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
    //     )
    //   );
    // }
  };

  // console.log(product.product_observation)
  console.log("esta es mi observación", cartProduct.product_observation);
  console.log("mi producto", cartProduct.product_options);
  return (
    <div className="productAdded-card">
      <div className="productAdded-card--photoContainer">
        <img
          src={cartProduct.product_photo[0]}
          className="productAdded-image"
          alt="productAdded.name"
        />
      </div>
      <div className="productAdded-card--textContainer">
        <div className="productAdded-card--text">
          <div className="productAdded-card--title">
            <h2 className="productAdded-card--productName">
              {cartProduct.product_name}
            </h2>
            <h3 className="productAdded-card--options">16 pts</h3>
          </div>
          <p className="productAdded-card--descr">
            {cartProduct.product_description}
          </p>
          <div className="productAdded-card--pinkContainer">
            <h3 className="productAdded-card--cost-dinamic">
              $ {cartProduct.product_cost * count}
            </h3>

            {/* ! NO FUNCIONA */}

            {/* {product.product_observation && ( */}
            {cartProduct.observation && (
              <Eye fill="#fff" width={30} className="product-card--eye" />
            )}
            {/* <Eye fill="#fff" width={30} className="product-card--eye" /> */}
            {/* <Eye className="product-card--eye"/> */}
          </div>
        </div>
        <div className="productAdded-card--buttonContainer">
          <div className="productAdded-card--buttonContainer">
            <div className="productAdded-card--button-counter">
              <button
                className="productAdded-card--buttonCounter"
                onClick={increment}
              >
                +
              </button>
              <p>{state.count}</p>
              {/* <input
                classList="productAdded-card--input-qty"
                type="number"
                min="0"
                value={state.count}
              ></input> */}

              <button
                className="productAdded-card--buttonCounter"
                onClick={decrement}
              >
                -
              </button>
            </div>
          </div>

          <div className="productAdded-card--buttonsRightContainer">
            {/* ! aqui */}
            {/* {cartProduct.cartProduct.product_options} */}
            <div className="productAdded-card--pencilContainer">
              <Pencil className="productAdded-card--pencil" />
            </div>
            <div
              className="productAdded-card--button"
              onClick={HandleRemoveFromCart}
            >
              {<More width={15} className="productAdded--x-icon" />}
              {/* {<More width={15} className="productAdded--x-icon" />} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAddedCart;

// {
//   /* <div className="productAdded-card--buttonContainer">
//           <div className="productAdded-card--button-counter">
//             <button
//               className="productAdded-card--buttonCounter"
//               onClick={increment}
//             >
//               +
//             </button>
//             <p>{state.count}</p>
//           <input type="number" min="0"></input>

//             <button
//               className="productAdded-card--buttonCounter"
//               onClick={decrement}
//             >
//               -
//             </button>
//           </div>
//           <div
//             className="productAdded-card--button"
//             onClick={HandleRemoveFromCart}
//           >
//             {<More width={15} className="productAdded--x-icon" />}
//           </div>
//         </div> */
// }
