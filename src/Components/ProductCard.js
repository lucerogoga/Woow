import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as Pencil } from "../Assets/icons/pencil.svg";

import "../Assets/ProductCard.css";

import { ReactComponent as More } from "../Assets/icons/more.svg";

import { useCart } from "../Components/Context/CartContext";
import { useSideBarCart } from "./Context/SideBarCartContext";

export function ProductCard(props) {
  const { product, path } = props;
  const { cart, setCart } = useCart();
  const { isSideBarCartOpen, setIsSideBarCartOpen } = useSideBarCart();

  let navigate = useNavigate();

  const HandleAddToCart = () => {
    if (!product.product_options.some((option) => option === null)) {
      navigate("detail-product", {
        state: { product: product, action: "createProductCart" },
      });
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
        setCart((cart) => [
          ...cart,
          {
            ...product,
            idProductCart: uuidv4(),
            unitCost: product.product_cost[0],
            size: null,
            qty: 1,
            totalCost: product.product_cost[0],
          },
        ]);
      }
      setIsSideBarCartOpen(!isSideBarCartOpen);
    }
  };

  const Edit = ({ onClick }) => {
    return (
      <button className="productAdded-card--pencilContainer" onClick={onClick}>
        <Pencil className="productAdded-card--pencil" width={30} height={30} />
      </button>
    );
  };

  const HandleEditProduct = () => {};
  const HandleRemoveProduct = () => {};
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
          {path === "/admin/add-products" ? (
            <div>
              {<Edit />}
              <div
                className="productAdded-card--button"
                onClick={HandleRemoveProduct}
              >
                {
                  <More
                    width={15}
                    height={15}
                    className="productAdded--x-icon"
                  />
                }
              </div>
            </div>
          ) : (
            <div className="product-card--button">
              <div
                onClick={HandleAddToCart}
                className="product-card--buttonIcon"
              >
                {<More width={15} style={{ marginTop: "4px" }} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
