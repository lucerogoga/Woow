import React from "react";
import { ReactComponent as Look } from "../Assets/icons/magnifying-glass.svg";
const Search = ({ onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <>
      <div className="search-content">
        <Look />
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
