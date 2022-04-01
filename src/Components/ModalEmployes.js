import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
//Material UI Components
import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import SwitchCustom from "../Components/Switch";
import {
  validateEmail,
  validateName,
  validateEmailDomains,
  validatePassword,
} from "../helpers/loginFuntions";
import { ReactComponent as Spinner } from "../Assets/icons/Spinner.svg";
//Firebase Connection
import { createUserFirebase, updateUser } from "../Services/FirestoreServices";
import { useAuth } from "./Context/AuthContext";
//Components
import ActionButton from "./ActionButton";
import ErrorModal from "./ErrorModal";

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
  const options = [
    { label: "Waiter", value: "waiter" },
    { label: "Chef", value: "chef" },
    { label: "Admin", value: "admin" },
  ];
  const { createUser, auth2, changeUserDataAuth, signOut } = useAuth();

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userNewName, setUserNewName] = useState("");
  const [userNewEmail, setUserNewEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userStatus, setUserStatus] = useState(false);
  const [userPwd, setUserPwd] = useState("");
  const [userNewPwd, setUserNewPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  //states for error Message
  const [errorMessage, setErrorMessage] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const switchHandler = (event) => {
    console.log("el switch funciona, ", event.target.checked);
    setChecked(event.target.checked);
  };

  const cleanForm = () => {
    setUserId("");
    setUserNewEmail("");
    setUserRole("");
    setUserName("");
    setUserNewName("");
    setUserStatus(false);
    setUserEmail("");
    setUserPwd("");
    setUserNewPwd("");
    setChecked(false);
    setLoading(false);
  };

  const handleDisplayError = () => {
    setDisplayError(false);
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
    setErrorMessage("");
    setDisplayError(false);
    // ! los states del formulario arreglar
    if (
      userNewName.trim()?.length === 0 ||
      userNewEmail.trim()?.length === 0 ||
      userNewPwd.trim()?.length === 0
    ) {
      setErrorMessage("Fields must be filled");
      setDisplayError(true);
      return;
    }
    if (
      userNewEmail.trim()?.length !== 0 &&
      !validateEmailDomains(userNewEmail)
    ) {
      setErrorMessage("The email must have format example@mail.com");
      setDisplayError(true);
      return;
    }
    if (!validateEmailDomains(userNewEmail)) {
      setErrorMessage(
        "The email must have the domain of gmail, hotmail or outlook"
      );
      setDisplayError(true);
      return;
    }
    if (userNewPwd.trim()?.length !== 0 && !validatePassword(userNewPwd)) {
      setErrorMessage("Password must have at least 6 characters");
      setDisplayError(true);
      return;
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
          userNewName,
          emailCurrent,
          userRole,
          checked,
          pwdCurrent
        );
      })
      .catch((e) => console.log(e.message))
      .finally(() => {
        setLoading(false);
        cleanForm();
      });
  };

  const createUserFirestore = () => {
    setErrorMessage("");
    setDisplayError(false);
    if (!userRole) {
      setErrorMessage("Enter a Rol");
      setDisplayError(true);
      return;
    }
    if (userNewName.trim()?.length === 0) {
      setErrorMessage("Enter a Name");
      setDisplayError(true);
      return;
    }
    if (!validateName(userNewName)) {
      setErrorMessage("The name must only contain letters");
      setDisplayError(true);
      return;
    }
    if (userNewEmail.trim()?.length === 0) {
      setErrorMessage("Enter a Email");
      setDisplayError(true);
      return;
    }
    if (!validateEmail(userNewEmail)) {
      setErrorMessage("The email must have format example@mail.com");
      setDisplayError(true);
      return;
    }
    if (!validateEmailDomains(userNewEmail)) {
      setErrorMessage(
        "The email must have the domain of gmail, hotmail or outlook"
      );
      setDisplayError(true);
      return;
    }
    if (userNewPwd.trim()?.length === 0) {
      setErrorMessage("Enter a Password");
      setDisplayError(true);
      return;
    }

    if (!validatePassword(userNewPwd)) {
      setErrorMessage("Password must have at least 6 characters");
      setDisplayError(true);
      return;
    }
    setLoading(true);

    createUser(userNewEmail, userNewPwd)
      .then((userID) => {
        return createUserFirebase(
          userID,
          userRole,
          checked,
          userNewName,
          userNewEmail,
          userNewPwd
        );
      })
      .then(() => {
        onClose();
        return signOut(auth2);
      })
      .catch((e) => {
        switch (e.message) {
          case "Firebase: Error (auth/email-already-in-use).":
            setErrorMessage("Email already in use.");
            setDisplayError(true);
            break;
          default:
            console.log("Error not handled: ", e.message);
        }
      })
      .finally(() => {
        setLoading(false);
        cleanForm();
      });
  };

  const handleChangeRole = (e) => {
    setUserRole(e.target.value);
  };

  useEffect(() => {
    cleanForm();
    setErrorMessage("");
    setDisplayError(false);
    if (employeeToEdit) {
      setUserId(employeeToEdit.user_id);
      setUserRole(employeeToEdit.user_rol);
      setUserName(employeeToEdit.user_name);
      setUserEmail(employeeToEdit.user_email);
      setUserPwd(employeeToEdit.user_pwd);
      setUserNewName(employeeToEdit.user_name);
      setUserNewEmail(employeeToEdit.user_email);
      setUserNewPwd(employeeToEdit.user_pwd);
      setUserStatus(employeeToEdit.user_status);
      setChecked(userStatus);
    }
    return () => cleanForm();
  }, [employeeToEdit, userStatus, onClose]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: "70%" }}>
        <div className="error">
          <ErrorModal
            message={errorMessage}
            onClose={handleDisplayError}
            isVisible={displayError}
          />
        </div>
        <Grid container gap="1rem" sx={{ minHeight: "425px" }}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div style={{ height: "1rem" }}> </div>
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
                  {options?.map((option) => {
                    return (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label ?? option.value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="New User Name"
                value={userNewName}
                variant="outlined"
                autoComplete="off"
                onChange={(e) => {
                  setUserNewName(e.target.value);
                }}
              />
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
              <TextField
                fullWidth
                label={employeeToEdit ? "New Password" : "Password"}
                variant="outlined"
                autoComplete="off"
                value={userNewPwd}
                onChange={(e) => setUserNewPwd(e.target.value)}
              />
              <label>Status</label>
              <SwitchCustom
                checkedFromParent={checked}
                handler={switchHandler}
              />

              <div className="large-button__content" onClick={handleSubmit}>
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
