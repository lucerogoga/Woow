import React, { useState, useEffect } from "react";
import ActionButton from "./ActionButton";
import Title from "./Title";
import Search from "./Search";
import { getEmployers } from "../Services/FirestoreServices";
import EmployersCard from "./EmployersCard";
import ModalEmployes from "./ModalEmployes";
import "../Assets/Employees.css";
// import "../../Assets/Employees.css";
// import "../../Assets/AdminProducts.css";
// ---
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../Config/initialize";

import { useAuth } from "../Components/Context/AuthContext";
// import { useAuth } from "../../Components/Context/AuthContext";

const Employes = () => {
  const [employers, setEmployers] = useState([]);
  // const [filteredEmployers, setFilteredEmployers] = useState([...employers]);
  const [filteredEmployers, setFilteredEmployers] = useState(employers);
  const [openModal, setOpenModal] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState("");
  const [userEmployees, setUserEmployees] = useState("");

  const handleOpen = (employee) => {
    setOpenModal(true);
    setEmployeeToEdit(employee);
  };

  const onClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const q = query(collection(db, "users"));

    return onSnapshot(q, (snapshot) => {
      // const usersEmployers = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setEmployers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setFilteredEmployers(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  const handleSearchEmployes = async (query) => {
    // const prueba = filteredEmployers
    const prueba = employers;

    const filteredEmployers = prueba.filter((elem) => {
      return elem.user_name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredEmployers(filteredEmployers);
  };
  return (
    <>
      <Search
        onChange={handleSearchEmployes}
        placeholder={"Search Employes by Name"}
      ></Search>
      {/* <Title title="Employes" quantity={employers.length}></Title> */}
      <Title title="Employes" quantity={filteredEmployers.length}></Title>

      {/* <div className="container--reverse"> */}
      <div className="container--reverse-employees">
        {/* deberia colocar un nombre al div que contiene las tarjetas, el de abajo */}
        {/* <div className="products-container vh"> */}
        <div className="products-container-employees">
          {/* <div className="products-container-employees vh"> */}
          {/* {employers.map((employe) => ( */}
          {filteredEmployers.map((employe) => (
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
