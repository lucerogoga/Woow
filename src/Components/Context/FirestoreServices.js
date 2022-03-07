import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  where,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../Config/initialize";

//---------------- Order Functions
export const createOrder = (waiterId, chefId, client_name, tableNumber) => {
  const ordersRef = collection(db, "orders");
  return addDoc(ordersRef, {
    chef_id: null,
    waiter_id: waiterId,
    order_status: "Waiting",
    client_name: client_name,
    table: tableNumber,
    order_timstamp: Date.now(),
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
