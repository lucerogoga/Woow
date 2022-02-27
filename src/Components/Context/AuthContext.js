import React, { useState, createContext, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../Config/initialize.js";

const authContext = createContext();

// useContext
export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("credenciallllll, ", userCredential);
    return userCredential;
  };

  // ! PENDIENTE
  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log("dentro de onAuthStateCh..., ", currentUser.uid);
      setUser({ currentUser: currentUser?.uid });
      // currentUser ? currentUser.uid : null
      // setUser({ currentUser });
      // setUser({ currentUser });
      setLoading(false);
    });

    return () => unsubcribe();
  }, []);

  if (loading) return <h1> Loading....</h1>;

  return (
    <authContext.Provider value={{ login, logout, user, loading }}>
      {children}
    </authContext.Provider>
  );
};
