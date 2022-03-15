/* eslint-disable */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmhQWfI2sxgl8aZAQhrebp_K4lMNVPL5k",
  authDomain: "woow-app-project.firebaseapp.com",
  projectId: "woow-app-project",
  storageBucket: "woow-app-project.appspot.com",
  messagingSenderId: "926967780191",
  appId: "1:926967780191:web:f15f10821fe51710f79cea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


// var config = {apiKey: "apiKey",
//     authDomain: "projectId.firebaseapp.com",
//     databaseURL: "https://databaseName.firebaseio.com"};
// const secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");




export { app, auth, db, storage};
// export { app, auth, db, storage, secondaryApp};