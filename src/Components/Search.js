import React from "react";
//Component
import { ReactComponent as Look } from "../Assets/icons/magnifying-glass.svg";

const Search = ({ onChange, placeholder }) => {
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
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Search;
