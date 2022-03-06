import Cart from "./Cart";
import "../Assets/SideBarCart.css";
import { ReactComponent as X } from "../Assets/icons/x.svg";
import ActionButton from "./ActionButton";
import { useNavigate } from "react-router-dom";

const SideBarCart = ({ onClose }) => {
  let navigate = useNavigate();
  const handleGoCart = () => {
    navigate("../waiter/order-cart");
    onClose();
  };
  return (
    <>
      <div className="sideBarCart-content">
        <div className="sidebar--header">
          <span onClick={onClose}>
            <X className="x-icon" width={25} />
          </span>
        </div>
        <Cart cantEdit={true} />
        <div className="large-button--content" onClick={handleGoCart}>
          <ActionButton
            title="Ver Carrito"
            className={"pink-button-sidebarcart"}
          ></ActionButton>
        </div>
      </div>
    </>
  );
};
export default SideBarCart;
