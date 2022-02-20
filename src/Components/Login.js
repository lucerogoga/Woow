// Login component
import "../Assets/Login.css";
import logo from "../Assets/woow.PNG";
import Error from "./Error";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/initialize.js";
import React, { useState } from "react";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //   const showMessage = () => {
  //     <Error message="Datos inválidos." />;
  //   };

  const handleSubmit = async () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((res) => {
        console.log(res);
        setErrorMessage("");
        console.log(auth.currentUser.uid);
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      {/* <div>{<Error("Datos")/>}</div> */}
      <div className="login">
        <img alt="logoWoow" className="login--logo" src={logo} />
        <div className="login--form ">
          <input
            id="email"
            className="login--input"
            placeholder="User email"
            onChange={(ev) => setLoginEmail(ev.target.value)}
          ></input>
          <input
            id="password"
            className="login--input"
            placeholder="User password"
            onChange={(ev) => setLoginPassword(ev.target.value)}
          ></input>
          <button
            onClick={handleSubmit}
            id="btnLogin"
            className="login--submit"
          >
            Login
          </button>
          {/* <Error message={errorMessage} />; */}
          {errorMessage && (
            <div className="error"> {<Error message={errorMessage} />} </div>
          )}
          {/* {user?.uid} */}
        </div>
      </div>
    </>
  );
};

export default Login;
