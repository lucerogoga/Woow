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
  const [filteredEmployers, setFilteredEmployers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState("");
  const [userEmployees, setUserEmployees] = useState("");
  console.log("employeeToEdit base, ", employeeToEdit);

  const handleOpen = (employee) => {
    setOpenModal(true);
    setEmployeeToEdit(employee);
  };

  const onClose = () => {
    setOpenModal(false);
  };

  // const {
  //   user: { currentUser },
  // } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "users"));

    return onSnapshot(q, (snapshot) => {
      setEmployers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("escuchando ando, ");
    });

    console.log("funcionooo?");
    // }, [currentUser]);
  }, []);

  // useEffect(() => {
  //   getEmployers().then((employers) => setEmployers(employers));
  // }, []);

  const handleSearchEmployes = async (query) => {
    console.log("mi query es, ", query);

    const filteredEmployers = employers.filter((elem) => {
      return elem.user_name.toLowerCase().includes(query.toLowerCase());
    });
    setEmployers(filteredEmployers);

    // ! mi intento de filtrado con snapshot
    // console.log("mi query es, ", query);
    // const employersList = employers;

    // if (query.length > 0) {
    //   const filteredEmployers = employers.filter((elem) => {
    //     return elem.user_name.toLowerCase().includes(query.toLowerCase());
    //   });
    //   setEmployers(filteredEmployers);
    // } else {
    //   setEmployers(employersList);
    // }
  };
  return (
    <>
      <Search
        onChange={handleSearchEmployes}
        placeholder={"Search Employes by Name"}
      ></Search>
      <Title title="Employes" quantity={employers.length}></Title>

      {/* <div className="container--reverse"> */}
      <div className="container--reverse-employees">
        {/* deberia colocar un nombre al div que contiene las tarjetas, el de abajo */}
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
