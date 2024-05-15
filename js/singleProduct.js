var productInfo = JSON.parse(localStorage.getItem("productinfo"))
console.log(productInfo.id)
let name=JSON.parse(localStorage.getItem("userLoggedIn"));
let userName=name.name 

let content=``
function addData(){
     content=`
     <a href="#" id="return">
     <i class="fas fa-arrow-left"></i>
     </a>
    <div class="card" >
    <div class="card-img">
        <img src="${productInfo.fileInput[0]}" alt="" id="mainImage" />
       
    </div>
    <div class="card-content">
    <h1 style="text-align: center;font-size:40px; color:var(--pcolor);"> ${productInfo.productName}</h1>
    <div class="icons-card-content">
    <p id="price">Price: ${Math.trunc(productInfo.productPrice - (productInfo.productPrice * productInfo.productDiscount / 100))}$    <span style="color: gray; text-decoration: line-through;"> ${productInfo.productPrice}$</span></p>
    <p id="category" style="font-size:22px;">Category <i class="fab fa-buffer" style="color: var(--pcolor);margin-top:2px;"></i> : ${productInfo.productCategory}</p>
    <p class="description" style="font-size:18px;"><span style="font-size:22px;">Description:</span> ${productInfo.productDescription}</p>
    <p id="quantity" style="font-size:22px;">Quantity  : ${productInfo.productQuantity}</p>
    <p id="publisher" style="font-size:18px;color:red;">Seller Name : ${productInfo.productPublisher}</p>
    <p id="publisher" style="font-size:15px;color:grey;">Seller Email  : ${productInfo.PublisherEmail}</p>
    </div>

    </div>

    </div>
    <div class="image-thumbnails">
    <!-- Thumbnails of remaining images will be dynamically added here -->
    </div>
    `
    document.querySelector('.productInfo').innerHTML =content
    
    let imgs = ``;
    for (let i = 0; i < productInfo.fileInput.length; i++) {
        if (i === 0) {
            imgs += `<img src="${productInfo.fileInput[i]}" alt="" class="thumbnail active" data-index="${i}" />`;
        } else {
            imgs += `<img src="${productInfo.fileInput[i]}" alt="" class="thumbnail" data-index="${i}" />`;
        }
    }
    document.querySelector('.image-thumbnails').innerHTML = imgs;
    
    // Add event listeners to thumbnail images
    document.querySelectorAll('.thumbnail').forEach(function(thumbnail, index) {
        thumbnail.onclick = function() {
            // Remove active class from all thumbnails
            document.querySelectorAll('.thumbnail').forEach(function(thumbnail) {
                thumbnail.classList.remove('active');
            });
    
            // Set the clicked thumbnail as active
            thumbnail.classList.add('active');
    
            // Update the main image source
            document.getElementById('mainImage').src = productInfo.fileInput[index];
        };
    });
    
    


}
addData()
function clicked(params) {
    
}

let goBack=document.getElementById('return')
// wait for dom ready
if (goBack) {
    goBack.addEventListener('click',function () {
        window.history.back();
    })
}









// comments of each product

import {getFirestore,doc,setDoc,getDocs,addDoc,collection,where } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";
import popupError from "./popup.js";

firebase.initializeApp(firebaseConfig)

const storage=firebase.storage()


const db = getFirestore();



// Function to load comments for a specific product
function loadComments(productId) {
    // Clear existing comments
    const commentsList = document.querySelector('.comments-list');
    commentsList.innerHTML = '';

    // Reference to the document within the "comments" collection
    const productCommentsRef = doc(db, 'comments', productId);

    // Query Firestore for comments under the sub-collection of the product document
    getDocs(collection(productCommentsRef, 'comments'))
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const commentData = doc.data();
                // Create HTML elements to display the comment
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.innerHTML = `
                    <p>${commentData.comment}</p>
                    <span>${commentData.username}</span>
                `;
                commentsList.appendChild(commentElement);
            });
        })
        .catch((error) => {
            console.error('Error loading comments:', error);
        });
}



// Function to add a comment to Firestore


function addComment(productId, comment, username) {
    const currentDate = new Date().toISOString();

    // Reference to the main collection "comments"
    const mainCollectionRef = collection(db, "comments");

    // Reference to the sub-collection for the specific product
    const productCommentsRef = doc(db, 'comments', productId);


    // Add the comment to the sub-collection
    addDoc(collection(productCommentsRef, 'comments'), {
        comment: comment,
        username: username,
        date: currentDate
    })
    .then(() => {
        // Reload comments after adding a new one
        loadComments(productId);
        popupError('Comment Added Successfully!','#74e555')
    })
    .catch((error) => {
        console.error('Error adding comment:', error);
        popupError(`Error adding comment: ${error}`,'#e55555')
    });
}



// Event listener for the submit button
document.getElementById('submitComment').addEventListener('click', () => {
    const commentInput = document.getElementById('commentInput');
    const comment = commentInput.value.trim(); // Remove leading and trailing whitespace
    const productId = productInfo.id; // Replace with the actual product ID
    const username = userName; // You can replace this with the actual username if you have authentication

    if (comment !== '') {
        addComment(productId, comment, username);
        commentInput.value = ''; // Clear the input field after adding the comment
    } else {
        alert('Please enter a comment.');
    }
});

// Call loadComments function to initially load comments for a product
const productId = productInfo.id; // Replace with the actual product ID
loadComments(productId);





       
