import { app } from "./firebase.js";
import {getDatabase,get,set,ref,child,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

firebase.initializeApp(firebaseConfig)
// const app=initializeApp(firebaseConfig)
const storage=firebase.storage()
console.log(storage)
// const storage=firebase.storage()

const db = getFirestore(app);

// db.settings({timestampsInSnapshots: true})

import popupError from "./popup.js";

// go back btn
let goBack=document.getElementById('return')
// wait for dom ready
if (goBack) {
    goBack.addEventListener('click',function () {
        window.history.back();
    })
}
// ***************************************
// ***************************************

// Selecting each element by its ID
let publisher=JSON.parse(localStorage.getItem("userLoggedIn"));
let publisherName=publisher.name 
let publisherId=publisher.userId 
let productName = document.getElementById('name');
let productDescription = document.getElementById('description');
let productCategory = document.getElementById('category');
let productQuantity = document.getElementById('quantity');
let productPrice = document.getElementById('price');
let productDiscount = document.getElementById('discount');
let fileInput = document.getElementById('productImg'); 
let fileUrls = [];
let checkInputsError=false;
let submit =document.getElementById('submit')

submit.addEventListener('click',async(e)=>{
    e.preventDefault()
    checkInputs()
    if(!checkInputsError){
        await uploadFiles()
         addData()
    }
   
  
})


function checkInputs() {
    let inputs = document.querySelectorAll('input:not([type="submit"]):not([name="discount"])');
    checkInputsError = false;
  
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value === '') {
        inputs[i].style.border = '2px solid red';
        popupError('please fill missing inputs','#e55555')
        checkInputsError = true; // Set error flag on first empty input
      } else {
        inputs[i].style.border = ''; // Clear border for non-empty inputs
      }
      if (!checkInputsError) {
        // checkInputsError = false;
        checkInputsError = !Array.from(inputs).every(input => input.value !== '');
    }
    }
    console.log(checkInputsError)
    return checkInputsError; // Return the final error state
  }
  


async function uploadFiles() {
  if (fileInput.files.length > 0) {
      submit.style.backgroundColor = 'grey';


      // Loop through each file
      for (let i = 0; i < fileInput.files.length; i++) {
          let file = fileInput.files[i];
          let name = +new Date() + "-" + file.name;
          let metadata = {
              contentType: file.type
          };

          // Upload the file
          let task = firebase.storage().ref().child(name).put(file, metadata);

          // Wait for the upload to complete
          await task.then(async snapshot => {
              // Get the download URL for the uploaded file
              let url = await snapshot.ref.getDownloadURL();
              fileUrls.push(url); // Store the URL in an array
          }).catch(console.error);
      }

      // Once all files are uploaded, do something with the URLs
      console.log("Uploaded file URLs:", fileUrls);
  }
}

function addData(){
    addDoc(collection (db,"products"),{
        PublisherId: publisherId,
        PublisherEmail: publisher.admin,
        productPublisher: publisherName,
        productName: productName.value,
        productDescription: productDescription.value,
        productCategory: productCategory.value,
        productQuantity: productQuantity.value,
        productPrice: productPrice.value,
        productDiscount: productDiscount.value,
        fileInput: fileUrls
        ,
    }).then(()=>{
        fileUrls=[]
        popupError('Product Added Successfully','#74e555')
        submit.style.backgroundColor=''
    })
    .catch((error)=>{
        popupError(error,'#e55555')

    });
}  



