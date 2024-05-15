import { app } from "./firebase.js";
import {getDatabase,get,set,ref,child,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection,deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

firebase.initializeApp(firebaseConfig)
// const app=initializeApp(firebaseConfig)
const storage=firebase.storage()
// console.log(storage)
// const storage=firebase.storage()

const db = getFirestore(app);
// ******************************************/
// ******************************************/
// ******************************************/

// get data from localStorage
var userDetails = JSON.parse(localStorage.getItem("userLoggedIn"));
let wishliveCount
let wishCount=document.getElementById('wish-items-count')
const allWishes=[]
let cartliveCount
let cartCount=document.getElementById('cart-items-count')
const allcart=[]



import {getAllProducts}from "./getAllProducts.js"

async function display() {
    await getDocs(wishListRef)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Check if the productId matches the product to remove
            allWishes.push(doc.data())
            return allWishes
        });
    })
wishliveCount=allWishes.length
wishCount.innerHTML = wishliveCount;

    await getDocs(cartListRef)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Check if the productId matches the product to remove
            allcart.push(doc.data())
            return allcart
        });
    })
cartliveCount=allcart.length
cartCount.innerHTML = cartliveCount;
userDetails.wish=wishliveCount
userDetails.cart=cartliveCount
localStorage.setItem('userLoggedIn', JSON.stringify(userDetails));

// Add event listeners to category <li> elements
let categoryName='All'
document.querySelectorAll('.choose-category ul li').forEach((category, index) => {
    category.addEventListener('click', function() {
         categoryName = category.textContent.trim();
        // displayFilteredProducts(categoryName);
        console.log(categoryName)

        document.querySelectorAll('.choose-category ul li').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add 'active' class to the clicked category
        // category.classList.add('active');
        localStorage.setItem('selectedCategory', categoryName);
        
        // getFilteredProducts(categoryName)
        window.location.href = `?category=${encodeURIComponent(categoryName)}`;
    });
});

// Function to set the active class based on the stored selected category
function setActiveCategory() {
    const selectedCategory = localStorage.getItem('selectedCategory');
    const categories = document.querySelectorAll('.choose-category ul li');
    categories.forEach(category => {
        if (category.textContent.trim() === selectedCategory) {
            category.classList.add('active');
        } else {
            category.classList.remove('active');
        }
    });
}

// Call the setActiveCategory function when the page loads
setActiveCategory();

getFilteredProducts(categoryName)





  
}
     display();







