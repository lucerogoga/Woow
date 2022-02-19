import { getProducts } from "./ProductCard";
import ProductCart from "./ProductCard";
import { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((p) => setProducts(p));
  }, []);

  return (
    <>
      {products.map((p) => {
        return <ProductCart product={p} />;
      })}
    </>
  );
}
// In react when we return a block of jsx we use () when the componet has a lot of lines
// Fragment is a tag empty <> or you can import it from react and use it like this tag <Fragment>
// Discuss if we add a folder called Pages
export default Home;
