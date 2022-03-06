import { Link } from "react-router-dom";
import { ReactComponent as X } from "../Assets/icons/x.svg";

const SideBar = ({ onClose, onClickLogout }) => {
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
              Take Order
            </Link>
          </div>
          <div className="sidebar--item">
            <Link className="sidebar--link" to={"orders-resume"}>
              Orders Resume
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

export default SideBar;
