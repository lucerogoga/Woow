import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ReactComponent as Clock } from "../Assets/icons/clock.svg";
import { ReactComponent as Eye } from "../Assets/icons/eye.svg";
import "../Assets/OrderCard.css";
import { createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

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

function ccyFormat(num) {
  return `$ ${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createData(name, observation, qty, unitPrice) {
  const sum = priceRow(qty, unitPrice);
  return { name, observation, qty, unitPrice, sum };
}

// function createRow(desc, qty, unit) {
//   return { desc, qty, unit, price };
// }

function total(items) {
  return items.map(({ sum }) => sum).reduce((sum, i) => sum + i, 0);
}

const rows = [
  // createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Frozen yoghurt", <Eye />, 6, 24.0),
  createData("Ice cream sandwich", "", 9.0, 37),
  createData("Eclair", "", 2, 24),
  createData("Cupcake", <Eye />, 4, 67),
  createData("Gingerbread", <Eye />, 1, 49),
];

const invoiceTotal = total(rows);
console.log("PROBANDOOO, ", invoiceTotal);

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

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     // backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

const OrderCardFormat = () => {
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
              <div className="order-card--info-p">Mariana Rodriguez</div>
              <div className="order-card--info-p">Pancho Hernandez</div>
              <div className="order-card--info-p">1</div>
            </div>
          </div>
          <div className="order-card--right-container">
            <div className="order-cart--containertime">
              <Clock className="order-cart--clock" width={16} height={16} />
              <h3 className="order-cart--minutes">00:30:00</h3>
            </div>
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
                      {/* {row.qty * row.unitPrice} */}
                      {ccyFormat(row.sum)}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>

              {/* Total */}
              <TableRow>
                <TableHead>
                  {/* <StyledTableCell colSpan={4}>Total</StyledTableCell> */}
                  <StyledTableCell>Total</StyledTableCell>
                </TableHead>
                <StyledTableCell align="right" colSpan={4}>
                  {ccyFormat(invoiceTotal)}
                  {/* {"TLDFJKSDLKJ"} */}
                </StyledTableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderCardFormat;
