import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import "../../Assets/DetailProduct.css";
import DetailProductsIcons from "../../Assets/iconComponent/DetailsProductsIcons";
import NavBarWaiter from "../../Components/NavBarWaiter";
import ActionButton from "../../Components/ActionButton";
import { useCart } from "../../Components/Context/CartContext";
import { useNavigate } from "react-router-dom";
import ButtonFilter from "../../Components/ButtonFilter";
import formatNum from "format-num";

const DetailProduct = () => {
  const { cart, setCart } = useCart();
  let navigate = useNavigate();
  const [size, setSize] = useState("12 portions");
  const [cost, setCost] = useState(0);
  const [observation, setObservation] = useState("");
  const [count, setCount] = useState(1);

  let location = useLocation();
  const { state, pathname } = location;
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
      <NavBarWaiter currentPath={pathname} />
      <div
        className="image-content"
        style={{ backgroundImage: `url(${product.product_photo[1]})` }}
      >
        {" "}
      </div>

      <main className="detail-desktop">
        {/* Div central card for the desktop */}
        <div className="info-product__main-container">
          {/* Left div for text in desktop view*/}
          <div className="info-product__left-container">
            <img
              alt={product.product_name}
              className="info-product__photo"
              src={product.product_photo[0]}
            />
          </div>
          {/* Right div for text in desktop view */}
          <div className="info-product__right-container">
            <div className="product-detail-container">
              {/* The div that contains the product description and the TABLET card */}
              <div className="info-product-container">
                {/* Product Top Information */}
                <div className="info-product-subcontainer">
                  <h1 className="product__name">{product.product_name}</h1>
                  <p className="product__description">
                    {product.product_description}
                  </p>
                  <h2 className="product__cost">
                    {"Unit Price: $ " +
                      formatNum(product.product_cost[cost], {
                        minFraction: 2,
                        maxFraction: 2,
                      })}
                  </h2>
                </div>

                {/* white container */}
              </div>
              <div className="card__white-container">
                <div>
                  <div className="card__header">
                    <h1 className="card__paragrap">{product.product_name}</h1>
                    <div className="card__cost--container">
                      <h1 className="card__cost--text">Unit Price:</h1>
                      <h1 className="card__cost--number">
                        {"$ " +
                          formatNum(product.product_cost[cost], {
                            minFraction: 2,
                            maxFraction: 2,
                          })}
                      </h1>
                    </div>

                    <p className="product__description--desktop">
                      {product.product_description}
                    </p>
                  </div>
                  <p className="card__title">Choice Size</p>
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
                  <p className="card__title--scnd">Observations</p>
                  <textarea
                    className="text-area-observations"
                    type="text"
                    value={observation}
                    onChange={(ev) => setObservation(ev.target.value)}
                  ></textarea>
                </div>
                <div className="total-price">
                  <h3>Total Cost</h3>
                  <h3 className="price-total-cost">
                    {"$ " +
                      formatNum(product.product_cost[cost] * count, {
                        minFraction: 2,
                        maxFraction: 2,
                      })}
                  </h3>
                </div>

                {/* section buttons */}
                <div className="buttons-container">
                  <CounterHorizontal />
                  <div
                    className="large-button__content"
                    onClick={handleActionClick}
                  >
                    <ActionButton
                      title={
                        action === "createProductCart"
                          ? "Add to Cart"
                          : "Edit Product Cart"
                      }
                      className={"button--pink"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DetailProduct;
