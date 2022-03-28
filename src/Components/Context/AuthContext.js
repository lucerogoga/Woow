import React, { useState, createContext, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth, auth2 } from "../../Config/initialize.js";

export const authContext = createContext();

// useContext
export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [secondaryUser, setSecondaryUser] = useState({});
  const [userCredential2, setUserCredential2] = useState({});

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

  // ! intentando conseguir loguarse con segunda cuenta para cambiar el correo y contraseña!-------------------------------

  const loginSecondaryUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  };

  // Siempre me pedirán credencial para eliminar cuenta, cambiar contraseña o correo
  const createCredential = (email, password) => {
    const credential = EmailAuthProvider.credential(email, password);
    return credential;
  };
  // El método indicará la funcion (si es para actualizar el correo o la contraseña)
  const reauth = async (user, credential) =>
    reauthenticateWithCredential(user, credential);

  const changePasswordAuth = (user, newPassword) =>
    updatePassword(user, newPassword);

  const changeEmailAuth = (user, newEmail) => updateEmail(user, newEmail);

  // !---------------

  const changeDataUsers = (email) => {
    return loginSecondaryUser(email, "123456")
      .then((secondUser) => {
        setSecondaryUser(secondUser);
        return createCredential(secondUser, "123456");
        // return createCredential(email, "123456");
      })
      .then((credential) => {
        setUserCredential2(credential);
        console.log("MIRA MI CREDENCIAL!, ", credential);
        return credential;
      })
      .then(signOut(secondaryUser));
  };

  // !------------------------------
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
    const unsubcribe2 = onAuthStateChanged(auth, (currentUser) => {
      setSecondaryUser({ currentUser: currentUser?.uid });
      //*LE PONEMOS UN BOOLEANO CUANDO EL USUARIO YA ESTE AUTENTICADO CAMBIA A FALSE PARA QUE YA NO SE MUESTRE PERO RECUERDA QUE EL ROL TMB TIENE QUE ESPERAR.
      setLoading2(false);
    });

    return () => unsubcribe2();
  }, []);

  useEffect(() => {
    // createUser().then((user) => setProductCategories(user));
  }, []);

  return (
    <authContext.Provider
      value={{
        login,
        logout,
        user,
        loading,
        // loading2,
        createUser,
        // createCredential,
        // secondaryUser,
        // loginSecondaryUser,
        changeDataUsers,
        userCredential2,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
