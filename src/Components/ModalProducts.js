import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import label from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

import ActionButton from "./ActionButton";
import InputLabel, { inputLabelClasses } from "@mui/material/InputLabel";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});
const pink = "#ff9aa3";
const yellow = "#fecc68";
const blue = "#283159";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "2rem",
  boxShadow: 24,
  color: blue,
  pt: 2,
  px: 4,
  pb: 3,
};
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
const CreateProduct = () => {
  //aqui obtenemos todos los datos del modal
};
export default function ModalProducts({ isOpen, onClose }) {
  const { productName, setProductName } = useState("");
  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "70%" }}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "20rem" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Product Name"
              variant="outlined"
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              id="outlined-basic"
              label="Price"
              variant="outlined"
            />
            <TextField id="outlined-basic" label="Stock" variant="outlined" />
            <TextField id="outlined-basic" label="Proto" variant="outlined" />
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            <FormControlLabel
              value="options"
              control={<Switch color="default" />}
              label="Details"
              labelPlacement="options"
            />
            <div className="large-button--content" onClick={CreateProduct}>
              <ActionButton
                title={"Create Product"}
                className={"pink-button"}
                //   onClick={openModal}
              />
            </div>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
