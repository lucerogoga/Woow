import React, { useState, createContext, useContext, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Config/initialize.js";

const authContext = createContext();

// useContext
export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
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
    <authContext.Provider value={{ login, user, loading }}>
      {children}
    </authContext.Provider>
  );
};
