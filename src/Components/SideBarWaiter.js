import { Link, useLocation} from "react-router-dom";
import { ReactComponent as X } from "../Assets/icons/x.svg";

const SideBar = ({ onClose, onClickLogout }) => {
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
                (location.pathname === "/waiter" ? "sidebar--link--active" : "")
              }>
              Take Order
            </Link>
          </div>
          <div className="sidebar--item">
            <Link to={"orders-resume"} className={
                "sidebar--link " +
                (location.pathname === "/waiter/orders-resume" ? "sidebar--link--active" : "")
              }>
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
