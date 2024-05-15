
import { app } from "./firebase.js";
import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const auth = getAuth(app);

const emailInput = document.getElementById("email");
const submit = document.getElementById("submit");
let popup=document.getElementById("popup");

function popupError (message,color,location) {
  popup.style.backgroundColor = `${color}`;
  popup.style.visibility = "visible";
  popup.innerHTML = `${message}`;
  setTimeout(() => {
    document.getElementById("popup").style.visibility = "hidden";
    if(location==null){
      location='#'
    }else{
      window.location.href=`${location}`
    }
  }, 3000);
}


submit.addEventListener("click", (e) => {
  e.preventDefault();

  const email = emailInput.value;

  sendPasswordResetEmail(auth, email)
    .then(() => {
      popupError("Link Sent To Your Email Successfully!",'#74e555','./login.html');
    })
    .catch((error) => {
      popupError(error.message,'#e55555');

    });
});
