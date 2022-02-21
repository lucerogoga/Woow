import "../Assets/App.css";
import Login from "./Login";
import Home from "./Home";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "../Config/initialize.js";
import { authProvider } from "./Context/AuthContext";
import { ProtectedRouter } from "./ProtectedRoutes";

function App() {
  return (
    <authProvider>
      <Routes>
        <Route path="/" element={Login}></Route>
        <Route
          path="/home"
          element={
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          }
        ></Route>
      </Routes>
    </authProvider>
  );
}

export default App;
