import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import "../../Assets/DetailProduct.css";
import DetailProductsIcons from "../../Assets/iconComponent/DetailsProductsIcons";
// import ButtonFilter from "../../Components/ButtonFilter";
import NavBarWaiter from "../../Components/NavBarWaiter";
import ActionButton from "../../Components/ActionButton";
import { useCart } from "../../Components/Context/CartContext";
import { useNavigate } from "react-router-dom";
import ButtonFilter from "../../Components/ButtonFilter";

const DetailProduct = () => {
  const { cart, setCart } = useCart();
  let navigate = useNavigate();
  const [size, setSize] = useState("12 portions");
  const [cost, setCost] = useState(0);
  const [observation, setObservation] = useState("");
  const [count, setCount] = useState(1);
  let location = useLocation();
  const { state } = location;
  const { product, action } = state;

  const updateProductCart = () => {
    setCart((cart) =>
      cart.map((x) =>
        x.idProductCart === product.idProductCart
          ? {
              ...x,
              unitCost: product.product_cost[cost],
              totalCost: product.product_cost[cost] * count,
              qty: count,
              size: size,
              observation: observation.trim(),
            }
          : x
      )
    );
  };

  const addProductCart = () => {
    setCart((cart) => [
      ...cart,
      {
        ...product,
        idProductCart: uuidv4(),
        unitCost: product.product_cost[cost],
        totalCost: product.product_cost[cost] * count,
        qty: count,
        size: size,
        observation: observation.trim(),
      },
    ]);
  };

  const handleActionClick = () => {
    if (action === "createProductCart") {
      addProductCart();
    } else {
      updateProductCart();
    }
    navigate("../waiter/order-cart");
  };

  const CounterHorizontal = () => {
    return (
      <>
        <div className="counter-content">
          <button
            className="counter-button"
            onClick={() => (count <= 1 ? setCount(1) : setCount(count - 1))}
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

  const productObservation = product.observation;
  useEffect(() => {
    if (productObservation) {
      setObservation(productObservation);
    }
  }, [productObservation]);

  const quantity = product.qty;
  useEffect(() => {
    if (quantity) {
      setCount(quantity);
    }
  }, [quantity]);

  const initialSize = product.size;
  useEffect(() => {
    if (initialSize) {
      setSize(initialSize);
    }
  }, [initialSize]);

  return (
    <>
      <div
        className="image-content"
        style={{ backgroundImage: `url(${product.product_photo[1]})` }}
      >
        <NavBarWaiter />

        <div className="info-product-container">
          <div className="info-product-subcontainer">
            <h1 className="product--name">{product.product_name}</h1>
            <h2 className="product--description">
              {product.product_description}
            </h2>
            <h2 className="product--cost">
              Unit Price: $ {product.product_cost[cost]}
            </h2>
          </div>
        </div>
        {/* white container */}
        <div className="white-container">
          <div>
            <p className="size-title">Choice Size</p>
            <div className="products-detail-container">
              {product.product_options.map((op, i) => {
                return (
                  <ButtonFilter
                    item={op}
                    active={op === size}
                    icon={DetailProductsIcons[i]}
                    key={op}
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
              value={observation}
              onChange={(ev) => setObservation(ev.target.value)}
            ></textarea>
          </div>
          <div className="price-content">
            <h3>Total Cost</h3>
            <h3 className="price-total-cost">
              $ {product.product_cost[cost] * count}
            </h3>
          </div>

          {/* section buttons */}
          <div className="buttons-container">
            <CounterHorizontal />
            <div className="large-button--content" onClick={handleActionClick}>
              <ActionButton
                title={
                  action === "createProductCart"
                    ? "Add to Cart"
                    : "Edit Product Cart"
                }
                className={"pink-button"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
