 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

 import {getDatabase} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

 const firebaseConfig = {
  apiKey: "AIzaSyCUVfYDRz17I8br4VPd781oyniGocRUk2M",
  authDomain: "aou-graduation-project.firebaseapp.com",
  projectId: "aou-graduation-project",
  storageBucket: "aou-graduation-project.appspot.com",
  messagingSenderId: "228377099640",
  appId: "1:228377099640:web:fdc95a9de0b24fd32e5c8d"
};

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
//  const storage = getStorage(app);
 const database=getDatabase(app);


  export { database,app,firebaseConfig };