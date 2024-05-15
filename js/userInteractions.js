import { app } from "./firebase.js";
import {getDatabase,get,set,ref,child,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

// const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// create collection to user by his id
var userDetails = JSON.parse(localStorage.getItem("userLoggedIn"));
const userInteractionsRef =doc(db, "userInteractions", userDetails.userId);
const wishListRef = collection(userInteractionsRef, "wishList");
const cartListRef = collection(userInteractionsRef, "cartList");
const purchasedRef = collection(userInteractionsRef, "purchased");
const ownedRef = collection(userInteractionsRef, "owned");

export{userInteractionsRef,wishListRef, purchasedRef, ownedRef,cartListRef}