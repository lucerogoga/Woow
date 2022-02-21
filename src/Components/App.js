import "../Assets/App.css";
import Login from "./Login";
import Home from "./Home";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { auth } from "../Config/initialize.js";
import { authProvider } from "./Context/AuthContext";

function App() {
  return (
    <authProvider>
      <Routes>
        <Route></Route>
      </Routes>
    </authProvider>
  );
}
