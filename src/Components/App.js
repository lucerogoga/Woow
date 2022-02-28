import "../Assets/App.css";
import Login from "./Login";
import Home from "./Home";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { RoleComponent } from "./ProtectedRoutes";
import ChefView from "./ChefView";
import WaiterView from "./WaiterView";
import OrdersResumeWaiter from "../Pages/Waiter/OrdersResumeWaiter";
import TakeOrderWaiter from "../Pages/Waiter/TakeOrderWaiter";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/home"
          element={
            <RoleComponent role="admin">
              <Home />
            </RoleComponent>
          }
        ></Route>

        {/* Waiter Views */}
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/waiter"
          element={
            <RoleComponent role="waiter">
              {/* <h1>Listado de productos</h1> */}
              <WaiterView />
            </RoleComponent>
          }
        >
          {/* ANIDADO */}
          <Route
            path="orders-resume"
            element={
              <RoleComponent role="waiter">
                <OrdersResumeWaiter />
              </RoleComponent>
            }
          ></Route>
          <Route
            path="take-order"
            element={
              <RoleComponent role="waiter">
                <TakeOrderWaiter />
              </RoleComponent>
            }
          ></Route>
        </Route>
        {/* <Route
          path="/waiter/product-detail"
          element={
            <RoleComponent role="waiter">
              <h1>Producto Detallado</h1>
            </RoleComponent>
          }
        ></Route> */}
        <Route
          path="/waiter/order-cart"
          element={
            <RoleComponent role="waiter">
              <h1>Carrito</h1>
            </RoleComponent>
          }
        ></Route>
        <Route
          path="/waiter/orders-resume"
          element={
            <RoleComponent role="waiter">
              <h1>Carrito</h1>
            </RoleComponent>
          }
        ></Route>

        {/* Chef Views */}
        <Route
          path="/chef"
          element={
            <RoleComponent role="chef">
              <h1>
                <ChefView />
              </h1>
            </RoleComponent>
          }
        ></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
