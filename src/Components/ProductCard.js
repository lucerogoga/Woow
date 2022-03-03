import "../Assets/ProductCard.css";
import { ReactComponent as More } from "../Assets/icons/more.svg";
// import { iconMore } from "../Assets/icons/more.svg";
import { app } from "../Config/initialize.js";
// import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// !PRUEBA ----------------
import { CartState } from "../Components/Context/OrderContext";

// const auth = getAuth(app);
export function ProductCard(props) {
  const { product } = props;
  // !PRUEBA ----------------
  const { dispatch } = CartState();
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
      //  navigate("order-cart");
      dispatch({ type: "ADD-TO-CARD", payload: product });
      // <Navigate to="waiter/order-cart" />;
      // return <Navigate to="waiter/order-cart" />;
    }
  };

  return (
    <div className="product-card">
      <div className="product-card--photoContainer">
        <img
          src={product.product_photo[0]}
          className="product-image"
          alt="product.name"
        />
      </div>
      <div className="product-card--textContainer">
        <div className="product-card--text">
          <h2 className="product-card--title"> {product.product_name}</h2>
          <p className="product-card--descr"> {product.product_description}</p>
          <h3 className="product-card--cost"> $ {product.product_cost}</h3>
        </div>
        <div className="product-card--buttonContainer">
          <div className="product-card--button">
            {/* Este es el span */}
            {/* <div className="product-card--buttonIcon">+</div> */}
            <div onClick={HandleAddToCart} className="product-card--buttonIcon">
              {<More width={15} style={{ marginTop: "4px" }} />}
              {/* {<More width={15} style={{ marginTop: "4px" }} />} */}
            </div>
            {/* <img src={iconMore} className="buttonIcon" alt="buttonIcon" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
