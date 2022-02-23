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
    async function getUserFirestore() {
      // const resultado = await getUser(user.currentUser);
      // console.log("resuuuuuuuuul", resultado);
      const resultado = await getUser(user.currentUser);
      console.log("resuuuuuuuuul", resultado);

      setUserFirestore(resultado);

    }
    const prueba =getUserFirestore();
  }, [user.currentUser, userFirestore]); // Or [] if effect doesn't need props or state

  
  //! · · ·
  const fetchData = useCallback(async () => {
    const data = await fetch('https://yourapi.com');
  
    setData(data);
  }, [])
  
  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [fetchData])
  //! · · ·

  if (user.currentUser) {
    // if (user.currentUser.uid === "8CdkznA4a6UerRNnUqz7eXOeXpV2") {
    console.log("seteadooooooooo", userFirestore);
    console.log("ooooooooooo", user.currentUser);
    // getUser(user.currentUser).then((res) =>
    // );

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
