import { Link } from "react-router-dom";
import { ReactComponent as X } from "../Assets/icons/x.svg";

const SideBarChef = ({ onClose, onClickLogout }) => {
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
            <Link className="sidebar--link" to={""}>
              Orders To Do
            </Link>
          </div>
          <div className="sidebar--item">
            <Link className="sidebar--link" to={"orders-delivered"}>
              Orders Delivered
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

export default SideBarChef;
