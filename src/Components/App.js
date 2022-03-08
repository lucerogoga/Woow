import React from "react";
import "../Assets/App.css";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { RoleComponent } from "./ProtectedRoutes";
import WaiterView from "./WaiterView";
import OrdersResumeWaiter from "../Pages/Waiter/OrdersResumeWaiter";
import TakeOrderWaiter from "../Pages/Waiter/TakeOrderWaiter";
import DetailProduct from "../Pages/Waiter/DetailProduct";
import AdminView from "../Pages/Admin/AdminView";
import ChefView from "../Pages/Chef/ChefView";
import Cart from "./Cart";
import SideBarCartContext from "./Context/SideBarCartContext";
import Employes from "./Employes";
import OrdersToDoChef from "../Pages/Chef/OrdersToDoChef";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <RoleComponent role="admin">
              <AdminView />
            </RoleComponent>
          }
        >
          {/* ANIDADO */}
          <Route path="" element={<Employes />} />
        </Route>

        {/* Waiter Views */}
        <Route
          path="/waiter"
          element={
            <RoleComponent role="waiter">
              <SideBarCartContext>
                <WaiterView />
              </SideBarCartContext>
            </RoleComponent>
          }
        >
          {/* ANIDADO */}
          <Route path="" element={<TakeOrderWaiter />} />
          <Route path="orders-resume" element={<OrdersResumeWaiter />} />
          <Route path="order-cart" element={<Cart />} />
        </Route>

        <Route
          path="/waiter/detail-product"
          element={
            <RoleComponent role="waiter">
              <DetailProduct />
            </RoleComponent>
          }
        ></Route>

        {/* Chef Views */}
        <Route
          path="/chef"
          element={
            <RoleComponent role="chef">
              <ChefView />
            </RoleComponent>
          }
        >
          {/* ANIDADO */}
          <Route path="" element={<OrdersToDoChef />} />
          {/* <Route path="orders-to-do" element={<OrdersToDoChef />} /> */}
          <Route path="orders-delivered" element={<h1>ORDERS DELIVERED</h1>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
