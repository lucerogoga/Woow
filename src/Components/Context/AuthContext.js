import React, { useState, createContext, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, auth2 } from "../../Config/initialize.js";

export const authContext = createContext();

// useContext
export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth2, email, password)
      .then((firebaseUser) => {
        return firebaseUser.user.uid;
      })
      .then(signOut(auth2));
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  };

  // ! PENDIENTE
  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser({ currentUser: currentUser?.uid });
      //*LE PONEMOS UN BOOLEANO CUANDO EL USUARIO YA ESTE AUTENTICADO CAMBIA A FALSE PARA QUE YA NO SE MUESTRE PERO RECUERDA QUE EL ROL TMB TIENE QUE ESPERAR.
      setLoading(false);
    });

    return () => unsubcribe();
  }, []);

  useEffect(() => {
    // createUser().then((user) => setProductCategories(user));
  }, []);

  return (
    <authContext.Provider value={{ login, logout, user, loading, createUser }}>
      {children}
    </authContext.Provider>
  );
};
