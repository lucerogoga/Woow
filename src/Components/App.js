import "../Assets/App.css";
import Login from "./Login";
import Home from "./Home";
import React, { useState } from "react";
import { auth } from "../Config/initialize.js";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (userfirebase) => {
    if (userfirebase) {
      const UserData = {
        uid: userfirebase.uid,
        email: userfirebase.email,
      };
      setUser(UserData);
    } else {
      setUser(null);
    }
  });
  return <>{user ? <Home /> : <Login />}</>;
}

export default App;
