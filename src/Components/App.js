import "../Assets/App.css";
import Login from "./Login";
import Home from "./Home";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { ProtectedRouter, RoleProtectedRouter } from "./ProtectedRoutes";

import NavBar from "./NavBar";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/home"
          element={
            <RoleProtectedRouter role="admin">
              <Home />
            </RoleProtectedRouter>
          }
        ></Route>

        {/* Waiter Views */}
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/waiter"
          element={
            <RoleProtectedRouter role="waiter">
              <h1>Listado de productos</h1>
            </RoleProtectedRouter>
          }
        ></Route>
        <Route
          path="/waiter/product-detail"
          element={
            <RoleProtectedRouter>
              <h1>Producto Detallado</h1>
            </RoleProtectedRouter>
          }
        ></Route>
        <Route
          path="/waiter/order-cart"
          element={
            <RoleProtectedRouter role="waiter">
              <h1>Carrito</h1>
            </RoleProtectedRouter>
          }
        ></Route>
        {/* <Route path="/Button" element={<ButtonFilter />}></Route> */}
        {/* Chef Views */}

        <Route
          path="/chef"
          element={
            <RoleProtectedRouter role="chef">
              <h1>Vista de pedidos enviados por el mesero</h1>
            </RoleProtectedRouter>
          }
        ></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
