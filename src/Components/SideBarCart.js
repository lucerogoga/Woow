import Cart from "./Cart";
import "../Assets/SideBarCart.css";
import { ReactComponent as X } from "../Assets/icons/x.svg";

const SideBarCart = ({ onClose }) => {
  return (
    <>
      <div className="sideBarCart-content">
        {/* <div className="sidebar--header"> */}
        <span onClick={onClose}>
          <X className="x-icon" width={25} />
        </span>
        {/* </div> */}
        <Cart />
      </div>
    </>
  );
};
export default SideBarCart;
