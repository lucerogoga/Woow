import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../Assets/DetailProduct.css";
import DetailProductsIcons from "../../Assets/DetailsProductsIcons";
import ButtonFilter from "../../Components/ButtonFilter";
import { NavBarChef } from "../../Components/NavBarWaiter";
import LargeButton from "../../Components/ActionButton";
import { useCart } from "../../Components/Context/CartContext";
import { useNavigate } from "react-router-dom";

const DetailProduct = () => {
  const { cart, setCart } = useCart();
  let navigate = useNavigate();
  const [size, setSize] = useState("");
  const [observation, setObservation] = useState("");
  const [count, setCount] = useState(1);
  console.log(size);
  let location = useLocation();
  console.log(location.state);
  const { state } = location;

  const handleCart = () => {
    console.log("entre a handlecart");
    const exist = cart.find((x) => x.id === state.id);

    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === state.id
            ? { ...exist, qty: count, size: size, observation: observation }
            : x
        )
      );
    } else {
      setCart((cart) => [
        ...cart,
        { ...state, qty: count, size: size, observation: observation },
      ]);
    }
    navigate("order-cart");
  };

  const CounterHorizontal = () => {
    return (
      <>
        <div className="counter-content">
          <button
            className="counter-button"
            onClick={() => setCount(count - 1)}
          >
            -
          </button>
          <p>{count}</p>
          <button
            className="counter-button"
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className="image-content"
        style={{ backgroundImage: `url(${state.product_photo[1]})` }}
      >
        <NavBarChef />

        <div className="info-product-container">
          <div className="info-product-subcontainer">
            <h1 className="product--name">{state.product_name}</h1>
            <h2 className="product--description">
              {state.product_description}
            </h2>
            <h2 className="product--cost">$ {state.product_cost}</h2>
          </div>
        </div>
        {/* white container */}
        <div className="white-container">
          <div>
            <p className="size-title">Choice Size</p>
            <div className="products-detail-container">
              {state.product_options.map((op, i) => {
                return (
                  <ButtonFilter
                    item={op}
                    //   uid={op.cat_uid}
                    icon={DetailProductsIcons[i]}
                    key={op[i]}
                    onClick={() => {
                      setSize(op);
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="observation-content">
            <p className="observation-title">Observations</p>
            <textarea
              className="text-area-observations"
              type="text"
              onChange={(ev) => setObservation(ev.target.value)}
            ></textarea>
          </div>

          {/* section buttons */}
          <div className="buttons-container">
            <CounterHorizontal />
            <div className="large-button--content" onClick={handleCart}>
              <LargeButton title="Add to Cart" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
