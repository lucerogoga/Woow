import React, { useState, useEffect } from "react";
import ActionButton from "./ActionButton";
import Title from "./Title";
import Search from "./Search";
import EmployersCard from "./EmployersCard";
import ModalEmployes from "./ModalEmployes";
import "../Assets/Employees.css";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../Config/initialize";

const Employes = () => {
  const [employers, setEmployers] = useState([]);
  const [input, setInput] = useState("");
  const [filteredEmployers, setFilteredEmployers] = useState(employers);
  const [openModal, setOpenModal] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState("");

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
      const allEmployes = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEmployers(allEmployes);

      const filtered = allEmployes.filter((elem) => {
        return elem.user_name.toLowerCase().includes(input.toLowerCase());
      });
      setFilteredEmployers(filtered);
    });
  }, [input]);

  const handleInput = async (query) => {
    setInput(query);
  };

  return (
    <>
      <Search
        value={input}
        onChange={handleInput}
        placeholder={"Search Employes by Name"}
      ></Search>
      <Title title="Employes" quantity={filteredEmployers.length}></Title>

      <div className="container--reverse-employees">
        <div className="products-container-employees">
          {filteredEmployers.map((employe) => (
            <EmployersCard
              employee={employe}
              key={employe.id}
              isOpen={() => handleOpen(employe)}
            />
          ))}
        </div>
        <div
          className="large-button__content--view"
          onClick={() => handleOpen()}
        >
          <ActionButton title={"Add Employee"} className={"button--pink"} />
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
