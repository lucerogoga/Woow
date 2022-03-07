import React from "react";
import "../Assets/App.css";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { RoleComponent } from "./ProtectedRoutes";
import ChefView from "./ChefView";
import WaiterView from "./WaiterView";
import OrdersResumeWaiter from "../Pages/Waiter/OrdersResumeWaiter";
import TakeOrderWaiter from "../Pages/Waiter/TakeOrderWaiter";
import DetailProduct from "../Pages/Waiter/DetailProduct";
import AdminView from "../Pages/Admin/AdminView";
import Cart from "./Cart";
import SideBarCartContext from "./Context/SideBarCartContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/home"
          element={
            <RoleComponent role="admin">
              <AdminView />
            </RoleComponent>
          }
        />

        {/* Waiter Views */}
        <Route path="/" element={<Login />} />
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
          {/* <Route path="detail-product/order-cart" element={<Cart />} /> */}
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
