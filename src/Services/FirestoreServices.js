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

export const ordersListener = () => {
  const q = query(collection(db, "orders"));
  return onSnapshot(q, (snapshot) => {
    console.log(snapshot.docs.map((doc) => doc.data()));
    // console.log(snapshot.docs.map((doc) => doc.data()));
  });
};

export const updateOrder = async (chefId, idOrder, status, chefName) => {
  const orderRef = doc(db, "orders", idOrder);

  await updateDoc(orderRef, {
    order_status: status,
    chef_id: chefId,
    chef_name: chefName,
  });
};

export const updateStatusOrder = async (idOrder, status) => {
  const orderRef = doc(db, "orders", idOrder);

  await updateDoc(orderRef, {
    order_status: status,
  });
};

export const createOrder = async (
  waiterId,
  client_name,
  tableNumber,
  orderStatus,
  cartProducts
) => {
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
  const postPath = "products";
  const fileName = file.name;
  const imageRef = ref(storage, `${postPath}/${catName}/${fileName}`);
  return uploadBytes(imageRef, file).then((snapshot) =>
    getDownloadURL(snapshot.ref)
  );
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
    description: productDescription,
    product_cost: productCost, //array
    product_option: productOption, //array
    product_photo: productPhoto, //array
    product_stock: productStock, //array
  });
}
