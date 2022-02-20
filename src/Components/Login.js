// Login component
import "../Assets/Login.css";
import logo from "../Assets/woow.PNG";
// import Error from "./Error";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Config/initialize.js";

import React, { useState, useEffect } from "react";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (userfirebase) => {
    if (userfirebase) {
      const UserData = {
        uid: userfirebase.uid,
        email: userfirebase.email,
      };
      setUser(UserData);
    } else {
      setUser(null);
    }
  });
  //   const showMessage = () => {
  //     <Error message="Datos inválidos." />;
  //   };
  //   const [email, setEmail] = useState("");
  //   const enviarIngreso = (email, password) => {
  //     return signInWithEmailAndPassword(auth, email, password);
  //   };

  const handleSubmit = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      user.then((user) => {
        console.log(user.email);
      });
    } catch (error) {
      console.log(error.message);
    }

    // .then((res) => {
    //   console.log(res);
    // })
    //   .catch((error) => {
    //     console.log("probando", error);
    //   });
    //   enviarIngreso.then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log("probando", err);
    // });

    //   const [loginEmail, setLoginEmail] = useState("");
    //   const login = async () => {
    //     await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <>
      {/* <div>{<Error("Datos")/>}</div> */}
      <div className="login">
        {/* <Error message="Datos inválidos." />; */}
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
          <h4>user Logged in :</h4>
          {user?.email}
        </div>
      </div>
    </>
  );
};

export default Login;
