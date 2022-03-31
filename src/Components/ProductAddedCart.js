import React, { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Assets/ProductAddedCart.css";
//Contexts
import { useCart } from "../Components/Context/CartContext";
//Helpers
import formatNum from "format-num";
//Components
import { ReactComponent as More } from "../Assets/icons/more.svg";
import { ReactComponent as Pencil } from "../Assets/icons/pencil.svg";
import EyePopover from "./EyePopover";
// import { ReactComponent as Eye } from "../Assets/icons/eye.svg";
// import TableRow from "@mui/material/TableRow";

//Cart Reducer Hook Function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return state.count <= 1 ? { count: 1 } : { count: state.count - 1 };
    default:
      return state;
  }
};
//Component Pencil to Edit
const Edit = ({ onClick }) => {
  return (
    <button className="productAdded-card--pencilContainer" onClick={onClick}>
      <Pencil className="productAdded-card--pencil" width={30} height={30} />
    </button>
  );
};

export function ProductAddedCart({ cartProduct, cantEdit }) {
  const [state, dispatch] = useReducer(cartReducer, { count: cartProduct.qty });
  const { cart, setCart } = useCart();
  let navigate = useNavigate();

  const increment = () => {
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    dispatch({ type: "decrement" });
  };

  //Set observations in the popovereye
  let observationExist = "";
  if (cartProduct.observation) {
    cartProduct.observation.trim() !== ""
      ? (observationExist = <EyePopover obs={cartProduct.observation} />)
      : (observationExist = "");
  }

  //Updates Cart Context
  const { idProductCart, unitCost } = cartProduct;
  useEffect(() => {
    setCart((prevCart) => {
      return prevCart.map((x) =>
        x.idProductCart === idProductCart
          ? {
              ...x,
              qty: state.count,
              totalCost: unitCost * state.count,
            }
          : x
      );
    });
  }, [state, setCart, idProductCart, unitCost]);

  const HandleRemoveFromCart = () => {
    const exist = cart.find((x) => x.idProductCart);
    if (exist) {
      setCart(
        cart.filter((x) => x.idProductCart !== cartProduct.idProductCart)
      );
    }
  };

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
            <h3 className="productAdded-card--options">
              {cartProduct.size && `${cartProduct.size.split(" ")[0]} pts`}
            </h3>
          </div>
          <p className="productAdded-card--descr">
            {cartProduct.product_description}
          </p>
          <div className="productAdded-card--pinkContainer">
            <h3 className="productAdded-card__cost">
              ${" "}
              {formatNum(cartProduct.unitCost * state.count, {
                minFraction: 2,
                maxFraction: 2,
              })}
            </h3>
            {cartProduct.observation && observationExist}
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
              <button
                className="productAdded-card--buttonCounter"
                onClick={decrement}
              >
                -
              </button>
            </div>
          </div>
          <div className="productAdded-card--buttonsRightContainer">
            {cantEdit || !("observation" in cartProduct) ? null : (
              <Edit
                onClick={() =>
                  navigate("../detail-product", {
                    state: {
                      product: cartProduct,
                      action: "updateProductCart",
                    },
                  })
                }
              />
            )}
            <div
              className="productAdded-card--button"
              onClick={HandleRemoveFromCart}
            >
              {<More width={15} height={15} className="productAdded--x-icon" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAddedCart;
