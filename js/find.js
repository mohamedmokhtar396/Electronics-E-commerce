import { app } from "./firebase.js";
import {getFirestore,doc,setDoc,getDocs,addDoc,collection,deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase.js";

firebase.initializeApp(firebaseConfig)
const storage=firebase.storage()



const db = firebase.firestore();
// ******************************************/
// ******************************************/
// check login
var checkLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
console.log(checkLoggedIn);

const loginBtn = document.getElementById("loginBtn");
const logOutBtn = document.getElementById("logoutBtn");
if (checkLoggedIn) {
    if (checkLoggedIn.loggedIn == true) {
      loginBtn.style.display = "none";
      logOutBtn.style.display = "block";
    } else {
      window.location.href = "./login.html";
    }
}




logOutBtn.addEventListener("click", () => {
  localStorage.removeItem("userLoggedIn");
});



// ******************************************/
import popupError from "./popup.js";

document.addEventListener('DOMContentLoaded', function () {
    const findForm = document.getElementById('find-form');
    const addForm = document.getElementById('add-form');
    const findButton = document.getElementById('find');
    const addButton = document.getElementById('add');

    // Show find form and hide add form by default
    findForm.style.display = 'block';
    addForm.style.display = 'none';

    // Event listener for Find button
    findButton.addEventListener('click', function () {
        document.getElementById('result').style.display='block'
        findForm.style.display = 'block';
        addForm.style.display = 'none';
        findButton.classList.add('clicked');
        addButton.classList.remove('clicked');
    });

    // Event listener for Add button
    addButton.addEventListener('click', function () {
        document.getElementById('result').style.display='none'
        findForm.style.display = 'none';
        addForm.style.display = 'block';
        addButton.classList.add('clicked');
        findButton.classList.remove('clicked');
            const scriptElement = document.createElement('script');
            scriptElement.src = '../js/checkLogIn.js';
    
            // Append the <script> element to the <body> to execute the script
            document.body.appendChild(scriptElement);
    });






    // Event listener for find form submission
findForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the serial number entered by the user
    const serialNumber = document.getElementById('search-serial-number').value;

    // Check if the input is empty
    if (!serialNumber.trim()) {
        // Display error message if input is empty
        popupError('fill input first!','#e55555')
        return; // Exit the function
    }

    // Query Firestore to retrieve the document corresponding to the serial number
    db.collection('serialNumbers').doc(serialNumber).get()
    .then((doc) => {
        if (doc.exists) {
            // Document exists, extract phone and name
            const data = doc.data();
            const phone = data.phone;
            const name = data.name;
            const description = data.description;

            // Display retrieved data in table
            const table = `
            <table>
                <tr>
                    <th>Serial Number</th>
                    <td>${serialNumber}</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>${name}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>${phone}</td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>${description}</td>
                </tr>
            </table>
        `;
            document.getElementById('result').innerHTML = table;
        } else {
            // Document does not exist, display error message
            document.getElementById('result').innerHTML = 'Serial number not found.';
        }
    })
    .catch((error) => {
        console.error('Error retrieving data from Firestore: ', error);
    });
});

    

    // Event listener for add form submission
    addForm.addEventListener('submit', function (event) {
        
        event.preventDefault();
    
        // Get form input values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const serialNumber = document.getElementById('serial-number').value;
        const description = document.getElementById('description').value;
    
        // Check if any field is empty
        if (!name || !phone || !serialNumber || !description) {
            // Display error message
            popupError('Error: All fields are required.','#e55555')
    
            // Change border color of empty input fields to red
            if (!name) document.getElementById('name').style.borderColor = 'red';
            if (!phone) document.getElementById('phone').style.borderColor = 'red';
            if (!serialNumber) document.getElementById('serial-number').style.borderColor = 'red';
            if (!description) document.getElementById('description').style.borderColor = 'red';
    
            return; // Exit function early
        }
    
        // Check if the serial number already exists
        db.collection('serialNumbers').doc(serialNumber).get()
        .then((doc) => {
            if (doc.exists) {
                // Serial number already exists, display error message
                popupError(`Error: Serial number already exists.`,'#e55555')
            } else {
                // Serial number doesn't exist, add data to Firestore
                db.collection('serialNumbers').doc(serialNumber).set({
                    phone: phone,
                    name: name,
                    description: description
                })
                .then(() => {
                    
                    popupError('Added Successfully!','#74e555')
                    document.getElementById('name').value = '';
                    document.getElementById('phone').value = '';
                    document.getElementById('serial-number').value = '';
                    document.getElementById('description').value = '';
                })
                .catch((error) => {
                    popupError(`Error adding data to Firestore: ${error}`,'#e55555')
                });
            }
        })
        .catch((error) => {
            // popupError(error,'#e55555')
            console.error('Error checking serial number in Firestore: ', error);
        });
    });
    
    
});


