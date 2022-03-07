import { Link } from "react-router-dom";
import { ReactComponent as X } from "../Assets/icons/x.svg";

const SideBarAdmin = ({ onClose, onClickLogout }) => {
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
            <Link className="sidebar--link" to={"employes"}>
              Employes
            </Link>
          </div>
          <div className="sidebar--item">
            <Link className="sidebar--link" to={"orders"}>
              Orders
            </Link>
          </div>
          <div className="sidebar--item">
            <Link className="sidebar--link" to={"create-categories"}>
              Create Cayegories
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
