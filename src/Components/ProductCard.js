import React from "react";
import "../Assets/ProductCard.css";
import { ReactComponent as More } from "../Assets/icons/more.svg";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Components/Context/CartContext";

export function ProductCard(props) {
  const { product } = props;
  const { cart, setCart, idDetail, setIdDetail } = useCart();

  let navigate = useNavigate();
  const HandleAddToCart = () => {
    console.log("aiuda , ", product);
    // if (product.product_options) {
    /* {!cartProduct.product_options.some((option) => option === null) &&
                "si 16 pts"} */
    if (!product.product_options.some((option) => option === null)) {
      navigate("detail-product", { state: product });
    } else {
      const exist = cart.find((x) => x.id === product.id);
      if (exist) {
        setCart(
          cart.map((x) =>
            x.id === product.id
              ? {
                  ...exist,
                  cost: product.product_cost[0] * (exist.qty + 1),
                  qty: exist.qty + 1,
                }
              : x
          )
        );
      } else {
        // ! el verdadero es el de abajo---------------
        console.log("no existia el producto");
        setIdDetail(idDetail + 1);
        setCart((cart) => [
          ...cart,
          {
            ...product,
            unitCost: product.product_cost[0],
            totalCost: product.product_cost[0],
            qty: 1,
            size: [null],
            observation: null,
            idChanges: idDetail,
            // product_options
          },
        ]);
      }
      navigate("order-cart");
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
          <h3 className="product-card--cost"> $ {product.product_cost[0]}</h3>
        </div>
        <div className="product-card--buttonContainer">
          <div className="product-card--button">
            <div onClick={HandleAddToCart} className="product-card--buttonIcon">
              {<More width={15} style={{ marginTop: "4px" }} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
