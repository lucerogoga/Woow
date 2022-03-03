import React, { useState } from "react";
import "../Assets/ProductAddedCart.css";
import { ReactComponent as More } from "../Assets/icons/more.svg";
import { ReactComponent as Eye } from "../Assets/icons/eye.svg";
import { ReactComponent as X } from "../Assets/icons/x.svg";

// import { iconMore } from "../Assets/icons/more.svg";
import { app } from "../Config/initialize.js";
// import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// !PRUEBA ----------------
import { useCart } from "../Components/Context/CartContext";

// const auth = getAuth(app);
export function ProductAddedCart(props) {
  const { product } = props;
  // const { setCart } = useCart();
  const [count, setCount] = useState(1);

  console.log("observaciones? , ", product.product_observation);
  console.log("observaciones lucero? , ", product.observation);

  // !PRUEBA ----------------
  const { cart, setCart } = useCart();
  let navigate = useNavigate();
  const HandleRemoveFromCart = () => {
    console.log("ahora hayyyy, ", cart);

    const exist = cart.find((x) => x.id === product.id);

    console.log("este existeeeee", exist);
    console.log("son iguales?", exist.id === product.id);
    if (exist.qty === 1) {
      setCart(cart.filter((x) => x.id !== product.id));
    } else {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }

    // setCart((cart) => [...cart, {}])
    // cart.filter(product => product.id === )

    if (product.product_options) {
      // navigate("detail-product", { state: product });
    } else {
      const exist = cart.find((x) => x.id === product.id);
      if (exist) {
        setCart(
          cart.map((x) =>
            x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
          )
        );
      } else {
        setCart((cart) => [...cart, { ...product, qty: 1 }]);
      }
      // navigate("order-cart");
      // <Navigate to="waiter/order-cart" />;
      // return <Navigate to="waiter/order-cart" />;
    }
  };

  // console.log(product.product_observation)
  console.log("esta es mi observación", product.product_observation);
  return (
    <div className="productAdded-card">
      <div className="productAdded-card--photoContainer">
        <img
          src={product.product_photo[0]}
          className="productAdded-image"
          alt="productAdded.name"
        />
      </div>
      <div className="productAdded-card--textContainer">
        <div className="productAdded-card--text">
          <h2 className="productAdded-card--title"> {product.product_name}</h2>
          <p className="productAdded-card--descr">
            {" "}
            {product.product_description}
          </p>
          <div className="productAdded-card--pinkContainer">
            <h3 className="productAdded-card--cost-dinamic">
              {" "}
              $ {product.product_cost * count}
            </h3>

            {/* ! NO FUNCIONA */}

            {/* {product.product_observation && ( */}
            {product.observation && (
              <Eye fill="#fff" width={30} className="product-card--eye" />
            )}
            {/* <Eye fill="#fff" width={30} className="product-card--eye" /> */}
            {/* <Eye className="product-card--eye"/> */}
          </div>
        </div>
        <div className="productAdded-card--buttonContainer">
          <div className="productAdded-card--button-counter">
            {/* <div className="productAdded-cart"> */}
            <button
              className="productAdded-card--buttonCounter"
              onClick={() => setCount(count + 1)}
            >
              +
            </button>
            <p>{count}</p>
            <button
              className="productAdded-card--buttonCounter"
              onClick={() => setCount(count - 1)}
            >
              -
            </button>
            {/* </div> */}
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
  );
}

export default ProductAddedCart;
