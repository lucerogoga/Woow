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
  const { cart, setCart, idDetail, setIdDetail } = useCart();
  let navigate = useNavigate();
  const [size, setSize] = useState("12 portions");
  const [cost, setCost] = useState(0);
  const [observation, setObservation] = useState("");
  const [count, setCount] = useState(1);
  console.log(size);
  console.log(cost);
  let location = useLocation();
  console.log(location.state);
  const { state } = location;

  // !-----------------------

  // setCart((cart) => [
  //   ...cart,
  //   { ...product, qty: 1, idChanges: `${product.id}-detail${idDetail}` },
  // ]);
  const exist = cart.find((x) => x.idChanges);

  const updateProduct = () => {
    // const exist = cart.find((x) => x.id === state.id);

    console.log(exist);
    if (exist) {
      console.log("claro que existe este producto por su id");
      setCart(
        cart.map((x) =>
          x.id === state.id
            ? {
                ...exist,
                qty: count,
                size: size,
                observation: observation,
                idChanges: idDetail,
              }
            : x
        )
      );
    }
  };

  // !-----------------------
  const handleCart = () => {
    console.log("entre a handlecart");

    setIdDetail(idDetail + 1);
    setCart((cart) => [
      ...cart,
      {
        ...state,
        cost: state.product_cost[cost] * count,
        qty: count,
        size: size,
        observation: observation,
        idChanges: idDetail,
      },
    ]);

    setIdDetail(idDetail + 1);
    navigate("order-cart");
  };

  const CounterHorizontal = () => {
    return (
      <>
        <div className="counter-content">
          <button
            className="counter-button"
            onClick={() => (count <= 1 ? setCount("1") : setCount(count - 1))}
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
            <h2 className="product--cost">
              Unit Price: $ {state.product_cost[cost] * count}
            </h2>
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
                      setCost(i);
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
          <div className="price-content">
            <h3>Total Cost</h3>
            <h3 className="price-total-cost">
              $ {state.product_cost[cost] * count}
            </h3>
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
