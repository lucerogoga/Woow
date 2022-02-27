import React, { useState } from "react";
import { getProducts } from "./Context/FirestoreContext";

const Search = () => {
  const [searchField, setSearchField] = useState("");

  const searchProduct = async () => {
    const products = await getProducts();
    const product = products.find({ product_name: searchField });
    console.log(product);
    debugger;
    return product;
  };

  const handleChange = (e) => {
    searchProduct();
  };
  return (
    <>
      <div className="search-content">
        <input
          className="search-input"
          type="search"
          placeholder="Search Product"
          onChange={(ev) => {
            setSearchField(ev.target.value);
            handleChange();
          }}
        />
        <label id="btn-buscar" className="input-btn" for="">
          <span className="icon-search-svgrepo-com"></span>
        </label>
      </div>
    </>
  );
};

export default Search;
