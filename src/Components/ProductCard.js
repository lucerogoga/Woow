import "../Assets/ProductCard.css";
// import { iconMore } from "../Assets/icons/more.svg";
import { app } from "../Config/initialize.js";
// import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";
// const auth = getAuth(app);
const firestore = getFirestore(app);

export function ProductCard(props) {
  const { product } = props;
  return (
    <div className="product-card">
      <div className="product-card--photoContainer">
        <img
          src={product.product_photo}
          className="product-image"
          alt="product.name"
        />
      </div>
      <div className="product-card--textContainer">
        <div className="product-card--text">
          <h2 className="product-card--title"> {product.product_name}</h2>
          <p className="product-card--descr"> {product.product_description}</p>
          <h3 className="product-card--cost"> $ {product.product_cost}</h3>
        </div>
        <div className="product-card--buttonContainer">
          <div className="product-card--button">
            {/* Este es el span */}
            <div className="product-card--buttonIcon">+</div>
            {/* <img src={iconMore} className="buttonIcon" alt="buttonIcon" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getProducts() {
  const productsData = await getDocs(collection(firestore, "products"));
  return productsData.docs.map((p) => {
    return {
      id: p.id,
      ...p.data(),
    };
  });
}

export default ProductCard;
