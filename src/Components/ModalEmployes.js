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
import Switch from "../Components/Switch";
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

export default function ModalEmployes({ isOpen, onClose, employeeToEdit }) {
  const [userRoles, setUserRoles] = useState(["waiter", "chef", "admin"]);
  // const [userRoles, setUserRoles] = useState(["Waiter", "Chef", "Admin"]);
  const { createUser } = useAuth();
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userStatus, setUserStatus] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [loading, setLoading] = useState(false);

  // const [checked, setChecked] = useState(true);
  const [checked, setChecked] = useState(false);

  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  console.log("hay usuario editado?, ", employeeToEdit);

  const handleCreateUser = async () => {
    //aqui obtenemos todos los datos del modal
    //primero subimos la imagen luego creamos el objeto en la base de datos
    setLoading(true);

    const userID = await createUser(userEmail, userPwd);
    createUserFirebase(
      userID,
      userRole,
      userStatus,
      userName,
      userEmail,
      userPwd
    )
      .then((res) => {
        onClose();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChangeRole = (e) => {
    setUserRole(e.target.value);
  };

  const cleanForm = () => {
    setUserRole("");
    setUserName("");
    setUserStatus("");
    setUserEmail("");
    setUserPwd("");
    // ! ----- el de abajo también?
    setLoading("");
  };

  useEffect(() => {
    if (employeeToEdit) {
      setUserRole(employeeToEdit.user_rol);
      setUserName(employeeToEdit.user_name);
      setUserEmail(employeeToEdit.user_email);
      setUserPwd("");
      // ! ----- el de abajo también?
      setLoading("");
      // !--- el switch
      setUserStatus(employeeToEdit.user_status);
      setChecked(employeeToEdit.user_status);
      // setChecked(false)
    }

    return () => cleanForm();
  }, [employeeToEdit]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: "70%" }}>
        <Grid container gap="1rem" sx={{ minHeight: "425px" }}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Category Rol
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
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
                value={userName}
                variant="outlined"
                autoComplete="off"
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                label="Email"
                variant="outlined"
                value={userEmail}
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
              <label>Activo</label>
              <Switch checked={checked} onChange={switchHandler} />
              {/* <Switch status={setUserStatus}/> */}

              {/* <Switch/> */}
              <div className="large-button--content" onClick={handleCreateUser}>
                <ActionButton
                  title={"Create Employee"}
                  className={"button--pink"}
                />
              </div>
            </>
          )}
        </Grid>
      </Box>
    </Modal>
  );
}
