// Login component
import "../Assets/Login.css";
import logo from "../Assets/logo-rotate.svg";
import Error from "./Error";
import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
// import { getUser } from "./Context/FirestoreContext";
import { getUser } from "./Context/FirestoreContext";

export const Login = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, user } = useAuth();
  const [userFirestore, setUserFirestore] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      console.log("entramos a validar");
      await login(loginEmail, loginPassword);
      console.log("si se pudo loguear");
      navigate("/home");
    } catch (e) {
      console.log("error ingreso");
      setErrorMessage(e.message);
    }
  };

  // Si el usuario ya está logueado, entonces cambia a la vista de Home
  // if (user.currentUser && user.user_role) {

  useEffect(() => {
    // getProducts().then((p) => setProducts(p));
    getUser(user.currentUser).then((res) => console.log("aquiiii", res));
  }, []);

  // getUser(user.currentUser).then((res) => console.log("aquiiii", res));

  // console.log("ooooooooooo", user.currentUser.uid);

  if (user.currentUser) {
    // if (user.currentUser.uid === "8CdkznA4a6UerRNnUqz7eXOeXpV2") {
    console.log("ooooooooooo", user.currentUser);
    return <Navigate to="/home" />;
  }

  return (
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
          type="password"
          className="login--input"
          placeholder="User password"
          onChange={(ev) => setLoginPassword(ev.target.value)}
        ></input>
        <button onClick={handleSubmit} id="btnLogin" className="login--submit">
          Login
        </button>
        {errorMessage && (
          <div className="error"> {<Error message={errorMessage} />} </div>
        )}
      </div>
    </div>
  );
};

export default Login;
