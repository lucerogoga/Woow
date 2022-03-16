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

  const handleOpen = () => {
    setOpenModal(true);
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
          <EmployersCard employee={employe} key={employe.id} />
        ))}
      </div>
      <div className="large-button--content" onClick={handleOpen}>
        <ActionButton
          title={"Add Employee"}
          className={"pink-button"}
          //   onClick={openModal}
        />
      </div>
      <ModalEmployes isOpen={openModal} onClose={onClose} />
    </>
  );
};
export default Employes;
