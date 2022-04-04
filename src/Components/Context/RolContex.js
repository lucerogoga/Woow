import React, { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getUser } from "../../Services/FirestoreServices";
import { Grid } from "@mui/material";
import { ReactComponent as Spinner } from "../../Assets/icons/Spinner.svg";
const rolContext = createContext();
export const useRol = () => useContext(rolContext);

export const RolProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    user: { currentUser },
  } = useAuth();

  // useEffect(() => {
  //   const prueba = () => {
  //     if (currentUser) {
  //       async function getUserFirestore() {
  //         const { user_rol } = await getUser(currentUser);
  //         setUserRole(user_rol);
  //       }
  //       setLoading(true);
  //       getUserFirestore().finally(() => setLoading(false));
  //     }
  //   };

  //   return () => prueba;
  //   // return prueba;
  // }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      async function getUserFirestore() {
        const { user_rol } = await getUser(currentUser);
        setUserRole(user_rol);
      }
      setLoading(true);
      getUserFirestore().finally(() => setLoading(false));
    }
  }, []);
  // }, [currentUser]);

  if (loading)
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "100vh",
        }}
      >
        <Spinner />;
      </Grid>
    );
  return <rolContext.Provider value={userRole}>{children}</rolContext.Provider>;
};
