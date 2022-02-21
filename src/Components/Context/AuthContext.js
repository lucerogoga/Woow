import React, { useState, createContext, useContext, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Config/initialize.js";

const authContext = createContext();

// useContext
export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  const login = async (email, password) => {
    console.log("login");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {}
  };

  // ! PENDIENTE
  //   const logout = () => {
  //     console.log("logout");
  //   };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  return (
    <authContext.Provider value={(login, user, loading)}>
      {children}
    </authContext.Provider>
  );
};
