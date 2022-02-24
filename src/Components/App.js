import "../Assets/App.css";
import Login from "./Login";
import Home from "./Home";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { ProtectedRouter } from "./ProtectedRoutes";
import NavBar from "./NavBar";

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

        {/* Waiter Views */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/waiter" element={<h1>Listado de productos</h1>}></Route>
        <Route
          path="/waiter/product-detail"
          element={<h1>Producto Detallado</h1>}
        ></Route>
        <Route path="/waiter/order-cart" element={<h1>Carrito</h1>}></Route>
        {/* <Route path="/Button" element={<ButtonFilter />}></Route> */}
        {/* Chef Views */}

        <Route
          path="/chef"
          element={<h1>Vista de pedidos enviados por el mesero</h1>}
        ></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
