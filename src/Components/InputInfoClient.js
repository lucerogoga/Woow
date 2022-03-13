import React, { useState } from "react";
import InputLabel, { inputLabelClasses } from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";

export default function InputInfoClient({ onChange, setTable }) {
  const [tableNumber, setTableNumber] = useState("");
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
            [`& .${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
              {
                borderColor: yellow,
                color: yellow,
                borderRadius: "2rem",
              },
            [`& :hover .${outlinedInputClasses.notchedOutline}`]: {
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
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  const handleChangeTable = (e) => {
    setTable(e.target.value);
    setTableNumber(e.target.value);
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <TextField
          id="outlined-basic"
          label="Client Name"
          variant="outlined"
          autoComplete="off"
          onChange={handleChange}
          sx={{ minWidth: 200, maxWidth: 300, marginLeft: "1rem" }}
        />
        <FormControl sx={{ minWidth: 200, maxWidth: 400, marginLeft: "1rem" }}>
          <InputLabel id="demo-simple-select-label">Nº Table</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tableNumber}
            label="Nº Table"
            onChange={handleChangeTable}
          >
            <MenuItem value={"Tabla 1"}>Tabla 1</MenuItem>
            <MenuItem value={"Tabla 2"}>Tabla 2</MenuItem>
            <MenuItem value={"Tabla 3"}>Tabla 3</MenuItem>
            <MenuItem value={"Tabla 4"}>Tabla 4</MenuItem>
            <MenuItem value={"Tabla 5"}>Tabla 5</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
}
