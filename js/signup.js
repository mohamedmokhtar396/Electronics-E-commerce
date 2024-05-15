// ***************************************
// ***************************************
// **************FireBase*****************
// ***************************************
// ***************************************

import { app } from "./firebase.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const database = getDatabase(app);
const auth = getAuth(app);
let popup=document.getElementById("popup");

import popupError from "./popup.js";

let submit = document.getElementById("submit");

// click button

var inputs = document.querySelectorAll("input:not([type=submit])");
let userRole=document.getElementById("user-role");
var registerBtn = document.getElementById("submit");
var checkName, checkphone, checkConfirmPassword
registerBtn.addEventListener("click", function (e) {
 

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "" ) {
      inputs[i].style.border = "3px solid red"
      popupError('please fill the fields','#e55555')
      
    } else {
      inputs[i].style.border = "2px solid black"
      
    }
  }
  if ( userRole.value !="") {
    userRole.style.border = "2px solid black"
  } else {
    userRole.style.border = "3px solid red"
    popupError('please fill the fields','#e55555')
  }

  //  regex
  var userName = document.getElementById("name");
  var userNamePattren = /^([ا-يa-zA-Zا0-9_\s]+)$/;

  if (userName.value != 0) {
    if (userNamePattren.test(userName.value) == false) {
      userName.style.border = `3px solid red`;
      popupError('Name not valid','#e55555')
      checkName=false;
    }else{
      checkName=true;
      userName.style.border = `3px solid black`;
    }
  }

  var phone = document.getElementById("phone");
  var phonePattren = /^[0-9]{11}$/;

  if (phone.value != 0) {
    if (phonePattren.test(phone.value) == false) {
      phone.style.border = '3px solid red';
      popupError('phone not valid','#e55555')
      checkphone=false;
    }else{
      phone.style.border = '3px solid black';
      checkphone=true;
    }
  }



  var confirmPassword = document.getElementById("confirmPassword");
  if (confirmPassword.value != 0) {
    if (confirmPassword.value != password.value) {
      confirmPassword.style.border ='3px solid red' 
      popupError('write same as password','#e55555')
      checkConfirmPassword=false;
    }else{
      checkConfirmPassword=true;
      confirmPassword.style.border ='3px solid black' 
    }
  }

  
});

submit.addEventListener("click", function (e) {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  console.log(checkName)
  console.log(checkphone)
  console.log(checkConfirmPassword)
  if (checkName==true && checkphone==true &&checkConfirmPassword==true) {
    createUserWithEmailAndPassword(auth, email,password, name, phone)
      .then((userCredential) => {
        const user = userCredential.user;

        return set(ref(database, "users/" + user.uid), {
          email: email,
          name: name,
          phone: phone,
          userRole:userRole.value
        });
      })
      .then(() => {
        popupError('Account Created Successfully','#74e555','./login.html')
        
      })
      .catch((error) => {
        const errormsg = error.message;
        // alert(errormsg)
        popupError(errormsg,'#e55555')
      });
  } else {
    return;
  }
});
