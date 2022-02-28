import React, { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getUser } from "./FirestoreContext";
import { ReactComponent as Spinner } from "../../Assets/icons/Spinner.svg";
const rolContext = createContext();
export const useRol = () => useContext(rolContext);

export const RolProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    user: { currentUser },
  } = useAuth();

  useEffect(() => {
    if (currentUser) {
      async function getUserFirestore() {
        // const resultado = await getUser(user.currentUser);
        // console.log("resuuuuuuuuul", resultado);
        const { user_rol } = await getUser(currentUser);
        console.log("resuuuuuuuuul", user_rol);
        setUserRole(user_rol);
      }
      setLoading(true);
      getUserFirestore().finally(() => setLoading(false));
    }
  }, [currentUser]);

  if (loading) return <Spinner />;
  return <rolContext.Provider value={userRole}>{children}</rolContext.Provider>;
};
