import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ButtonFilter from "../../Components/ButtonFilter";
import ProductCard from "../../Components/ProductCard";
import ActionButton from "../../Components/ActionButton";
import ModalProducts from "../../Components/ModalProducts";
import iconComponents from "../../Assets/iconComponent/CustomLogo";

import {
  getProducts,
  getProductsCategories,
  filterProductByCategorie,
} from "../../Services/FirestoreServices";
import Search from "../../Components/Search";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productCategories, setProductCategories] = useState([]);

  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
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

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const onClose = () => {
    setOpenModal(false);
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
      <ModalProducts isOpen={openModal} onClose={onClose} />
      <div className="products-container">
        {products.map((p) => {
          return <ProductCard path={pathname} product={p} key={p.id} />;
        })}
      </div>
      <div className="large-button--content" onClick={handleOpen}>
        <ActionButton
          title={"Add Product"}
          className={"pink-button"}
          //   onClick={openModal}
        />
      </div>
    </>
  );
};
export default AdminProducts;
