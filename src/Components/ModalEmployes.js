import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import InputLabel from "@mui/material/InputLabel";
import { v4 as uuidv4 } from "uuid";

import { ReactComponent as Spinner } from "../Assets/icons/Spinner.svg";

import {
  getProductsCategories,
  createProductFirebase,
  uploadImage,
  createUserFirebase,
} from "../Services/FirestoreServices";

import ActionButton from "./ActionButton";

import { Grid, InputAdornment } from "@mui/material";
import { useAuth } from "./Context/AuthContext";

const Input = styled("input")({
  display: "none",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "2rem",
  boxShadow: 24,
  color: "#283159",
  p: 5,
};

export default function ModalEmployes({ isOpen, onClose }) {
  const [userRoles, setUserRoles] = useState(["waiter", "chef", "admin"]);
  // const [productCategories, setProductCategories] = useState([]);
  // useEffect(() => {
  // getProductsCategories().then((category) => setProductCategories(category));
  // }, []);
  const { createUser } = useAuth();
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userStatus, setUserStatus] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");
  // const [loading, setLoading] = useState(true);
  //const [userId, setUserId] = useState("");

  // useEffect(async () => {
  //   setUserId(userID);
  // }, []);

  const handleCreateUser = async () => {
    //aqui obtenemos todos los datos del modal
    //primero subimos la imagen luego creamos el objeto en la base de datos
    console.log("firestore llamando");
    const userID = await createUser(userEmail, userPwd);

    console.log("este es un user devuelto del second app, ", userID);
    // const downloadUrl = await uploadImage(productPhoto, categoryId);
    // if (loading) return <Spinner />;
    // debugger;
    createUserFirebase(
      userID,
      userRole,
      userStatus,
      userName,
      userEmail,
      userPwd
    ).then((res) => {
      //   setLoading(false);
      console.log("usuario subido");
    });
  };

  // const onChange = (e) => {
  //   setProductPhoto(e.target.files[0]);
  // };
  const handleChangeRole = (e) => {
    setUserRole(e.target.value);
    // userRole(e.target.value);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: "70%" }}>
        <Grid container gap="1rem">
          <FormControl
            fullWidth
            //sx={{ minWidth: 200, maxWidth: 400, marginLeft: "1rem" }}
          >
            <InputLabel id="demo-simple-select-label">Category Rol</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // id={handleNameCategory}
              value={userRole}
              label="Category Rol"
              onChange={handleChangeRole}
            >
              {userRoles.map((cat, i) => {
                return (
                  <MenuItem value={cat} key={uuidv4()}>
                    {cat}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="User Name"
            variant="outlined"
            autoComplete="off"
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            autoComplete="off"
            onChange={(e) => setUserStatus(e.target.value)}
          />
          <TextField
            fullWidth
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            label="Email"
            variant="outlined"
            autoComplete="off"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            autoComplete="off"
            onChange={(e) => setUserPwd(e.target.value)}
          />

          {/* <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              required
              onChange={onChange}
            />
            <IconButton aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label> */}
          {/* <FormControlLabel
              value="options"
              control={<Switch color="default" />}
              label="Details"
              labelPlacement="options"
            /> */}
          <div className="large-button--content" onClick={handleCreateUser}>
            <ActionButton title={"Create Product"} className={"pink-button"} />
          </div>
        </Grid>
      </Box>
    </Modal>
  );
}
