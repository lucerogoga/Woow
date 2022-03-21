import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

// const tables = [
//   {
//     value: "Table 1",
//   },
//   {
//     value: "Table 2",
//   },
//   {
//     value: "Table 3",
//   },
//   {
//     value: "Table 4",
//   },
//   {
//     value: "Table 5",
//   },
// ];

export default function InputInfoClient({ onChange, setTable, cleanInfo }) {
  // const [tableNumber, setTableNumber] = useState({value : ''});
  const [tableNumber, setTableNumber] = useState("");
  const [clientName, setClientName] = useState("");

  const handleChange = (nameClient) => {
    onChange(nameClient);
    setClientName(nameClient);
  };
  const handleChangeTable = (tabla) => {
    console.log("ok!, tabla:", tabla);
    setTable(tabla);
    setTableNumber(tabla);
  };

  useEffect(() => {
    if (cleanInfo) {
      handleChangeTable("");
      handleChange("");
    }
  }, [cleanInfo]);

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
        sx={{ minWidth: 250, maxWidth: 300 }}
        // size="small"
      />
      <FormControl sx={{ minWidth: 200, maxWidth: 400 }}>
        <InputLabel id="demo-simple-select-label">Nº Table</InputLabel>
        {/* <TextField
          id="outlined-basic2"
          label="N° Table"
          variant="outlined"
          autoComplete="off"
          value={tableNumber}
          // value={clientName}
          required
          sx={{ minWidth: 200, maxWidth: 300 }}
          size="small"
          select
        > */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tableNumber}
          label="Nº Table"
          required
          sizeSmall
          onChange={(e) => handleChangeTable(e.target.value)}
        >
          <MenuItem value={"Tabla 1"}>Tabla 1</MenuItem>
          <MenuItem value={"Tabla 2"}>Tabla 2</MenuItem>
          <MenuItem value={"Tabla 3"}>Tabla 3</MenuItem>
          <MenuItem value={"Tabla 4"}>Tabla 4</MenuItem>
          <MenuItem value={"Tabla 5"}>Tabla 5</MenuItem>
        </Select>
        {/* </TextField> */}
      </FormControl>
    </>
  );
}
