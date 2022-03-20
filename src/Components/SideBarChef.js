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
              Orders
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

// !------------------------------------------------------
// import { Link, useLocation } from "react-router-dom";
// import { ReactComponent as X } from "../Assets/icons/x.svg";
// import Drawer from "@mui/material/Drawer";
// import Box from "@mui/material/Box";
// import * as React from "react";

//const SideBar = ({ isOpen, onClose, onClickLogout }) => {
// const SidebarWaiterContainer = ({ onClose }) => {
//   let location = useLocation();

//   return (
//     <div className="sidebar">
//       <div className="sidebar--header">
//         <span onClick={onClose}>
//           <X className="x-icon" width={25} />
//         </span>
//       </div>

//       <div className="sidebar--menu">
//         <div className="sidebar--item">
//           <Link
//             to={""}
//             className={
//               "sidebar--link " +
//               (location.pathname === "/waiter" ? "sidebar--link--active" : "")
//             }
//           >
//             Take Order
//           </Link>
//         </div>
//         <div className="sidebar--item">
//           <Link
//             to={"orders-resume"}
//             className={
//               "sidebar--link " +
//               (location.pathname === "/waiter/orders-resume"
//                 ? "sidebar--link--active"
//                 : "")
//             }
//           >
//             Orders Resume
//           </Link>
//         </div>
//         <div className="sidebar--item">
//           <button className="sidebar--logout">Logout</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const list = (onClose) => (
//   <Box sx={{ width: 250, bgcolor: "#ffefc0", height: "100vh" }}>
//     <SidebarWaiterContainer onClose={onClose} />
//   </Box>
// );

// const SideBar = ({ isOpen, onClose }) => {
//   console.log(isOpen);
//   return (
//     <div>
//       <React.Fragment>
//         <Drawer anchor={"left"} open={isOpen} onClose={onClose}>
//           {list(onClose)}
//         </Drawer>
//       </React.Fragment>
//     </div>
//   );
// };

// export default SideBar;
