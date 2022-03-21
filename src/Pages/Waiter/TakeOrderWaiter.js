import React, { useState, useEffect } from "react";
import "../../Assets/Navbar.css";
import "../../Assets/Sidebar.css";
import "../../Assets/WaiterView.css";
import ProductCard from "../../Components/ProductCard";
import ButtonFilter from "../../Components/ButtonFilter";
import iconComponents from "../../Assets/iconComponent/CustomLogo";
import {
  getProducts,
  getProductsCategories,
  filterProductByCategorie,
} from "../../Services/FirestoreServices";
import Search from "../../Components/Search";
import Time from "../../Components/Time";
// ! -----

// ! -----

const TakeOrderWaiter = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productCategories, setProductCategories] = useState([]);

  const handleCategorie = async (catUid, catName) =>
    await filterProductByCategorie(catUid, catName);

  useEffect(() => {
    getProducts().then((products) => setProducts(products));
    getProductsCategories().then((category) => setProductCategories(category));
  }, []);

  const handleClick = ({ cat_uid, cat_name }) => {
    setSelectedCategory(cat_uid);
    handleCategorie(cat_uid, cat_name).then((items) => {
      setProducts(items);
    });
  };

  const handleSearch = async (query) => {
    const products = await getProducts();
    const product = products.filter((elem) => {
      return elem.product_name.toLowerCase().includes(query.toLowerCase());
    });
    setProducts(product);
  };

  return (
    <>
      <Search onChange={handleSearch} placeholder={"Search product"}></Search>
      <div className="categories-container">
        {productCategories.map((cat, i) => {
          return (
            <ButtonFilter
              item={cat.cat_name}
              uid={cat.cat_uid}
              active={cat.cat_uid === selectedCategory}
              icon={iconComponents[i]}
              key={cat.cat_uid}
              onClick={() => {
                handleClick(cat);
              }}
            />
          );
        })}
      </div>
      <div className="products-container">
        {/* <Time start={new Date()} end={null} /> */}
        {/* <Time startOrderTime={new Date()} endOrderTime={null} /> */}
        {products.map((p) => {
          return <ProductCard product={p} key={p.id} />;
        })}
      </div>
    </>
  );
};

export default TakeOrderWaiter;
