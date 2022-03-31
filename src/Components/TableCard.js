import React from "react";
//Material UI Component
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
//Helpers
import { StyledTableCell } from "../helpers/muiStyles";
import { ccyFormat, total } from "../helpers/mathFunctions";

const TableCard = ({ rows }) => {
  const totalPrice = total(rows);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">Obs.</StyledTableCell>
            <StyledTableCell align="right">Size</StyledTableCell>
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
              <StyledTableCell align="right">{row.observation}</StyledTableCell>
              <StyledTableCell align="right">{row.size}</StyledTableCell>
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
          <StyledTableCell align="right" colSpan={5}>
            {ccyFormat(totalPrice)}
          </StyledTableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
};

export default TableCard;
