import "../Assets/ProductCard.css";
import { app } from "../Config/initialize.js";
// import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
// const auth = getAuth(app);
const firestore = getFirestore(app);

export function ProductCard(props) {
  const { product } = props;
  return (
    <div className="product-card">
      <div className="product-header">
        {/* <img src={product.product_photo} className="product-image" alt="product.name" /> */}
      </div>
      <div className="product-content"></div>
      <p>Hola soy un producto</p>
      <p> {product.product_name}</p>
    </div>
  );
}

export async function getProducts() {
  const productsData = await getDocs(collection(firestore, "products"));
  debugger;
  return productsData.docs.map((p) => {
    return {
      id: p.id,
      ...p.data(),
    };
  });
}

export default ProductCard;
