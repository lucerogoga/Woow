import React, { useState } from "react";
import "../Assets/Login.css";
//Components
import logo from "../Assets/icons/logo-rotate.svg";
import Error from "./Error";
//Router
import { useNavigate, Navigate } from "react-router-dom";
//Context
import { useAuth } from "./Context/AuthContext";
//Firebase Conection
import { getUser } from "../Services/FirestoreServices";
// import { useRol } from "./Context/RolContex";
//Helpers
import { validateEmail } from "../helpers/loginFuntions";

export const Login = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const { login, user } = useAuth();
  // const { userRole } = useRol();

  const handleDisplayError = () => {
    setDisplayError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setDisplayError(false);
    setTimeout(async () => {
      console.log("fuera", loginEmail, loginPassword);
      if (loginEmail.trim().length === 0 || loginPassword.trim().length === 0) {
        setErrorMessage("Fields must be filled");
        setDisplayError(true);
      } else if (!validateEmail(loginEmail)) {
        setErrorMessage(
          "Please enter your email addres in format yourname@example.com"
        );
        setDisplayError(true);
      } else {
        try {
          const user = await login(loginEmail, loginPassword);
          const { user_rol: role } = await getUser(user.user.uid);
          if (role === "admin") navigate("/admin");
          else if (role === "chef") navigate("/chef");
          else navigate("/waiter");
        } catch (e) {
          switch (e.message) {
            case "Firebase: Error (auth/user-not-found).":
              setErrorMessage("User not found.");
              break;
            case "Firebase: Error (auth/wrong-password).":
              setErrorMessage("Your username and/or password do not match");
              break;
            case "Firebase: Error (auth/user-not-found).3":
              setErrorMessage(e.message);
              break;
            default:
              setErrorMessage("Error not recognized");
              setErrorMessage(e.message);
              break;
          }
          setDisplayError(true);
        }
      }
    }, 200);
  };

  // ! INTENTO DE CAMBIO DE VISTAS POR ROL.
  // if (user.currentUser && userRole === "waiter") {
  //   return <Navigate to="/waiter" />;
  // } else if (user.currentUser && userRole === "chef") {
  //   return <Navigate to="/chef" />;
  // } else if (user.currentUser && userRole === "admin") {
  //   return <Navigate to="/admin" />;
  // }

  if (user.currentUser) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="login">
      <div className="login__container">
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
            type="password"
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
          <div className="error">
            <Error
              message={errorMessage}
              onClose={handleDisplayError}
              isVisible={displayError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
