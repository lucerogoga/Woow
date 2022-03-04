import React, { useReducer } from "react";
import "../Assets/ProductAddedCart.css";
import { ReactComponent as More } from "../Assets/icons/more.svg";
import { ReactComponent as Eye } from "../Assets/icons/eye.svg";
import { ReactComponent as Pencil } from "../Assets/icons/pencil.svg";
import { useCart } from "../Components/Context/CartContext";

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

export function ProductAddedCart({ cartProduct }) {
  const [state, dispatch] = useReducer(cartReducer, { count: cartProduct.qty });
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
              totalCost: cartProduct.unitCost * (state.count + 1),
            }
          : x
      )
    );
  };

  const decrement = () => {
    dispatch({ type: "decrement" });
    const exist = cart.find((x) => x.idChanges);

    setCart(
      cart.map((x) =>
        x.idChanges === cartProduct.idChanges
          ? {
              ...exist,
              qty: state.count - 1,
              totalCost: cartProduct.unitCost * (state.count - 1),
            }
          : x
      )
    );
  };

  const HandleRemoveFromCart = () => {
    const exist = cart.find((x) => x.idChanges);
    if (exist) {
      setCart(cart.filter((x) => x.idChanges !== cartProduct.idChanges));
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
            <h3 className="productAdded-card--options">16 pts</h3>
          </div>
          <p className="productAdded-card--descr">
            {cartProduct.product_description}
          </p>
          <div className="productAdded-card--pinkContainer">
            <h3 className="productAdded-card--cost-dinamic">
              $ {cartProduct.unitCost * state.count}
            </h3>

            {cartProduct.observation && (
              <Eye fill="#fff" width={30} className="product-card--eye" />
            )}
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
            <div className="productAdded-card--pencilContainer">
              <Pencil className="productAdded-card--pencil" />
            </div>
            <div
              className="productAdded-card--button"
              onClick={HandleRemoveFromCart}
            >
              {<More width={15} className="productAdded--x-icon" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAddedCart;
