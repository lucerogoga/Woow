import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 20,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ff9aa3",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Roboto"].join(","),
    color: "#283159",
    fontWeight: 700,
    "&:focus": {
      borderRadius: 20,
      borderColor: "#ffefc0",
      boxShadow: "0 0 0 0.1rem #ffefc0",
    },
  },
}));

export default function ControlledOpenSelect({ getTable }) {
  const [table, setTable] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    getTable(table);
  };

  // useEffect(() => {
    // const handleChange = (event) => {
      // setTable((table) => { event.target.value});
      // setTable(event.target.value);
      // getTable(table);
      // setTable(event.target.value);
      // getTable(table);
    // };
  // }, [table]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 320 }} variant="standard">
        {/* <InputLabel htmlFor="demo-customized-textbox">Client</InputLabel> */}
        <BootstrapInput /*id="demo-customized-textbox"*/ />
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
        {/* <InputLabel id="demo-customized-select-label">Table</InputLabel> */}
        <Select
          // labelId="demo-customized-select-label"
          // id="demo-customized-select"
          value={table}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value={"Table 1"}>Table 1</MenuItem>
          <MenuItem value={"Table 2"}>Table 2</MenuItem>
          <MenuItem value={"Table 3"}>Table 3</MenuItem>
          <MenuItem value={"Table 4"}>Table 4</MenuItem>
          <MenuItem value={"Table 5"}>Table 5</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
