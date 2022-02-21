import { getProducts } from "./ProductCard";
import ProductCart from "./ProductCard";
import { useEffect, useState } from "react";
import logo from "../Assets/logo-rotate.svg";
import "../Assets/Home.css";
import { useAuth } from "./Context/AuthContext";

function Home() {
  const [products, setProducts] = useState([]);
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  useEffect(() => {
    getProducts().then((p) => setProducts(p));
  }, []);

  return (
    <>
      <nav class="nav-home">
        <img src="../Assets/logo-woow.svg"></img>
        <img alt="logoWoow" className="login--logo" src={logo} />
      </nav>
      <h1>{user.uid}</h1>
      <button onClick={handleLogout}>logout</button>
      {/* {products.map((p) => {
        return <ProductCart product={p} />;
      })} */}
    </>
  );
}
// In react when we return a block of jsx we use () when the componet has a lot of lines
// Fragment is a tag empty <> or you can import it from react and use it like this tag <Fragment>
// Discuss if we add a folder called Pages
export default Home;
