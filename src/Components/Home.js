import ProductCart from "./ProductCard";
import { useEffect, useState } from "react";
import logo from "../Assets/logo-rotate.svg";
import "../Assets/Home.css";
import { useAuth } from "./Context/AuthContext";
import NavBar from "./NavBar";
import { getUser, getProducts } from "./Context/FirestoreContext";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const { user, logout } = useAuth();
  console.log("estamos en el HOME, ", user);
  getUser().then((res) => console.log("siiiiiiiii", res));
  // getUser();
  const handleLogout = async () => {
    await logout();
  };
  useEffect(() => {
    getProducts().then((p) => setProducts(p));
  }, []);

  return (
    <>
      <NavBar />
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
// In react when we return a block of jsx we use () when the componet has a lot of lines
// Fragment is a tag empty <> or you can import it from react and use it like this tag <Fragment>
// Discuss if we add a folder called Pages
export default Home;
