import React from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./Context/AuthContext";
import { RoleComponent } from "./ProtectedRoutes";
import SideBarCartContext from "./Context/SideBarCartContext";

import Login from "./Login";
import WaiterView from "../Pages/Waiter/WaiterView";
import TakeOrderWaiter from "../Pages/Waiter/TakeOrderWaiter";
import OrdersResumeWaiter from "../Pages/Waiter/OrdersResumeWaiter";
import DetailProduct from "../Pages/Waiter/DetailProduct";
import Cart from "./Cart";

import ChefView from "../Pages/Chef/ChefView";

import AdminView from "../Pages/Admin/AdminView";
import Employes from "./Employes";
import OrdersResumeAdmin from "../Pages/Admin/OrdersResume";
import AdminProducts from "../Pages/Admin/AdminProducts";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RoleComponent role="admin">
              <SideBarCartContext>
                <AdminView />
              </SideBarCartContext>
            </RoleComponent>
          }
        >
          {/* ANIDADO */}
          <Route path="" element={<Employes />} />
          <Route path="orders" element={<OrdersResumeAdmin />} />
          <Route path="addProducts" element={<AdminProducts />} />
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
        ></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
