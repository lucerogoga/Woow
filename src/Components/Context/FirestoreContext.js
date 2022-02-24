import React, { useState, createContext, useContext, useEffect } from "react";
// import { collection, doc , getDoc, getDocs , query, where} from "firebase/firestore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../Config/initialize";
import { useAuth } from "./AuthContext";

// const { user } = useAuth();

export const getUser = async (userId) => {
  const userRef = doc(db, "users", userId);

  const docSnap = await getDoc(userRef);

  const usuario = docSnap.data();
  console.log("este es el usuarioooo, ", usuario);
  if (docSnap.exists()) {
    return usuario;
  }
  return {};
};

// export const getUser = async () => {
//   const querySnapshot = await getDocs(collection(db, "users"));
//   //   querySnapshot.docs.map((p) => {
//   //   querySnapshot.map((p) => {
//   return querySnapshot.docs.map((p) => {
//     return {
//       id: p.id,
//       ...p.data(),
//     };
//   });
//   //   querySnapshot.forEach((document) => console.log(document));
//   console.log("AAAAAAAAAAAAAAAAAAAAAAA", querySnapshot);
// };

export async function getProducts() {
  const productsData = await getDocs(collection(db, "products"));
  return productsData.docs.map((p) => {
    return {
      id: p.id,
      ...p.data(),
    };
  });
}

export async function getProductsCategories() {
  const catRef = collection(db, "product_categories");
  const q = query(catRef, orderBy("cat_name"));
  const categoriesData = await getDocs(q);
  return categoriesData.docs.map((category) => {
    console.log(category.data().cat_name);
    return {
      cat_name: category.data().cat_name,
      //  ...category.data(),
    };
  });
}
