import React, { useState, useEffect } from "react";
import "../../Assets/Navbar.css";
import "../../Assets/Sidebar.css";
import "../../Assets/WaiterView.css";
import ProductCart from "../../Components/ProductCard";
import ButtonFilter from "../../Components/ButtonFilter";
import iconComponents from "../../Assets/CustomLogo";
import {
  getProducts,
  getProductsCategories,
  filterProductByCategorie,
  getOrderStatus,
} from "../../Components/Context/FirestoreServices";
import Search from "../../Components/Search";
// !PRUEBA ----------------
import { CartState } from "../../Components/Context/OrderContext";

// !PRUEBA ----------------

const TakeOrderWaiter = () => {
  const { state } = CartState();
  console.log("mira mis productos, ", state);
  // !PRUEBA ----------------
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [ordersStatus, setOrderStatus] = useState([]);

  const handleCategorie = async (catUid, catName) =>
    await filterProductByCategorie(catUid, catName);
  useEffect(() => {
    getProducts().then((products) => setProducts(products));
    getProductsCategories().then((category) => setProductCategories(category));
    getOrderStatus().then((orderStatus) => setOrderStatus(orderStatus));
  }, []);

  console.log("DESDE TAKE ORDER WAITER , ", products);
  const handleClick = ({ cat_uid, cat_name }) => {
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
      <Search onChange={handleSearch}></Search>
      <div className="categories-container">
        {productCategories.map((cat, i) => {
          return (
            <ButtonFilter
              item={cat.cat_name}
              uid={cat.cat_uid}
              icon={iconComponents[i]}
              key={cat.cat_uid}
              // cat = {objeto}
              // funcion 1
              //funcion 2
              onClick={() => {
                handleClick(cat);
              }}
            />
          );
        })}
      </div>
      <div className="products-container">
        {products.map((p) => {
          return <ProductCart product={p} />;
        })}
      </div>
      <div className="products-container">
        {ordersStatus.map((p) => {
          return <div>{p.status_name}</div>;
        })}
      </div>
    </>
  );
};

export default TakeOrderWaiter;
