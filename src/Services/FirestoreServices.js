import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  where,
  addDoc,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  deleteDoc,
  limit,
  setDoc,
} from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../Config/initialize";

//---------------- User Functions
export const getUser = async (userId) => {
  const userRef = doc(db, "users", userId);

  const docSnap = await getDoc(userRef);

  const usuario = docSnap.data();
  if (docSnap.exists()) {
    return usuario;
  }
  return {};
};

//---------------- Order Functions

export const getOrderNumberCorrelative = async () => {
  const orderRef = collection(db, "orders");

  return onSnapshot(orderRef, (snapshot) => {
    // setOrderCorrelative(snapshot.size + 1);
  });
};

export const ordersListener = () => {
  const q = query(collection(db, "orders"));
  return onSnapshot(q, (snapshot) => {});
};

export const updateOrder = async (chefId, idOrder, status, chefName) => {
  const orderRef = doc(db, "orders", idOrder);

  await updateDoc(orderRef, {
    order_status: status,
    chef_id: chefId,
    chef_name: chefName,
    order_timestamp_start: serverTimestamp(),
    // order_timestamp_end: serverTimestamp(),
  });
};

export const updateStatusOrder = async (idOrder, status, userRole) => {
  const orderRef = doc(db, "orders", idOrder);
  console.log("STATUS: ", status, "Y ROLE: ", userRole);
  // if (status === "Canceled" && userRole === "waiter"){
  if (userRole === "waiter" || status === "Ready to Serve") {
    console.log("deberia funcionar");
    return await updateDoc(orderRef, {
      order_status: status,
      order_timestamp_end: serverTimestamp(),
    });
  } else {
    return await updateDoc(orderRef, {
      order_status: status,
      // order_timestamp_end: serverTimestamp(),
    });
  }
  // "Pending" && userRole === "waiter"
};
//-------------CreateOrder in Firebase
export const createOrder = async (
  waiterId,
  waiterName,
  clientName,
  tableNumber,
  orderStatus,
  cartProducts,
  orderNumber
) => {
  const ordersRef = collection(db, "orders");
  return addDoc(ordersRef, {
    chef_id: null,
    chef_name: null,
    waiter_id: waiterId,
    waiter_name: waiterName,
    order_status: orderStatus,
    client_name: clientName,
    table: tableNumber,
    // order_timestamp: null,
    order_timestamp: serverTimestamp(),
    order_products: cartProducts,
    order_number: orderNumber,
    order_timestamp_start: null,
    order_timestamp_end: null,
  });
};
//----------------
export const getOrderStatus = async () => {
  const productsData = await getDocs(collection(db, "order_status"));
  return productsData.docs.map((p) => {
    return {
      id: p.id,
      ...p.data(),
    };
  });
};
//----------------
export async function getOrders() {
  const productsData = await getDocs(collection(db, "orders"));
  return productsData.docs.map((p) => {
    return {
      id: p.id,
      ...p.data(),
    };
  });
}

//---------------- Product Functions
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
    return {
      cat_uid: category.id,
      cat_name: category.data().cat_name,
    };
  });
}

export async function filterOrderPending(chefId, catName) {
  if (catName === "All") {
    return getProducts();
  } else {
    const q1 = query(
      collection(db, "orders"),
      where("order_status", "==", "Pending"),
      orderBy("product_name", "asc")
      // orderBy("product_name", "desc")
    );
    const querySnapshotProduct = await getDocs(q1);
    const productFilterDocs = querySnapshotProduct.docs;
    return productFilterDocs.map((p) => {
      return {
        id: p.id,
        ...p.data(),
      };
    });
  }
}
export async function filterProductByCategorie(catId, catName) {
  if (catName === "All") {
    return getProducts();
  } else {
    const q1 = query(
      collection(db, "products"),
      where("cat_id", "==", catId),
      orderBy("product_name", "desc")
    );
    const querySnapshotProduct = await getDocs(q1);
    const productFilterDocs = querySnapshotProduct.docs;
    return productFilterDocs.map((p) => {
      return {
        id: p.id,
        ...p.data(),
      };
    });
  }
}

//---------------- Admin Functions
export async function getEmployers() {
  const usersData = await getDocs(collection(db, "users"));
  return usersData.docs.map((e) => {
    return {
      id: e.id,
      ...e.data(),
    };
  });
}
//-------------uploadimage
// ------------Subir imagen en post  -------------
export function uploadImage(file, catName) {
  const productPath = "Products";
  const fileName = file.name;
  const imageRef = ref(storage, `${productPath}/${catName}/${fileName}`);
  return uploadBytes(imageRef, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .catch((err) => console.log(err));
}
//--------------CreateProduct
export async function createProductFirebase(
  catId,
  productName,
  productDescription,
  productCost,
  productOption,
  productPhoto,
  productStock
) {
  const ordersRef = collection(db, "products");
  return addDoc(ordersRef, {
    cat_id: catId,
    product_name: productName,
    product_description: productDescription,
    product_cost: [productCost], //array
    product_options: [productOption], //array
    product_photo: [productPhoto], //array
    product_stock: [productStock], //array
  });
}
//--------------EditProduct
export async function editProductFirebase(
  productId,
  catId,
  productName,
  productDescription,
  productCost,
  productOption,
  productPhoto,
  productStock
) {
  const productRef = doc(db, "products", productId);
  return updateDoc(productRef, {
    cat_id: catId,
    product_name: productName,
    product_description: productDescription,
    product_cost: [...productCost], //array
    // product_options: [...productOption], //array
    product_photo: [productPhoto], //array
    product_stock: [...productStock], //array
  });
}
//--------------DeleteProduct
export async function deleteProductFirebase(productId) {
  const productRef = doc(db, "products", productId);
  return deleteDoc(productRef);
}

//--------------CreateUser
export function createUserFirebase(
  userID,
  userRole,
  userStatus,
  userName,
  userEmail
) {
  const userdoc = doc(db, "users", userID);
  return setDoc(userdoc, {
    user_id: userID,
    user_rol: userRole,
    user_status: userStatus,
    user_name: userName,
    user_email: userEmail,
  });
}

// -----  EditUser

export async function updateUser(
  userId,
  userName,
  userEmail,
  userRole,
  userStatus
) {
  const userRef = doc(db, "users", userId);
  return updateDoc(userRef, {
    user_email: userEmail,
    // user_id
    user_name: userName,
    user_rol: userRole,
    user_status: userStatus,
  });
}

export async function getUsers() {
  const productsData = await getDocs(collection(db, "users"));
  return productsData.docs.map((p) => {
    return {
      id: p.id,
      ...p.data(),
    };
  });
}

// const q1 = query(
//   collection(db, "orders"),
//   where("order_status", "==", "Pending"),
//   orderBy("product_name", "asc")
//   // orderBy("product_name", "desc")
// );
// const querySnapshotProduct = await getDocs(q1);
// const productFilterDocs = querySnapshotProduct.docs;
// return productFilterDocs.map((p) => {
//   return {
//     id: p.id,
//     ...p.data(),
//   };
// });
