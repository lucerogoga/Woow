import React, { useState, createContext, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
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
        return idUser;
      });
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      return error;
    }
  };

  const loginSecondaryUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth2,
      email,
      password
    );
    return userCredential;
  };

  // It will always ask me for a credential to modify account name, password or email
  const createCredential = (email, password) => {
    const credential = EmailAuthProvider.credential(email, password);
    return credential;
  };

  // !---------------

  const changeNameUser = (email, pwd, name) => {
    let userData;

    return signOut(auth2)
      .then(() => {
        return loginSecondaryUser(email, pwd);
      })
      .then((secondUser) => {
        userData = secondUser;
        return createCredential(secondUser, pwd);
      })
      .then(() => {
        const employe = userData.user.auth.currentUser;
        return updateProfile(employe, {
          displayName: name,
        });
      });
  };

  const changePwdUser = (email, pwd, newPwd) => {
    let userData;

    return signOut(auth2)
      .then(() => {
        return loginSecondaryUser(email, pwd);
      })
      .then((secondUser) => {
        userData = secondUser;
        return createCredential(secondUser, pwd);
      })
      .then(() => {
        const employe = userData.user.auth.currentUser;
        return updatePassword(employe, newPwd);
      })
      .catch((e) => console.log(e.message));
  };

  const changeEmailUser = (email, newEmail, pwd) => {
    let userData;

    return signOut(auth2)
      .then(() => {
        return loginSecondaryUser(email, pwd);
      })
      .then((secondUser) => {
        userData = secondUser;
        return createCredential(secondUser, pwd);
      })
      .then(() => {
        const employe = userData.user.auth.currentUser;
        return updateEmail(employe, newEmail);
      })
      .then((e) => {
        return signOut(auth2);
      })
      .catch((e) => console.log(e.message));
  };

  const changeUserDataAuth = (email, newEmail, pwd, newPwd, name) => {
    return changeNameUser(email, pwd, name)
      .then(() => {
        return changePwdUser(email, pwd, newPwd);
      })
      .then(() => {
        return changeEmailUser(email, newEmail, newPwd);
      })
      .then(() => {
        return signOut(auth2);
      })
      .catch((e) => console.log(e.message));
  };

  // !------------------------------
  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser({ currentUser: currentUser?.uid });
      //* We put a boolean on it when the user is already authenticated, it change to false so that it is no longer displayed but remember that the tmb role has to wait.
      setLoading(false);
    });

    // return () => unsubcribe();
    return unsubcribe;
    // return unsubcribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        login,
        logout,
        user,
        loading,
        createUser,
        auth2,
        signOut,
        changeUserDataAuth,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
