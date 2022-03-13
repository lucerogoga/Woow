import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../Assets/OrderCard.css";
import { createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { ccyFormat, createData, total } from "../helpers/mathFunctions";
import EyePopover from "./EyePopover";
import { updateOrder } from "../Services/FirestoreServices";
import { useAuth } from "./Context/AuthContext";
import { getUser, serverTimestamp } from "../Services/FirestoreServices";
import ActionButton from "./ActionButton";
import { useRol } from "./Context/RolContex";
import Time from "./Time";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
      blue: "#283159",
      pink: "#ff9aa3",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.white,
    color: theme.palette.primary.blue,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.primary.blue,
  },
}));

const OrderCardFormat = ({ orderData }) => {
  const [userName, setUserName] = useState("");
  // const [startOrder, setStartOrder] = useState(false);

  const userRole = useRol();
  const {
    user: { currentUser },
  } = useAuth();

  const rows = orderData.order_products.map((product) => {
    let observation = "";
    let size = "";

    // let observationExist = "";

    // if (cartProduct.observation) {
    //   cartProduct.observation.trim() !== ""
    //     ? (observationExist = <EyePopover obs={cartProduct.observation} />)
    //     : (observationExist = "");
    // }

    if ("observation" in product || product.observation !== "") {
      observation = <EyePopover obs={product.observation} />;
    }
    if (size) {
      size = product.size;
    }
    return createData(
      product.product_name,
      observation,
      product.qty,
      +product.unitCost
    );
  });

  // Total of all products
  const invoiceTotal = total(rows);

  let chefId;

  !orderData.chef_name
    ? (chefId = "Not assigned")
    : (chefId = orderData.chef_name);
  let location = useLocation();
  const { pathname } = location;

  // ! --------------------

  const handleStatus = (orderStatus) => {
    // debugger;
    console.log("mi estado actual", orderData.order_status);
    console.log("el que quiero colocar", orderStatus);

    if (orderData.order_status === "Pending" && userRole === "waiter") {
      // ! EMPIEZA EL CRONOMETRO CUANDO HAYA EMPEZADO.
      console.log("Pending && waiter");
      // Si el estado está en pendiente, lo cambia a cooking
      updateOrder(currentUser, orderData.id, "Canceled", userName);
    }
    if (orderData.order_status === "Ready to Serve" && userRole === "waiter") {
      // ! EMPIEZA EL CRONOMETRO CUANDO HAYA EMPEZADO.
      console.log("Ready to Serve && waiter");
      // Si el estado está en pendiente, lo cambia a cooking
      updateOrder(currentUser, orderData.id, "Delivered", userName);
    }
    if (orderData.order_status === "Pending" && userRole === "chef") {
      console.log("Pending && chef");
      // ! EMPIEZA EL CRONOMETRO CUANDO HAYA EMPEZADO.
      // Si el estado está en pendiente, lo cambia a cooking
      updateOrder(currentUser, orderData.id, "Cooking", userName);
    }
    if (orderData.order_status === "Cooking" && userRole === "chef") {
      console.log("Cooking && chef");
      updateOrder(currentUser, orderData.id, "Ready to Serve", userName);
      // ! FINALIZA EL CRONOMETRO
    }
  };

  useEffect(() => {
    async function settingUserName() {
      const { user_name } = await getUser(currentUser);
      setUserName(user_name);
    }

    settingUserName();
  }, []);

  console.log("ESTE ES MI ORDER STATUS", orderData.order_status);
  console.log("ORDER TIME START", orderData.order_timestamp);
  console.log("ORDER TIME START AHORA", orderData.order_timestamp.toDate());
  // ! --------------------

  return (
    <div className="products-container">
      <div className="order-card">
        <div className="order-card--header">
          <div className="order-card--info-container">
            <div className="order-card--titles-container">
              <h3 className="order-card--info-title">Order N°:</h3>
              <h3 className="order-card--info-title">Client:</h3>
              <h3 className="order-card--info-title">Chef:</h3>
              <h3 className="order-card--info-title">Table N°:</h3>
            </div>
            <div className="order-card--infos-container">
              <div className="order-card--info-p">000036</div>
              <div className="order-card--info-p">{orderData.client_name}</div>
              <div className="order-card--info-p">{chefId}</div>
              <div className="order-card--info-p">{orderData.table}</div>
            </div>
          </div>
          <div className="order-card--right-container">
            {/* <div className="order-cart--containertime">
              <Clock className="order-cart--clock" width={16} height={16} />
              <h3 className="order-cart--minutes">00:30:00</h3>
            </div> */}
            <Time start={orderData.order_timestamp} />
          </div>
        </div>
        <div className="order-card--table-container">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Product</StyledTableCell>
                  <StyledTableCell align="right">Obs.</StyledTableCell>
                  <StyledTableCell align="right">Qty</StyledTableCell>
                  <StyledTableCell align="right">Unit Price</StyledTableCell>
                  <StyledTableCell align="right">Sum</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.observation}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.qty}</StyledTableCell>
                    <StyledTableCell align="right">
                      {ccyFormat(row.unitPrice)}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {ccyFormat(row.sum)}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>

              {/* Total */}
              <TableRow>
                <TableHead>
                  <StyledTableCell>Total</StyledTableCell>
                </TableHead>
                <StyledTableCell align="right" colSpan={4}>
                  {ccyFormat(invoiceTotal)}
                </StyledTableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </div>

        {pathname === "/chef" && (
          <div className="order-card--buttonsContainer">
            <button
              onClick={() => handleStatus()}
              className="order-card--button--cooking"
            >
              {orderData.order_status === "Pending"
                ? "Start Cooking"
                : "Order Ready"}
            </button>
          </div>
        )}

        {pathname === "/waiter/orders-resume" && (
          <div
            onClick={() => handleStatus()}
            className="order-card--buttonsContainer"
          >
            {orderData.order_status === "Pending" ? (
              <ActionButton
                onClick={() => handleStatus()}
                title="Cancel Order"
                className="order-card--button--cooking"
              />
            ) : orderData.order_status === "Ready to Serve" ? (
              <ActionButton
                onClick={() => handleStatus()}
                title="Deliver Order"
                className="order-card--button--cooking"
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCardFormat;
// if (orderData.order_status === "Pending") {
//   // ! EMPIEZA EL CRONOMETRO CUANDO HAYA EMPEZADO.
//   // Si el estado está en pendiente, lo cambia a cooking
//   updateOrder(currentUser, orderData.id, "Cooking", userName);
// }

// if (orderData.order_status === "Cooking"  ) {
//   updateOrder(currentUser, orderData.id, "Ready to Serve", userName);
//   // ! FINALIZA EL CRONOMETRO
// }