function getFilteredProducts() {
      // Retrieve category from URL query parameter
      const params = new URLSearchParams(window.location.search);

      const categoryName = params.get('category') || 'All'; // Default to 'All' if no category is provided
      if (categoryName=='') {
    
        document.querySelector('.choose-category ul li .All').classList.add('active');
    }
      // Your filtering logic based on categoryName
    getAllProducts().then((products) => {
        let filteredProducts;
        if (categoryName === 'All') {
            filteredProducts = products;
        } else {
            filteredProducts = products.filter(product => product.productCategory == categoryName);
        }

        var cards = ``;
        for (let i = 0; i < filteredProducts.length; i++) {
            // Check if the product is in the wishlist
            const isInWishlist = allWishes.some((wish) => wish.productId === filteredProducts[i].id);
            const isInCartlist = allcart.some((cart) => cart.productId === filteredProducts[i].id);
            // Set the icon color based on whether the product is in the wishlist
            const iconColor = isInWishlist ? 'red' : ''; // Set to red if in wishlist, otherwise default color
            const cartColor = isInCartlist ? 'var(--pcolor)' : ''; // Set to red if in wishlist, otherwise default color
            cards += `
                <div class="card">
                    <div class="Wish">
                        <i data-productid="${filteredProducts[i].id}" class="fas fa-heart" style="color:${iconColor}"></i>
                    </div>
                    <div class="cart">
                        <i data-productid="${filteredProducts[i].id}" class="fas fa-cart-plus" style="background-color:${cartColor}"></i>
                    </div>
                    <div class="card-img" id="singleProduct-${i}">
                        <h1 class="productName productName2">${filteredProducts[i].productName}</h1>
                        <img src="${filteredProducts[i].fileInput}" alt="" />
                    </div>
                    <div class="card-content">
                        <div class="icons-card-content">
                            <p id="price">${Math.trunc(filteredProducts[i].productPrice - (filteredProducts[i].productPrice * filteredProducts[i].productDiscount / 100))}$    <span style="color: gray; text-decoration: line-through;"> ${filteredProducts[i].productPrice}$</span></p>
                            <p id="rating">${filteredProducts[i].productCategory}</p>
                            <i class="fab fa-buffer" style="color: var(--pcolor);margin-top:2px;"></i>
                        </div>
                        <h1 class="productName">${filteredProducts[i].productName}</h1>
                        <p class="description">${filteredProducts[i].productDescription}</p>
                    </div>
                </div>
            `;
        }
        if (filteredProducts.length === 0) {
            cards = `<h3>Not Available!</h3>`;
        }
        document.getElementById("cards").innerHTML = cards;


        // Update the event listeners to retrieve productId from data attribute
// Add event listeners to wish icons
document.querySelectorAll('.Wish i').forEach((wishIcon) => {
    wishIcon.addEventListener('click', function() {
        const productId = this.getAttribute('data-productid');
        wishColor(this, productId);
    });
});

// Add event listeners to cart icons
document.querySelectorAll('.cart i').forEach((cartIcon) => {
    cartIcon.addEventListener('click', function() {
        const productId = this.getAttribute('data-productid');
        cartColor(this, productId);
    });
});

        // // Add event listeners to wish icons
        // filteredProducts.forEach((product, index) => {
        //     document.getElementById(`wish-${index}`).addEventListener('click', function() {
        //         wishColor(this, index);
        //     });
        // });

        // // Add event listeners to cart icons
        // filteredProducts.forEach((product, index) => {
        //     document.getElementById(`cart-${index}`).addEventListener('click', function() {
        //         cartColor(this, index);
        //     });
        // });

        // Add event listeners to single product info
        filteredProducts.forEach((product, index) => {
            document.getElementById(`singleProduct-${index}`).addEventListener('click', function() {
                singleProduct(product);
            });
        });
    });
}
















function wishColor(element,productId) {
    getDocs(wishListRef)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // Check if the productId matches the product to remove
                    if (doc.data().productId === productId) {
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
            removeWish(productId)
        } else {
            element.style.color = 'red'; // Set to red
            element.style.transform = 'rotate(1turn)'; // Rotate
            wishliveCount++
            userDetails.wish=wishliveCount
            localStorage.setItem('userLoggedIn', JSON.stringify(userDetails));
            addWish(productId)
             
          }
          wishCount.innerHTML = wishliveCount;
    })
    
}

import { wishListRef } from "./userInteractions.js";

function addWish(productId) {

    console.log(productId)
    
    addDoc(wishListRef,{
        productId: productId
    })
    

    // Create subcollections for wishList, purchased, and owned
}
function removeWish(productId) {
        const docId = productId; // Assuming products have an id property
        
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


// cart
function cartColor(element,productId) {
    getDocs(cartListRef)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // Check if the productId matches the product to remove
                    if (doc.data().productId === productId) {
                        element.style.backgroundColor = 'var(--pcolor)';
                    }
                });
            })
    // console.log(index)
    getAllProducts().then((products) => {
        // console.log(products[index].id)
        
        if (element.style.backgroundColor === 'var(--pcolor)') {
            element.style.backgroundColor = ''; // Reset to default color
            element.style.transform = ''; // Reset rotation
            cartliveCount--
            userDetails.cart=cartliveCount
            localStorage.setItem('userLoggedIn', JSON.stringify(userDetails));
            removecart(productId)
        } else {
            element.style.backgroundColor = 'var(--pcolor)'; // Set to red
            element.style.transform = 'rotate(1turn)'; // Rotate
            cartliveCount++
            userDetails.cart=cartliveCount
            localStorage.setItem('userLoggedIn', JSON.stringify(userDetails));
            addcart(productId)
             
          }
          cartCount.innerHTML = cartliveCount;
    })
    
}

import { cartListRef } from "./userInteractions.js";
function addcart(productId) {
    console.log(productId)
    addDoc(cartListRef,{
        productId: productId
    })
    

    // Create subcollections for wishList, purchased, and owned
}
function removecart(productId) {
        const docId = productId; // Assuming products have an id property
        
        // Get the wishlist documents
        getDocs(cartListRef)
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