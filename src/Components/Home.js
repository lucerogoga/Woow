import ProductCart from "./ProductCard";
import { useEffect, useState } from "react";
import logo from "../Assets/logo-rotate.svg";
import "../Assets/Home.css";
import { useAuth } from "./Context/AuthContext";
import NavBar from "./NavBar";
import { getUser, getProducts } from "./Context/FirestoreContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const { user, logout } = useAuth();
  console.log("estamos en el HOME, ", user);
  getUser().then((res) => console.log("siiiiiiiii", res));
  getUser();
  const handleLogout = async () => {
    await logout();
  };
  useEffect(() => {
    getProducts().then((p) => setProducts(p));
  }, []);

  return (
    <>
      <NavBar>
        <li>
          <Link className="navBar--link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="navBar--link" to="/waiter/product-detail">
            Product Detail
          </Link>
        </li>
        <li>
          <Link className="navBar--link" to="/chef">
            Chef
          </Link>
        </li>
        <li>
          <Link className="navBar--link" to="/waiter/order-cart">
            Order Cart
          </Link>
        </li>
      </NavBar>

      <h1>{user.uid}</h1>
      <button onClick={handleLogout}>logout</button>

      <div className="products-container">
        {products.map((p) => {
          return <ProductCart product={p} />;
        })}
      </div>
    </>
  );
};

export default Home;