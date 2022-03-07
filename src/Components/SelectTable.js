import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ControlledOpenSelect() {
  const [table, setTable] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setTable(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel
          className="labelTable"
          id="demo-controlled-open-select-label"
        >
          Table
        </InputLabel>
        <Select
          className="table--input"
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={table}
          label="Table"
          onChange={handleChange}
        >
          <MenuItem value={10}>Table 1</MenuItem>
          <MenuItem value={20}>Table 2</MenuItem>
          <MenuItem value={30}>Table 3</MenuItem>
          <MenuItem value={40}>Table 4</MenuItem>
          <MenuItem value={50}>Table 5</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
