import React, { useState, useEffect } from "react";
import ActionButton from "./ActionButton";
import Title from "./Title";
import Search from "./Search";
import { getEmployers } from "../Services/FirestoreServices";
import EmployersCard from "./EmployersCard";
const Employes = () => {
  const [employers, setEmployers] = useState([]);

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
  console.log(employers);
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
      <ActionButton
        title="Add Employes"
        className={"pink-button"}
      ></ActionButton>
    </>
  );
};
export default Employes;
