// Login component
import "../Assets/Login.css";
import logo from "../Assets/woow.PNG";
import Error from "./Error";
import { signInWithEmailAndPassword } from "firebase/auth";
import app from "../Config/initialize.js";
import { getAuth } from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

const Login = () => {
  //   const showMessage = () => {
  //     <Error message="Datos inválidos." />;
  //   };

  //   const handleSubmit = () => {
  //     const email = document.querySelector("#email");
  //     const password = document.querySelector("#password");

  //     console.log(email.value);
  //     console.log(password.value);
  //     return enviarIngreso(email, password)
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log("probando", err);
  //       });
  //   };

  const [loginEmail, setLoginEmail] = useState("");
  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
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
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          ></input>
          <input
            id="password"
            className="login--input"
            placeholder="User password"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          ></input>
          {/* <button onClick={(e) => e.preventDefault()} className="login--submit"> */}
          <button
            onClick={handleSubmit}
            // onClick={(e) => {
            //   //   e.preventDefault();
            //   handleSubmit();
            // }}
            className="login--submit"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

// function enviarIngreso(email, password) {
//   return signInWithEmailAndPassword(auth, email, password);
// }
