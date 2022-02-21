// Login component
import "../Assets/Login.css";
import logo from "../Assets/logo-rotate.svg";
// import logo from "../Assets/logo-woow.svg";
// import logo from "../Assets/woow.PNG";
import Error from "./Error";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/initialize.js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth;

  const handleSubmit = async () => {
    setErrorMessage("");

    try {
      await login(loginEmail, loginPassword);
      navigate("/home");
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <>
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
          {/* {!errorMessage && <div>ok</div>} */}
          {/* {user?.uid} */}
        </div>
      </div>
    </>
  );
};

export default Login;
