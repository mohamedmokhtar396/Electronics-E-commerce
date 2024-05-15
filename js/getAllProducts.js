import {getFirestore,doc,setDoc,getDocs,addDoc,collection,deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { app } from "./firebase.js";
const db = getFirestore(app);

export function getAllProducts() {
    const productsCollection = collection(db, "products");
  
    return getDocs(productsCollection)
        .then((querySnapshot) => {
            let products = [];
            querySnapshot.forEach((doc) => {
                // Convert Firestore document to a JavaScript object
                let productData = doc.data();
                // Add document ID to the product data
                productData.id = doc.id;
                // Push product data to the products array
                products.push(productData);
            });
  
            return products; // Return the array of products
        })
        .catch((error) => {
            console.error("Error getting products: ", error);
            throw error; // Throw the error for handling outside of this function
        });
  }
  


