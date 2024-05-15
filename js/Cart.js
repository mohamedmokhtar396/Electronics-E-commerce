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
let cartliveCount
let cartCount=document.getElementById('cart-items-count')
const allcart=[]


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
  await getDocs(cartListRef)
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // Check if the productId matches the product to remove
          allcart.push(doc.data())
      });
  })
  // console.log(allcart.length)
cartliveCount=allcart.length
cartCount.innerHTML = cartliveCount;
getAllProducts().then((products) => {
  //   console.log(products);
    var cards = ``;
    for (let i = 0; i < products.length; i++) {
       // Check if the product is in the wishlist
       const isInCartlist = allcart.some((cart) => cart.productId === products[i].id);
       // Set the icon color based on whether the product is in the wishlist
       const cartColor = isInCartlist ? 'var(--pcolor)' : ''; // Set to red if in wishlist, otherwise default color
      if (isInCartlist) {
        cards += `
            <div class="card" >

                <div class="cart" style="top:0.3rem;">
                <i id="cart-${i}" class="fas fa-cart-plus"  style="background-color:${cartColor}; top:1rem;"></i>
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

    // Add event listeners to cart icons
    products.forEach((product, index) => {
        const cartElement=document.getElementById(`cart-${index}`)
        
        if (cartElement) {
            cartElement.addEventListener('click', function() {
                cartColor(this,index);
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




// cart
function cartColor(element,index) {
    getDocs(cartListRef)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // Check if the productId matches the product to remove
                    if (doc.data().productId === index) {
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
            removecart(products[index].id)
        } else {
            element.style.backgroundColor = 'var(--pcolor)'; // Set to red
            element.style.transform = 'rotate(1turn)'; // Rotate
            cartliveCount++
            userDetails.cart=cartliveCount
            localStorage.setItem('userLoggedIn', JSON.stringify(userDetails));
            addcart(products[index].id)
             
          }
          cartCount.innerHTML = cartliveCount;
    })
    
}

import { cartListRef } from "./userInteractions.js";
import popupError from "./popup.js";
function addcart(index) {
    console.log(index)
    addDoc(cartListRef,{
        productId: index
    })
    

    // Create subcollections for wishList, purchased, and owned
}
function removecart(index) {
        const docId = index; // Assuming products have an id property
        
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



// import popupError from "./popup.js";

let checkoutButton=document.getElementById('checkOut');
let popupElement;

// Initialize popup content with table headers
// Add event listener to the checkout button
checkoutButton.addEventListener('click', function() {
    // Initialize total price
    let totalPrice = 0;

    // Initialize popup content with table structure
    let popupContent = `
    <span style="font-size: 22px;" class="close-btn" >&times;</span>
        <h2>Checkout</h2>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Retrieve the list of products from Firestore
    getAllProducts()
        .then((products) => {
            // Retrieve the list of products in the cart from Firestore
            getDocs(cartListRef)
                .then((querySnapshot) => {
                    // Loop through the products in the cart and add each product to the table
                    querySnapshot.forEach((doc) => {
                        // Get the product ID from Firestore
                        const productId = doc.data().productId;

                        // Find the product in the products array using the product ID
                        const product = products.find((p) => p.id === productId);

                        // If the product is found, add its name and price to the table
                        if (product) {
                            // Calculate the discounted price if applicable
                            const discountedPrice = product.productPrice - (product.productPrice * product.productDiscount / 100);
                            totalPrice += discountedPrice;

                            // Add product name and price to the table rows
                            popupContent += `
                                <tr>
                                    <td>${product.productName}</td>
                                    <td>$${discountedPrice.toFixed(2)}</td>
                                </tr>`;
                        }
                    });

                    // Add total price row to the table
                    popupContent += `
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total Price:</td>
                                <td>$${totalPrice.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <select id="bank">
                        <option value="" selected disabled>Bank Name</option>
                        <option>QNB</option>
                        <option>CIB</option>
                        <option>SAIB</option>
                        <option>Dubai</option>
                        <option>AlAhly</option>
                    </select>
                    <input id="visa" type="text" pattern="[0-9]{16}" title="Please enter exactly 16 numbers" placeholder="Visa Card Number" required>

                    <button id="buy">BUY $</button>
                    `;

                    // Create a popup element
                    popupElement = document.createElement('div');
                    popupElement.classList.add('POPUP');
                    popupElement.innerHTML = popupContent;

                    // Append popup element to the body
                    document.querySelector('.div').appendChild(popupElement);
                    document.querySelector('.div').style.display='block';
                    
                    // Add event listener to close the popup when clicked outside
                    let close=document.querySelector('.close-btn')
                    if (close) {
                        close.addEventListener('click', function(event) {
                            popupElement.remove();
                            document.querySelector('.div').style.display='none';

                        });
                    }
                })
                .catch((error) => {
                    console.error('Error getting products from cart: ', error);
                    alert('An error occurred while creating the checkout popup. Please try again later.');
                });
        })
        .catch((error) => {
            console.error('Error getting products: ', error);
            alert('An error occurred while retrieving product information. Please try again later.');
        });
});


document.addEventListener('click', function(event) {
    if (event.target.id === 'buy') {
        if(bank.value==0 || visa.value==0){
            // popupError('please Fill Inputs','#e55555')
            bank.style.border = '1px solid red'
            visa.style.border = '1px solid red'
        }else{
        console.log('buy')
        // Remove all documents from the cart collection
        getDocs(cartListRef)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    deleteDoc(doc.ref)
                        .then(() => {
                            popupError('Purchase Completed!','#74e555')
                            console.log('Product removed from cart:', doc.id);
                        })
                        .catch((error) => {
                            console.error('Error removing product from cart:', error);
                        });
                });
            })
            .catch((error) => {
                console.error('Error getting cart:', error);
            });
        
        // Close the popup
        popupElement.remove();
        document.querySelector('.div').style.display='none';
        setTimeout(() => {
            window.location.reload()

        },3000)

    }
    }
});

