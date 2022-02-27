import React, { useState } from "react";
import { getProducts } from "./Context/FirestoreContext";

const Search = () => {
  const [searchField, setSearchField] = useState("");

  const searchProduct = async () => {
    const products = await getProducts();
    return products.includes({ product_name: searchField });
  };

  const handleChange = (e) => {
    setSearchField(e.target.value);
    searchProduct();
  };
  return (
    <>
      <div className="search-content">
        <input
          className="search-input"
          type="search"
          placeholder="Search Product"
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Search;
