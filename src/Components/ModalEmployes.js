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
import SwitchCustom from "../Components/Switch";
import { v4 as uuidv4 } from "uuid";
import { validateEmail } from "../helpers/loginFuntions";

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
  // const { createUser, changeEmailUser } = useAuth();

  // const { createUser } = useAuth();
  const { createUser, changeEmailUser, auth2, signOut } = useAuth();
  // const { createUser, changeEmailUser } = useAuth();
  // const { createUser, changeEmailUser, userCredential2 } = useAuth();

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  // const [userNewEmail, setUserNewEmail] = useState("");
  const [userNewEmail, setUserNewEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userStatus, setUserStatus] = useState(false);
  const [userPwd, setUserPwd] = useState("*******");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [secondUser, setSecondUser] = useState([]);

  // !--- obteniendo el nuevo id del nuevo usuario creado
  const [newUserId, setNewUserId] = useState("");

  // }, [selectedOrderStatus, currentUser]);

  const switchHandler = (event) => {
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
      // ! aqui el loading?
      // loading
    } else {
      createUserFirestore();
    }
  };

  const editUserFirestore = async () => {
    if (userName.trim()?.length === 0) {
      return console.log("INGRESA UN NOMBRE VÁLIDO");
    }
    if (!validateEmail(userNewEmail)) {
      // if (userNewEmail.trim()) {
      return console.log("EL CORREO DEBE TENER UN FORMATO!");
    }
    if (userEmail.trim() === userNewEmail.trim()) {
      return console.log("INGRESA UN CORREO NUEVO!");
    }

    // Si el correo nuevo está vacio entonces se ejecuta cambio en datos básicos.
    setLoading(true);
    console.log("debería dar true el loading, ", loading);
    // ! ------------------------------------intentando cambiar el correo!
    console.log("userEmail es, ", userEmail.trim());
    console.log("userNewEmail es, ", userNewEmail.trim());

    console.log("SON IGUALES?", userEmail === userNewEmail);
    console.log("SON DIFERENTES? ", userEmail !== userNewEmail);
    changeEmailUser(userEmail, userNewEmail)
      .then(() => {
        return updateUser(userId, userName, userNewEmail, userRole, checked);
      })
      .then((res) => {
        onClose();
        console.log("proceso exitoso!");
      })
      .finally(() => {
        console.log("debería dar false el loading, FINALLY", loading);
        setLoading(false);
        cleanForm();
      });

    // ! ------------------------------------intentando cambiar la contraseña!
  };

  // const createUserFirestore = async () => {
  const createUserFirestore = () => {
    // const handleCreateUser = async () => {
    //aqui obtenemos todos los datos del modal

    cleanForm();
    setLoading(true);

    // const userID = await createUser(userEmail, userPwd);

    console.log("crear usuario, ", userEmail, userPwd);
    console.log("crear usuario, ", userNewEmail, userPwd);
    createUser(userNewEmail, userPwd)
      .then((res) => {
        console.log("qué obtengo de aquí?, ", res);
        const { logout, userId } = res;

        setNewUserId(userId);
        return userId;
      })
      .then((userID) => {
        return createUserFirebase(
          userID,
          userRole,
          userStatus,
          userName,
          userNewEmail,
          userPwd
        );
      })
      .then((newUser) => {
        console.log("BIENVENIDO AL NUEVO USUARIO: ", newUser);
        return signOut(auth2);
      })
      .then(() => {
        console.log("el usuario si logró desloguearse, ");
      })
      .catch((e) => {
        console.log("problemas? , ", e.message);
      })
      .then(() => {
        onClose();
        setLoading(false);
        console.log("OBTUVE EL NUEVO ID! , ", newUserId);
      })
      .catch((e) => {
        onClose();
        setLoading(false);
        console.log("ERRORES AL OBTENER EL NUEVO ID! , ", newUserId);
        console.log("ERROR, ", e.message);
        switch (e.message) {
          case "Firebase: Error (auth/email-already-in-use).":
            console.log("Email already in use.");
            break;
          default:
            console.log("defult");
        }
      });

    // createUserFirebase(
    //   userID,
    //   userRole,
    //   userStatus,
    //   userName,
    //   userEmail,
    //   userPwd
    // )
    // .then((res) => {
    onClose();
    // })
    // .finally(() => {
    setLoading(false);
    // });
  };

  const handleChangeRole = (e) => {
    setUserRole(e.target.value);
  };

  useEffect(() => {
    if (employeeToEdit) {
      setUserId(employeeToEdit.user_id);
      setUserRole(employeeToEdit.user_rol);
      setUserName(employeeToEdit.user_name);
      // setUserNewEmail(employeeToEdit.user_email);
      // ! aqui !
      setUserEmail(employeeToEdit.user_email);

      setUserPwd("");
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
                onChange={(e) => setUserName(e.target.value)}
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
                // label="New Email"
                variant="outlined"
                // value={userEmail}
                value={userNewEmail}
                // defaultValue={userEmail}
                autoComplete="off"
                onChange={(e) => {
                  // console.log("este es mi nuevo correo! , ", e.target.value);
                  // console.log("este es mi viejo correo! , ", userEmail);
                  setUserNewEmail(e.target.value);
                }}
                // onChange={(e) => setUserEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                autoComplete="off"
                onChange={(e) => setUserPwd(e.target.value)}
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
