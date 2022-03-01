import React from "react";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import "../../Assets/DetailProduct.css";
import DetailProductsIcons from "../../Assets/DetailsProductsIcons";
import ButtonFilter from "../../Components/ButtonFilter";
import { NavBarChef } from "../../Components/NavBarWaiter";
import LargeButton from "../../Components/ActionButton";
const DetailProduct = () => {
  //   let { product } = useParams();
  let location = useLocation();
  console.log(location.state);
  const { state } = location;
  console.log("aaaaaaa", state.product_photo[1]);
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
          <div className="products-detail-container">
            {state.product_options.map((cat, i) => {
              return (
                <ButtonFilter
                  item={cat}
                  //   uid={cat.cat_uid}
                  icon={DetailProductsIcons[i]}
                  key={cat[i]}
                  onClick={() => {
                    // handleClick(cat);
                  }}
                />
              );
            })}
          </div>

          <div className="observation-content">
            <p className="observation-title">Observations</p>
            <textarea className="text-area-observations" type="text"></textarea>
          </div>

          {/* section buttons */}

          <div >
            <LargeButton title="Add to Cart" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
