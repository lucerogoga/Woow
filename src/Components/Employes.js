import React, { useState, useEffect } from "react";
import ActionButton from "./ActionButton";
import Title from "./Title";
import Search from "./Search";
import { getEmployers } from "../Services/FirestoreServices";
import EmployersCard from "./EmployersCard";
import ModalEmployes from "./ModalEmployes";

const Employes = () => {
  const [employers, setEmployers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState("");
  console.log("employeeToEdit base, ", employeeToEdit);

  const handleOpen = (employee) => {
    setOpenModal(true);
    setEmployeeToEdit(employee);
  };

  const onClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getEmployers().then((employers) => setEmployers(employers));
  }, []);

  const handleSearchEmployes = async (query) => {
    const employers = await getEmployers();
    const employe = employers.filter((elem) => {
      return elem.product_name.toLowerCase().includes(query.toLowerCase());
    });
    setEmployers(employe);
  };
  return (
    <>
      <Search
        onChange={handleSearchEmployes}
        placeholder={"Search Employes"}
      ></Search>
      <Title title="Employes" quantity={employers.length}></Title>
      <div>
        {employers.map((employe) => (
          <EmployersCard
            employee={employe}
            key={employe.id}
            isOpen={() => handleOpen(employe)}
          />
        ))}
      </div>
      <div className="large-button--content" onClick={() => handleOpen()}>
        <ActionButton
          title={"Add Employee"}
          className={"button--pink"}
          //   onClick={openModal}
        />
      </div>
      <ModalEmployes
        isOpen={openModal}
        onClose={onClose}
        employeeToEdit={employeeToEdit}
      />
    </>
  );
};
export default Employes;