// edit data
// Retrieve the phone number from the user's data stored in localStorage
let verify = JSON.parse(localStorage.getItem('userLoggedIn'));
const userPhone = verify.phone;


// JavaScript for displaying serial numbers and fields on cards
document.addEventListener('DOMContentLoaded', function () {
    // Query Firestore to retrieve serial numbers matching userPhone
    db.collection('serialNumbers').where('phone', '==', userPhone).get()
    .then((querySnapshot) => {
        const serialNumbersContainer = document.getElementById('serialNumbersContainer');

        // Loop through each document in the query result
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Create a card for each serial number
            const card = document.createElement('div');
            card.classList.add('serial-number-card');

            // Populate card with serial number fields
            const html = `
                <div class="card-header">
                    <h3>Serial Number: ${doc.id}</h3>
                    <button class="edit-btn" data-id="${doc.id}">Edit</button>
                </div>
                <div class="card-content">
                    <p><strong>Name:</strong> <span id="name-${doc.id}">${data.name}</span></p>
                    <p><strong>Phone:</strong> <span id="phone-${doc.id}">${data.phone}</span></p>
                    <p><strong>Description:</strong> <span id="description-${doc.id}">${data.description}</span></p>
                </div>
            `;
            card.innerHTML = html;

            // Append card to container
            serialNumbersContainer.appendChild(card);
        });

        // Add event listener to all edit buttons
        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const serialNumberId = event.target.dataset.id;
                openPopup(serialNumberId);
            });
        });
    })
    .catch((error) => {
        console.error('Error retrieving serial numbers from Firestore: ', error);
    });
});

// Function to open the edit popup
function openPopup(serialNumberId) {
    // Get data of the serial number
    const name = document.getElementById(`name-${serialNumberId}`).innerText;
    const phone = document.getElementById(`phone-${serialNumberId}`).innerText;
    const description = document.getElementById(`description-${serialNumberId}`).innerText;

    // Populate the popup fields with data
    document.getElementById('editName').value = name;
    document.getElementById('editPhone').value = phone;
    document.getElementById('editDescription').value = description;

    // Display the popup
    document.getElementById('editPopup').style.display = 'block';

    // Set the data-id attribute of the Save button to the serialNumberId
    document.getElementById('editForm').setAttribute('data-id', serialNumberId);
}

// Function to close the edit popup
function closePopup() {
    document.getElementById('editPopup').style.display = 'none';
}
document.querySelector('.close-btn').addEventListener('click', function() {
    console.log('ssssssssssssssss')
    closePopup();
})
// Function to handle form submission
document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the serial number ID from the form's data-id attribute
    const serialNumberId = this.getAttribute('data-id');

    // Get the updated values from the form fields
    const newName = document.getElementById('editName').value;
    const newPhone = document.getElementById('editPhone').value;
    const newDescription = document.getElementById('editDescription').value;

    // Update the Firestore document with the new values
    db.collection('serialNumbers').doc(serialNumberId).update({
        name: newName,
        phone: newPhone,
        description: newDescription
    })
    .then(() => {
        // Update the UI with the new values
        document.getElementById(`name-${serialNumberId}`).innerText = newName;
        document.getElementById(`phone-${serialNumberId}`).innerText = newPhone;
        document.getElementById(`description-${serialNumberId}`).innerText = newDescription;

        // Close the popup
        closePopup();

        // Show success message
        popupError('Changed Successfully!','#74e555')
    })
    .catch((error) => {
        popupError(error,'#e55555')
        console.error('Error updating document: ', error);
    });
});


