import { app } from "./firebase.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection,deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";

firebase.initializeApp(firebaseConfig)
const storage=firebase.storage()



const db = getFirestore(app);
// ******************************************/
// ******************************************/
// ******************************************/

// get data from localStorage
var userDetails = JSON.parse(localStorage.getItem("userLoggedIn"));
let wishliveCount
let wishCount=document.getElementById('wish-items-count')
const allWishes=[]


function getAllProducts() {
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


async function display() {
  await getDocs(wishListRef)
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // Check if the productId matches the product to remove
          allWishes.push(doc.data())
      });
  })
  // console.log(allWishes.length)
wishliveCount=allWishes.length
wishCount.innerHTML = wishliveCount;
getAllProducts().then((products) => {
  //   console.log(products);
    var cards = ``;
    for (let i = 0; i < products.length; i++) {
       // Check if the product is in the wishlist
       const isInWishlist = allWishes.some((wish) => wish.productId === products[i].id);
    //    console.log(isInWishlist)
       // Set the icon color based on whether the product is in the wishlist
       const iconColor = isInWishlist ? 'red' : ''; // Set to red if in wishlist, otherwise default color
    //   console.log(iconColor)
      if (isInWishlist) {
        cards += `
            <div class="card" >
                <div class="Wish">
                    <i id="wish-${i}" class="fas fa-heart"  style="color:${iconColor}"></i>
                </div>
                <div class="card-img" id="singleProduct-${i}">
                <h1 class="productName productName2">${products[i].productName}</h1>
                <img src="${products[i].fileInput}" alt="" />
                </div>
                <div class="card-content">
                    <div class="icons-card-content">
                        <p id="price">${Math.trunc(products[i].productPrice - (products[i].productPrice * products[i].productDiscount / 100))}$    <span style="color: gray; text-decoration: line-through;"> ${products[i].productPrice}$</span></p>
                        <p id="rating">${products[i].productCategory}</p>
                        <i class="fab fa-buffer" style="color: var(--pcolor);margin-top:2px;"></i>
                    </div>
                    <h1 class="productName">${products[i].productName}</h1>
                    <p>${products[i].productDescription}</p>
                </div>
            </div>
        `;
        
      }
    }
    document.getElementById("cards").innerHTML = cards;

    // Add event listeners to wish icons
    products.forEach((product, index) => {
      const wishElement = document.getElementById(`wish-${index}`);
      if (wishElement) {
          wishElement.addEventListener('click', function() {
              wishColor(this,index);
          });
      }
  });
  
     // Add event listeners to single product info
    products.forEach((product, index) => {
            const singleProductElement = document.getElementById(`singleProduct-${index}`);
    if (singleProductElement) {
            singleProductElement.addEventListener('click', function() {
            singleProduct(product);
        });
    }
});

});
}

display()



function wishColor(element,index) {
  getDocs(wishListRef)
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // Check if the productId matches the product to remove
                  if (doc.data().productId === index) {
                      element.style.color = 'red';
                  }
              });
          })
  // console.log(index)


  getAllProducts().then((products) => {
      // console.log(products[index].id)
      
      if (element.style.color === 'red') {
          element.style.color = ''; // Reset to default color
          element.style.transform = ''; // Reset rotation
          wishliveCount--
          userDetails.wish=wishliveCount
          localStorage.setItem('userLoggedIn', JSON.stringify(userDetails));
          removeWish(products[index].id)
          
      } else {
          element.style.color = 'red'; // Set to red
          element.style.transform = 'rotate(1turn)'; // Rotate
          wishliveCount++
          userDetails.wish=wishliveCount
          localStorage.setItem('userLoggedIn', JSON.stringify(userDetails));
          addWish(products[index].id)
           
        }
        wishCount.innerHTML = wishliveCount;
  })
  
}

import { wishListRef } from "./userInteractions.js";
function addWish(index) {
  console.log(index)
  addDoc(wishListRef,{
      productId: index
  })
  

  // Create subcollections for wishList, purchased, and owned
}
function removeWish(index) {
      const docId = index; // Assuming products have an id property
      
      // Get the wishlist documents
      getDocs(wishListRef)
          .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // Check if the productId matches the product to remove
                  if (doc.data().productId === docId) {
                      // Delete the document
                      deleteDoc(doc.ref)
                  }
              });
          })
          
          
}


async function singleProduct(product){
    console.log(product)

    localStorage.setItem("productinfo", JSON.stringify(product));
        window.location.href='./singleProduct.html'

}