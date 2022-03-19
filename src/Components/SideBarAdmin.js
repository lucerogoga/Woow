import { Link, useLocation} from "react-router-dom";
import { ReactComponent as X } from "../Assets/icons/x.svg";

const SideBarAdmin = ({ onClose, onClickLogout }) => {
  let location = useLocation();
  return (
    <>
      <div className="sidebar">
        <div className="sidebar--header">
          <span onClick={onClose}>
            <X className="x-icon" width={25} />
          </span>
        </div>

        <div className="sidebar--menu">
          <div className="sidebar--item">
            <Link to={""} className={
                "sidebar--link " +
                (location.pathname === "/admin" ? "sidebar--link--active" : "")
              }>
              Employes
            </Link>
          </div>
          <div className="sidebar--item">
            <Link to={"orders"} className={
                "sidebar--link " +
                (location.pathname === "/admin/orders" ? "sidebar--link--active" : "")
              }>
              Orders
            </Link>
          </div>
          <div className="sidebar--item">
            <Link to={"add-products"} className={
                "sidebar--link " +
                (location.pathname === "/admin/add-products" ? "sidebar--link--active" : "")
              }>
              Products
            </Link>
          </div>
          <div className="sidebar--item">
            <button className="sidebar--logout" onClick={onClickLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarAdmin;
