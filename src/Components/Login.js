import React, { useState } from "react";
import "../Assets/Login.css";
//Components
import logo from "../Assets/icons/logo-rotate.svg";
import Error from "./Error";
import Button from "./ui/Button";
import Input from "./ui/Input";
//Router
import { Navigate } from "react-router-dom";
//Context
import { useAuth } from "./Context/AuthContext";
//Helpers
import { validateEmail } from "../helpers/loginFuntions";

export const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const { login, user } = useAuth();

  const handleDisplayError = () => {
    setDisplayError(false);
  };

  const handleErrorMessage = (e) => {
    setDisplayError(true);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setDisplayError(false);
    if (loginEmail.trim().length === 0 || loginPassword.trim().length === 0) {
      setErrorMessage("Fields must be filled");
      setDisplayError(true);
      return;
    }
    if (!validateEmail(loginEmail)) {
      setErrorMessage(
        "Please enter your email addres in format yourname@example.com"
      );
      setDisplayError(true);
      return;
    }
    try {
      await login(loginEmail, loginPassword);
    } catch (e) {
      handleErrorMessage(e);
    }
  };

  if (user.currentUser) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="login">
      <Error
        message={errorMessage}
        onClose={handleDisplayError}
        isVisible={displayError}
      />
      <div className="login__container">
        <img alt="logoWoow" className="login--logo" src={logo} />
        <div className="login--form">
          <h1 className="subtitle">
            <span>Welcome </span>
            <span>Back!</span>
          </h1>
          <Input
            id="email"
            className="login--input"
            placeholder="enter your email"
            onChange={(ev) => setLoginEmail(ev.target.value)}
          />
          <Input
            id="password"
            type="password"
            className="login--input"
            placeholder="enter your password"
            onChange={(ev) => setLoginPassword(ev.target.value)}
          />
          <Button
            onClick={handleSubmit}
            id="btnLogin"
            className="login--submit"
            text="Login"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
