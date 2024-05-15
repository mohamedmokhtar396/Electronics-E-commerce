import { app } from "./firebase.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection,deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";

firebase.initializeApp(firebaseConfig)
// const app=initializeApp(firebaseConfig)
const storage=firebase.storage()
// console.log(storage)
// const storage=firebase.storage()

const db = getFirestore(app);
// ******************************************/
import popupError from "./popup.js";

    let updatedName = document.getElementById('name');
    let updatedDescription = document.getElementById('description');
    let updatedCategory = document.getElementById('category');
    let updatedQuantity = document.getElementById('quantity');
    let updatedPrice = document.getElementById('priceinput');
    let updatedDiscount = document.getElementById('discount');
    let fileInput = document.getElementById('fileInput');
    let fileUrls = [];



// go back btn
let goBack=document.getElementById('return')
// wait for dom ready
if (goBack) {
    goBack.addEventListener('click',function () {
        window.history.back();
    })
}
let userDetails=JSON.parse(localStorage.getItem('userLoggedIn'))

let sellerId=userDetails.userId
import { getAllProducts } from "./getAllProducts.js";
function display(){
    getAllProducts().then((products) => {
        console.log(products);
//         var cards = '';
// var matchedProducts = products.filter(product => product.PublisherId === sellerId);

// if (matchedProducts.length === 0) {
//     cards = '<p>No Added products Yet!</p>';
// } else {
//     for (let i = 0; i < matchedProducts.length; i++) {
//         cards += `
//             <div class="card" id="clickedProduct-${i}">
//                 <div class="card-img">
//                     <h1 class="productName productName2">${matchedProducts[i].productName}</h1>
//                     <img src="${matchedProducts[i].fileInput}" alt="" />
//                 </div>
//                 <div class="card-content">
//                     <div class="icons-card-content">
//                         <p id="price">${Math.trunc(matchedProducts[i].productPrice - (matchedProducts[i].productPrice * matchedProducts[i].productDiscount / 100))}$    <span style="color: gray; text-decoration: line-through;"> ${matchedProducts[i].productPrice}$</span></p>
//                         <p id="rating">${matchedProducts[i].productCategory}</p>
//                         <i class="fab fa-buffer" style="color: var(--pcolor);margin-top:2px;"></i>
//                     </div>
//                     <h1 class="productName">${matchedProducts[i].productName}</h1>
//                     <p>${matchedProducts[i].productDescription}</p>
//                 </div>
//             </div>
//         `;
//     }
// }

// document.getElementById("cards").innerHTML = cards;



        var cards = ``;
        let counter=0
        for (let i = 0; i < products.length; i++) {
           // Check if the product is in the wishlist
        //    const isInWishlist = allWishes.some((wish) => wish.productId === products[i].id);
        //    const isInCartlist = allcart.some((cart) => cart.productId === products[i].id);
           // Set the icon color based on whether the product is in the wishlist
        //    const iconColor = isInWishlist ? 'red' : ''; // Set to red if in wishlist, otherwise default color
        //    const cartColor = isInCartlist ? 'var(--pcolor)' : ''; // Set to red if in wishlist, otherwise default color
        if (products[i].PublisherId === sellerId) {
            counter++
            cards += `
                <div class="card" id="clickedProduct-${i}">
                    
                    <div class="card-img" >
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
    if (counter ===0) {
        
        cards= `
        <p>No Added Products Yet!  ......  <a href="./addProduct.html" style="color:var(--pcolor); font-size:20px">Add Now!</a> </p>
        `;
    }
        
    document.getElementById("cards").innerHTML = cards;
    
      
        // Add event listeners to clicked product info
        products.forEach((product, index) => {
            let clicked=document.getElementById(`clickedProduct-${index}`)
            if (clicked) {
                clicked.addEventListener('click', function() {
                    clickedProduct(product,index);
                });
            }
        });
    });
}
display()

let productId
let productFile
function clickedProduct(product,index) {
    document.querySelector('.edit-form').style.display = 'block';
    document.getElementById('x').addEventListener('click',function() {
        document.querySelector('.edit-form').style.display = 'none';
    })
    console.log(product)
         productId=product.id;
        // Populate form inputs with product data
        updatedName.value = product.productName;
        updatedDescription.value = product.productDescription;
        updatedCategory.value = product.productCategory;
        updatedQuantity.value = product.productQuantity;
        updatedPrice.value = product.productPrice;
        updatedDiscount.value = product.productDiscount;
        productFile = product.fileInput;
        


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

document.getElementById('submit').addEventListener('click',async function(event) {
    event.preventDefault(); // Prevent form submission
    if (fileInput.files.length>0) {
        await uploadFiles()
        productFile=fileUrls
    }
    // Update the product document in Firestore
    const productDocRef = doc(db, 'products', productId);
    const updatedData = {
        productName: updatedName.value,
        productDescription: updatedDescription.value,
        productCategory: updatedCategory.value,
        productQuantity: updatedQuantity.value,
        productPrice: updatedPrice.value,
        productDiscount: updatedDiscount.value,
        fileInput: productFile
    };

    setDoc(productDocRef, updatedData, { merge: true })
        .then(() => {
            console.log('Product updated successfully');
            popupError('Product updated successfully!','#74e555','./sellerControl.html')
            // Optionally, hide the edit form after successful update
            // document.querySelector('.edit-form').style.display = 'none';
            // display()
            // window.location.reload();
        })
        .catch((error) => {
            popupError(error,'#e55555')
            console.error('Error updating product: ', error);
            // Handle error
        });
});


// delete product
document.getElementById('delete').addEventListener('click',function(){
    console.log(productId)
    deleteProduct(productId)

})





// Function to delete a document
function deleteProduct(productId) {
    const productDocRef = doc(db, 'products', productId);

    deleteDoc(productDocRef)
        .then(() => {
            console.log('Product deleted successfully');
            document.querySelector('.edit-form').style.display = 'none';
            display(); // Refresh the product list after deletion
            popupError('Product deleted successfully!','#74e555')

             // Delete corresponding documents from the wishlist and cart collections
             removeWish(productId);
             removecart(productId);
        })
        .catch((error) => {
            popupError('Error deleting product!','#e55555')
            console.error('Error deleting product: ', error);
            // Handle errors, such as displaying an error message
        });
}

import { wishListRef } from "./userInteractions.js";

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
                    userDetails.wish --
                    localStorage.setItem('userLoggedIn', JSON.stringify(userDetails));
                    console.log('removed From Wish')
                }
            });
        })
        
    }
    
    import { cartListRef } from "./userInteractions.js";
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
                    userDetails.cart --
                    localStorage.setItem('userLoggedIn', JSON.stringify(userDetails));
                    console.log('removed From Cart')
                }
            });
        })
        
}


// let userDetails=JSON.parse(localStorage)