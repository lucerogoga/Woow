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
  // !PRUEBA ----------------
  const { cart, setCart } = useCart();
  let navigate = useNavigate();
  const HandleAddToCart = () => {
    // console.log("adding product!!!!");
    // console.log(product.id);
    // console.log(product.product_options);

    if (product.product_options) {
      console.log("funciona");
      // <Navigate to="waiter/detail-product" />;
      // navigate("detail-product", { product });
      navigate("detail-product", { state: product });
      // return <Navigate to="waiter/detail-product" />;
    } else {
      console.log("esto eslo que tengo actual en mi carrito ", cart);
      // setCart([...cart, product]);
      // setCart(product);
      // setCart([...cart, product]);
      setCart((cart) => [...cart, product]);
      navigate("order-cart");
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
              $ {product.product_cost}
            </h3>

            {/* ! NO FUNCIONA */}

            {product.product_observation && (
              <Eye fill="#fff" width={30} className="product-card--eye" />
            )}
            {/* <Eye fill="#fff" width={30} className="product-card--eye" /> */}
            {/* <Eye className="product-card--eye"/> */}
          </div>
        </div>
        <div className="productAdded-card--buttonContainer">
          <div className="productAdded-card--button-counter">
            {/* <div className="productAdded-cart"> */}
            <button className="productAdded-card--buttonCounter">+</button>
            <p>{count}</p>
            <button className="productAdded-card--buttonCounter">-</button>
            {/* </div> */}
          </div>
          <div className="productAdded-card--button">
            {<More width={15} className="productAdded--x-icon" />}
            {/* {<More width={15} className="productAdded--x-icon" />} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAddedCart;
