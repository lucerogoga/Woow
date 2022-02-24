import ProductCart from "./ProductCard";
import ButtonFilter from "./ButtonFilter";
import iconComponents from "../Assets/CustomLogo";
import { useEffect, useState } from "react";
import "../Assets/Home.css";
import { useAuth } from "./Context/AuthContext";
import NavBar from "./NavBar";
import {
  getUser,
  getProducts,
  getProductsCategories,
} from "./Context/FirestoreContext";
import logo from "../Assets/logo-rotate.svg";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const { user, logout } = useAuth();

  console.log("estamos en el HOME, ", user);

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    getProducts().then((products) => setProducts(products));
    getProductsCategories().then((category) => setProductCategories(category));
  }, []);

  return (
    <>
      <NavBar />
      <h1>{user.uid}</h1>
      <button onClick={handleLogout}>logout</button>

      <div className="categories-container">
        {/* {(productCategories.concat(icons)).map((cat) => {
          return <ButtonFilter items={cat.cat_name} />;
        })} */}
        {productCategories.map((cat) => {
          // const icon = iconComponents.map((item) => item);
          return <ButtonFilter item={cat.cat_name} icon={iconComponents} />;
        })}
      </div>
      <div className="products-container">
        {products.map((p) => {
          return <ProductCart product={p} />;
        })}
      </div>
    </>
  );
};
// In react when we return a block of jsx we use () when the componet has a lot of lines
// Fragment is a tag empty <> or you can import it from react and use it like this tag <Fragment>
// Discuss if we add a folder called Pages
export default Home;
