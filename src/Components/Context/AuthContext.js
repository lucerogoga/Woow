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
  updateProfile,
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
    return signOut(auth2)
      .then(() => {
        return createUserWithEmailAndPassword(auth2, email, password);
      })
      .catch(() => {
        return createUserWithEmailAndPassword(auth2, email, password);
      })
      .then((firebaseUser) => {
        return firebaseUser.user.uid;
      })
      .then((idUser) => {
        return { logout: signOut(auth2), userId: idUser };
      });
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
      auth2,
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

  const changeNameUser = (email, pwd, name) => {
    let userData;

    return (
      signOut(auth2)
        .then(() => {
          return loginSecondaryUser(email, pwd);
        })
        // .catch(() => {
        //   return loginSecondaryUser(email, "123456");
        // })
        .then((secondUser) => {
          userData = secondUser;
          return createCredential(secondUser, pwd);
        })
        .then(() => {
          const employe = userData.user.auth.currentUser;
          console.log("se cambio el nombre del usuario?????, ", employe);

          return updateProfile(employe, {
            displayName: name,
          });

          // ---
        })
      // .then((sol) => {
      //   return console.log("SII , ", sol);
      // })
      // .catch((e) =>
      //   console.log("ERROR AL CAMBIAR EL NOMBRE POR AUTH, ", e.message)
      // )
    );
  };

  const changePwdUser = (email, pwd, newPwd) => {
    let userData;

    return (
      signOut(auth2)
        .then(() => {
          return loginSecondaryUser(email, pwd);
        })
        // .catch(() => {
        //   return loginSecondaryUser(email, "123456");
        // })
        .then((secondUser) => {
          userData = secondUser;
          return createCredential(secondUser, pwd);
        })
        .then(() => {
          console.log("llegamos hasta acà?");
          const employe = userData.user.auth.currentUser;
          return changePasswordAuth(employe, newPwd);
        })
        .catch((e) => console.log(e.message))
    );
  };

  const changeEmailUser = (email, newEmail) => {
    let userData;

    return signOut(auth2)
      .then(() => {
        return loginSecondaryUser(email, "123456");
      })
      .catch(() => {
        return loginSecondaryUser(email, "123456");
      })
      .then((secondUser) => {
        // setSecondaryUser(secondUser);
        userData = secondUser;
        return createCredential(secondUser, "123456");
      })
      .then(() => {
        const employe = userData.user.auth.currentUser;
        return changeEmailAuth(employe, newEmail);
      })
      .catch((e) => e.message);
  };

  // ! lograré esto! una funcion que cambie las tres cosas de frente.
  const changeUserDataAuth = (email, newEmail, pwd, newPwd, name) => {
    console.log("mi nuevo correo es, ", newEmail);

    return changeNameUser(email, pwd, name) // (email, pwd, name)
      .then(() => {
        console.log("SE CAMBIO EN AUTH EL NOMBRE");
        return changePwdUser(email, pwd, newPwd); //email, pwd, newPwd
      })
      .then(() => {
        console.log("SE CAMBIO EN AUTH EL PASSWORD");
        return changeEmailUser(email, newEmail); //email, newEmail
      })
      .catch((e) => {
        return console.log("PROBLEMAS EN GRANDEEEEEEEEEEEEE", e.message);
      });
  };

  // const changeUserDataAuth = (email, newEmail, pwd, newPwd, name) => {
  //   const emailCurrent = newEmail ? newEmail : email;
  //   const pwdCurrent = newPwd ? newPwd : pwd;

  //   // let userData;

  //   return changeNameUser(email, pwd, name) // (email, pwd, name)
  //     .then(() => {
  //       console.log("SE CAMBIO EN AUTH EL NOMBRE");
  //       return changePwdUser(email, pwd, pwdCurrent); //email, pwd, newPwd
  //     })
  //     .then(() => {
  //       console.log("SE CAMBIO EN AUTH EL PASSWORD");
  //       return changeEmailUser(email, emailCurrent); //email, newEmail
  //     })
  //     .catch((e) => {
  //       return console.log("PROBLEMAS EN GRANDEEEEEEEEEEEEE", e.message);
  //     });
  //   //   changeNameUser
  //   // changePwdUser
  //   // changeEmailUser
  // };

  // !------------------------------
  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser({ currentUser: currentUser?.uid });
      //*LE PONEMOS UN BOOLEANO CUANDO EL USUARIO YA ESTE AUTENTICADO CAMBIA A FALSE PARA QUE YA NO SE MUESTRE PERO RECUERDA QUE EL ROL TMB TIENE QUE ESPERAR.
      console.log("algo cambió lucero!!, ", { currentUser: currentUser?.uid });
      console.log("useEffect 1, mi hook user1", user);
      // user, setUser
      setLoading(false);
    });

    return () => unsubcribe();
  }, []);

  useEffect(() => {
    const unsubcribe2 = onAuthStateChanged(auth2, (currentUser) => {
      setSecondaryUser(currentUser);

      console.log("algo cambió empleado2 obj!!, ", currentUser);

      console.log("algo cambió empleado2 uid!!, ", {
        currentUser: currentUser?.uid,
      });

      setSecondaryUser(currentUser);
      console.log("useEffect 2, mi hook secondaryUser", secondaryUser);

      // ! prueba

      // setSecondaryUser({ currentUser: currentUser?.uid });
      //*LE PONEMOS UN BOOLEANO CUANDO EL USUARIO YA ESTE AUTENTICADO CAMBIA A FALSE PARA QUE YA NO SE MUESTRE PERO RECUERDA QUE EL ROL TMB TIENE QUE ESPERAR.
      setLoading2(false);
    });

    return () => unsubcribe2();
    // }, [secondaryUser, prueba]);
    // }, [secondaryUser]);
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
        changeEmailUser,
        userCredential2,
        auth2,
        signOut,
        changeUserDataAuth,
        changePwdUser,
        changeNameUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
