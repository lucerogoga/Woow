import React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { useCart } from "./Context/CartContext";

export default function InputInfoClient() {
  const { clientName, setClientName, tableNumber, setTableNumber } = useCart();

  const handleChange = (nameClient) => {
    setClientName(nameClient);
  };
  const handleChangeTable = (tabla) => {
    console.log("ok!, tabla:", tabla);
    setTableNumber(tabla);
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Client Name"
        variant="outlined"
        autoComplete="off"
        value={clientName}
        required
        onChange={(e) => handleChange(e.target.value)}
        sx={{ minWidth: 160, maxWidth: 300 }}
      />
      <FormControl sx={{ minWidth: 160, maxWidth: 400 }}>
        <InputLabel id="demo-simple-select-label">Nº Table</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tableNumber}
          label="Nº Table"
          required
          onChange={(e) => handleChangeTable(e.target.value)}
        >
          <MenuItem value={"Tabla 1"}>Tabla 1</MenuItem>
          <MenuItem value={"Tabla 2"}>Tabla 2</MenuItem>
          <MenuItem value={"Tabla 3"}>Tabla 3</MenuItem>
          <MenuItem value={"Tabla 4"}>Tabla 4</MenuItem>
          <MenuItem value={"Tabla 5"}>Tabla 5</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
