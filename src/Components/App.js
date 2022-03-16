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

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";

const pink = "#ff9aa3";
const yellow = "#fecc68";
const blue = "#283159";
const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          color: blue,
          fontSize: "1rem",
          borderRadius: "2rem",
          [` .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: pink,
            borderRadius: "2rem",
          },
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: yellow,
          },

          [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
            {
              borderColor: yellow,
            },
        },
        icon: {
          color: pink,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          [`.${inputLabelClasses.root}.${inputLabelClasses.focused}`]: {
            color: blue,
          },
          [`.${outlinedInputClasses.notchedOutline}`]: {
            borderColor: pink,
            borderRadius: "2rem",
          },
          [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
            {
              borderColor: yellow,
              color: yellow,
              borderRadius: "2rem",
            },
          [`& .${outlinedInputClasses.root}:hover .${outlinedInputClasses.notchedOutline}`]:
            {
              borderColor: yellow,
              color: yellow,
            },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: blue,
          [`&.${inputLabelClasses.focused}`]: {
            color: blue,
          },
        },
      },
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
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
            <Route path="add-products" element={<AdminProducts />} />
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
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
