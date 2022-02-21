import { getProducts } from "./ProductCard";
// import ProductCart from "./ProductCard";
import { useEffect, useState } from "react";
import logo from "../Assets/logo-rotate.svg";
import "../Assets/Home.css";

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((p) => setProducts(p));
  }, []);

  return (
    <>
      <nav class="nav-home">
        {/* <img src="../Assets/logo-woow.svg"></img> */}
        <img alt="logoWoow" className="login--logo" src={logo} />
      </nav>

      {/* {products.map((p) => {
        return <ProductCart product={p} />;
      })} */}
    </>
  );
};
// In react when we return a block of jsx we use () when the componet has a lot of lines
// Fragment is a tag empty <> or you can import it from react and use it like this tag <Fragment>
// Discuss if we add a folder called Pages
export default Home;
