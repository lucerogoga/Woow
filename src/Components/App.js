import "../Assets/App.css";
import Login from "./Login";
import Home from "./Home";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { ProtectedRouter } from "./ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          }
        ></Route>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
