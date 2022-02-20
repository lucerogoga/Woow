// Login component
import "../Assets/Login.css";
import logo from "../Assets/woow.PNG";
import Error from "./Error";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/initialize.js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //   const showMessage = () => {
  //     <Error message="Datos inválidos." />;
  //   };
  const handleSubmit = async () => {
    setErrorMessage("");
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((res) => {
        console.log(res);
        console.log(auth.currentUser.uid);
        navigate("/home");
        // <Redirect to="/home" component={<Home />} />;
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
          {!errorMessage && <div>ok</div>}
          {/* {user?.uid} */}
        </div>
      </div>
    </>
  );
};

export default Login;
