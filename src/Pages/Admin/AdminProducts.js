import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ButtonFilter from "../../Components/ButtonFilter";
import ProductCard from "../../Components/ProductCard";
import ActionButton from "../../Components/ActionButton";
import ModalProducts from "../../Components/ModalProducts";
import iconComponents from "../../Assets/iconComponent/CustomLogo";
import "../../Assets/AdminProducts.css";

import {
  getProducts,
  getProductsCategories,
  filterProductByCategorie,
} from "../../Services/FirestoreServices";
import Search from "../../Components/Search";

import { onSnapshot, collection, query } from "firebase/firestore";

import { db } from "../../Config/initialize";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productCategories, setProductCategories] = useState([]);

  const location = useLocation();
  const { pathname } = location;

  const [openModal, setOpenModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState("");
  const handleCategorie = async (catUid, catName) =>
    await filterProductByCategorie(catUid, catName);

  useEffect(() => {
    getProductsCategories().then((category) => setProductCategories(category));
  }, []);

  useEffect(() => {
    const q = query(collection(db, "products"));
    return onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const handleClick = ({ cat_uid, cat_name }) => {
    setSelectedCategory(cat_uid);
    handleCategorie(cat_uid, cat_name).then((items) => {
      setProducts(items);
    });
  };

  const handleOpen = (product) => {
    setOpenModal(true);
    setProductToEdit(product);
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
      <ModalProducts
        isOpen={openModal}
        onClose={onClose}
        productToEdit={productToEdit}
      />
      <div className="container--reverse">
        <div className="products-container vh">
          {products.map((product) => {
            return (
              <ProductCard
                path={pathname}
                product={product}
                key={product.id}
                isOpen={() => handleOpen(product)}
              />
            );
          })}
        </div>
        <div className="large-button__content" onClick={() => handleOpen()}>
          <ActionButton
            title={"Add Product"}
            className={"button--pink"}
            //   onClick={openModal}
          />
        </div>
      </div>
    </>
  );
};
export default AdminProducts;
