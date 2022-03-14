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
  limit,
} from "firebase/firestore";
import { db } from "../Config/initialize";

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
  const documentSnapshots = await getDocs(orderRef);

  console.log("el size dará? ", documentSnapshots.size);
  // console.log("hay? ", documentSnapshots);

  // if the collection "orders" is empty, then number correlative will start at 0
  if (documentSnapshots.size === 0) {
    console.log("no existe ningún documento");
    return 0;
  }

  // if there are documents in the collection then it will get the last one created to get the following order
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  return lastVisible.data();
  // -------
};

// ! respaldo correlativo
// export const getOrderNumberCorrelative = async () => {
//   const orderRef = collection(db, "orders");
//   const documentSnapshots = await getDocs(orderRef);

//   console.log("el size dará? ", documentSnapshots.size);
//   // console.log("hay? ", documentSnapshots);

//   // if the collection "orders" is empty, then number correlative will start at 0
//   if (documentSnapshots.size === 0) {
//     console.log("no existe ningún documento");
//     return 0;
//   }

//   // if there are documents in the collection then it will get the last one created to get the following order
//   const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
//   return lastVisible.data();

// };

export const existOrderInCollection = async () => {
  const orderExist = doc(db, "orders");

  const docSnap = await getDoc(orderExist);

  const order = docSnap.data();
  if (order.exists()) {
    return true;
  }
  return false;

  // ! -----
  // const orderExist = doc(db, "orders");

  // const docSnap = await getDoc(orderExist);

  // const order = docSnap.data();
  // if (order.exists()) {
  //   return true;
  // }
  // return false;
};

export const ordersListener = () => {
  const q = query(collection(db, "orders"));
  return onSnapshot(q, (snapshot) => {
    console.log(snapshot.docs.map((doc) => doc.data()));
  });
};

export const updateOrder = async (chefId, idOrder, status, chefName) => {
  // debugger;
  const orderRef = doc(db, "orders", idOrder);

  await updateDoc(orderRef, {
    order_status: status,
    chef_id: chefId,
    chef_name: chefName,
  });
};

export const createOrder = async (
  waiterId,
  client_name,
  tableNumber,
  orderStatus,
  cartProducts,
  orderNumber
) => {
  console.log("creando orden!");
  const ordersRef = collection(db, "orders");
  return addDoc(ordersRef, {
    chef_id: null,
    chef_name: null,
    waiter_id: waiterId,
    order_status: orderStatus,
    client_name: client_name,
    table: tableNumber,
    order_timestamp: serverTimestamp(),
    order_products: cartProducts,
    order_number: orderNumber,
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
