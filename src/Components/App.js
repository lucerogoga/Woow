import "../Assets/App.css";
import Login from "./Login";
import Home from "./Home";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { auth } from "../Config/initialize.js";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
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
  }, []);

  if (user) {
    console.log("hola soy user");
  }
  // return (
  //   <>
  //     <Login />
  //     {user && <Home />}
  //   </>
  // );
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
