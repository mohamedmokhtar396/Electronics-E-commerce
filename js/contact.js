import { app } from "./firebase.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection,deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";

firebase.initializeApp(firebaseConfig)
const storage=firebase.storage()



const db = firebase.firestore();
// ******************************************/
// ******************************************/
// ******************************************/


import popupError from "./popup.js";

// Get a reference to the contact form
const submit = document.getElementById('submit');

// Add submit event listener to the contact form
submit.addEventListener('click', (e) => {
  e.preventDefault();

  // Get form input values
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let message = document.getElementById('message').value;

  // Validate inputs
  if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      popupError('Please fill in all fields.', '#e55555');
      return; // Exit the function if any field is empty
  }

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
      popupError('Please enter a valid email address.', '#e55555');
      return; // Exit the function if email format is incorrect
  }

  // If inputs are valid, submit data to Firestore
  db.collection('Contact Us').doc(email).set({
      name: name,
      email: email,
      message: message
  })
  .then(() => {
      popupError('Message Sent Successfully!', '#74e555');
  })
  .catch((error) => {
      console.error('Error sending message:', error);
      popupError('An error occurred. Please try again later.', '#e55555');
  });
});















