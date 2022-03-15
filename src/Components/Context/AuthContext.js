import React, { useState, createContext, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Config/initialize.js";

const authContext = createContext();

// !----------------------
// !prueba

// !----------------------

// useContext
export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const createUser = (email, password) => {
    // return createUserWithEmailAndPassword(auth, email, password).then(
    //   (userCredential) => {
    //     const user = userCredential.user.uid;
    //     return user;
    //   }
    // );
    // return secondaryApp
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(function (firebaseUser) {
    //     console.log("User " + firebaseUser.uid + " created successfully!");
    //     //I don't know if the next statement is necessary
    //     secondaryApp.auth().signOut();
    //   });
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

  // ! No entiendo por qué esto funciona bien
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser({ currentUser: currentUser?.uid });
      // ! ni entiendo el set loading
      //*LE PONEMOS UN BOOLEANO CUANDO EL USUARIO YA ESTE AUTENTICADO CAMBIA A FALSE PARA QUE YA NO SE MUESTRE PERO RECUERDA QUE EL ROL TMB TIENE QUE ESPERAR*/
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
