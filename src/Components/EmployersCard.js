import React from "react";
import { ReactComponent as Pencil } from "../Assets/icons/pencil.svg";

const Edit = ({ onClick }) => {
  return (
    <button className="productAdded-card--pencilContainer" onClick={onClick}>
      <Pencil className="productAdded-card--pencil" width={30} height={30} />
    </button>
  );
};

const EmployersCard = ({ employee }) => {
  return (
    <div className="order-container">
      <div className="order-card">
        <div className="order-card--header">
          <div className="order-card--info-container">
            <div className="order-card--titles-container">
              <h3 className="order-card--info-title">Name:</h3>
              <h3 className="order-card--info-title">Email:</h3>
              <h3 className="order-card--info-title">Rol:</h3>
              <h3 className="order-card--info-title">Status:</h3>
            </div>
            <div className="order-card--infos-container">
              <div className="order-card--info-p">{employee.user_name}</div>
              <div className="order-card--info-p">{employee.user_email}</div>
              <div className="order-card--info-p">{employee.user_rol}</div>
              <div className="order-card--info-p">{employee.user_status}</div>
            </div>
          </div>
          <div className="order-card--right-container">
            <div className="order-cart--containertime">
              <Edit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployersCard;
