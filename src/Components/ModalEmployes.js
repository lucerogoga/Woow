import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import SwitchCustom from "../Components/Switch";
import { v4 as uuidv4 } from "uuid";
import {
  validateEmail,
  validateName,
  validateEmailDomains,
  validatePassword,
} from "../helpers/loginFuntions";

import { ReactComponent as Spinner } from "../Assets/icons/Spinner.svg";

import {
  getProductsCategories,
  createProductFirebase,
  uploadImage,
  createUserFirebase,
  updateUser,
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
  const { createUser, auth2, changeUserDataAuth, signOut } = useAuth();

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userNewEmail, setUserNewEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userStatus, setUserStatus] = useState(false);
  const [userPwd, setUserPwd] = useState("");
  const [userNewPwd, setUserNewPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [secondUser, setSecondUser] = useState([]);

  const switchHandler = (event) => {
    console.log("el switch funciona, ", event.target.checked);
    setChecked(event.target.checked);
  };

  const cleanForm = () => {
    setUserId("");
    setUserNewEmail("");
    setUserRole("");
    setUserName("");
    setUserStatus(false);
    setUserEmail("");
    setUserPwd("");
    setChecked(false);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employeeToEdit) {
      editUserFirestore();
    } else {
      createUserFirestore();
    }
  };

  const editUserFirestore = async () => {
    if (userName.trim()?.length === 0) {
      return console.log("INGRESA UN NOMBRE VÁLIDO");
    }
    if (
      userNewEmail.trim()?.length !== 0 &&
      !validateEmailDomains(userNewEmail)
    ) {
      return console.log("EL CORREO DEBE TENER UN FORMATO!");
    }
    if (userEmail.trim() === userNewEmail.trim()) {
      return console.log("INGRESA UN CORREO NUEVO!");
    }
    if (userNewPwd.trim()?.length !== 0 && !validatePassword(userNewPwd)) {
      console.log("quee?, ", userNewPwd);
      return console.log("LA CONTRASEÑA DEBE TENER MINIMO 6 CARÁCTERES");
    }

    // The spinner is active
    setLoading(true);

    const emailCurrent = userNewEmail ? userNewEmail : userEmail;
    const pwdCurrent = userNewPwd ? userNewPwd : userPwd;

    changeUserDataAuth(userEmail, emailCurrent, userPwd, pwdCurrent, userName)
      .then((res) => {
        onClose();

        return updateUser(
          userId,
          userName,
          emailCurrent,
          userRole,
          checked,
          pwdCurrent
        );
      })
      .catch((e) => console.log(e.message))
      .finally(() => {
        // onClose();
        setLoading(false);
        cleanForm();
      });
  };

  const createUserFirestore = () => {
    if (!userRole) {
      return console.log("INGRESE UN ROL!");
    }
    if (userName.trim()?.length === 0) {
      return console.log("INGRESA UN NOMBRE VALIDO");
    }
    if (!validateName(userName)) {
      return console.log("SOLO INGRESE LETRAS EN EL NOMBRE");
    }
    if (userNewEmail.trim()?.length === 0) {
      return console.log("INGRESE UN CORREO!");
    }
    if (!validateEmail(userNewEmail)) {
      return console.log("EL CORREO DEBE TENER UN FORMATO!");
    }
    if (!validateEmailDomains(userNewEmail)) {
      return console.log(
        "EL CORREO DEBE SER GMAIL O OUTLOOK O HOTMAIL!  con .com"
      );
    }
    if (userNewPwd.trim()?.length === 0) {
      return console.log("INGRESE UNA CONTRASEÑA");
    }

    if (!validatePassword(userNewPwd)) {
      return console.log("LA CONTRASEÑA DEBE TENER MINIMO 6 CARÁCTERES");
    }

    cleanForm();
    setLoading(true);

    createUser(userNewEmail, userNewPwd)
      // .then((res) => {
      //   console.log("qué obtengo de aquí?, ", res);
      //   const { userId } = res;
      //   return userId;
      // })
      .then((userID) => {
        return createUserFirebase(
          userID,
          userRole,
          checked,
          userName,
          userNewEmail,
          userNewPwd
        );
      })
      .then((newUser) => {
        return signOut(auth2);
      })
      .then(() => {
        onClose();
        setLoading(false);
      })
      .catch((e) => {
        onClose();
        setLoading(false);
        switch (e.message) {
          case "Firebase: Error (auth/email-already-in-use).":
            console.log("Email already in use.");
            break;
          default:
            console.log("Error not handled: ", e.message);
        }
      })
      .finally(() => {
        setLoading(false);
        onClose();
        cleanForm();
      });
  };

  const handleChangeRole = (e) => {
    setUserRole(e.target.value);
  };

  useEffect(() => {
    if (employeeToEdit) {
      setUserId(employeeToEdit.user_id);
      setUserRole(employeeToEdit.user_rol);
      setUserName(employeeToEdit.user_name);
      setUserEmail(employeeToEdit.user_email);
      setUserPwd(employeeToEdit.user_pwd);
      setLoading(loading);
      setUserStatus(employeeToEdit.user_status);
      setChecked(userStatus);
    }
    return () => cleanForm();
  }, [employeeToEdit, userStatus]);

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
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              {employeeToEdit && (
                <TextField
                  fullWidth
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  label="Email"
                  variant="outlined"
                  defaultValue={userEmail}
                  autoComplete="off"
                  disabled={true}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              )}

              <TextField
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                label={employeeToEdit ? "New Email" : "Email"}
                variant="outlined"
                value={userNewEmail}
                autoComplete="off"
                onChange={(e) => {
                  setUserNewEmail(e.target.value);
                }}
              />
              {employeeToEdit && (
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  autoComplete="off"
                  disabled={true}
                  defaultValue={userPwd}
                />
              )}

              <TextField
                fullWidth
                label="New Password"
                variant="outlined"
                autoComplete="off"
                onChange={(e) => setUserNewPwd(e.target.value)}
              />
              <label>Status</label>
              <SwitchCustom
                checkedFromParent={checked}
                handler={switchHandler}
              />

              <div className="large-button--content" onClick={handleSubmit}>
                <ActionButton
                  title={employeeToEdit ? "Update Employee" : "Create Employee"}
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
