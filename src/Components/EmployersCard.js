import React, { useState } from "react";
import { ReactComponent as Pencil } from "../Assets/icons/pencil.svg";
import { upperCaseFirstLetter } from "../helpers/nameFormatted";
import { useAuth } from "./Context/AuthContext";
import { getUser } from "../Services/FirestoreServices";

const EmployersCard = ({ employee, isOpen }) => {
  const status = employee.user_status ? "Active" : "Inactive";
  const [isPencilHide, setIsPencilHide] = useState(false);
  const protectedNames = ["mirian arevalo", "lucero gonzalez"];
  // const {
  //   user: { currentUser },
  // } = useAuth();
  // useE

  const HandleEditEmployee = (employee) => {
    isOpen(employee);
  };

  const Edit = ({ onClick }) => {
    return (
      <button
        className="productAdded-card--pencilContainer"
        // onClick={onClick}>
        onClick={() => {
          HandleEditEmployee(employee);
        }}
      >
        <Pencil className="productAdded-card--pencil" width={30} height={30} />
      </button>
    );
  };

  return (
    // <div className="employee-container">
    <div className="employee-card user">
      <div className="employee-card--header">
        <div className="employee-card--info-container">
          <div className="employee-card--titles-container">
            <h3 className="employee-card--info-title">Name:</h3>
            <h3 className="employee-card--info-title">Email:</h3>
            <h3 className="employee-card--info-title">Rol:</h3>
            <h3 className="employee-card--info-title">Status:</h3>
            <h3 className="employee-card--info-title">Password:</h3>
          </div>
          <div className="employee-card--infos-container">
            <div className="employee-card--info-p">
              {upperCaseFirstLetter(employee.user_name)}
            </div>
            <div className="employee-card--info-p">{employee.user_email}</div>
            <div className="employee-card--info-p">
              {upperCaseFirstLetter(employee.user_rol)}
            </div>
            <div className="employee-card--info-p">{status}</div>
            <div className="employee-card--info-p">{employee.user_pwd}</div>
          </div>
        </div>
        <div className="employee-card--right-container">
          {!protectedNames.includes(employee.user_name.toLowerCase()) && (
            <div className="employee-cart--containertime">
              <Edit />
            </div>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default EmployersCard;
