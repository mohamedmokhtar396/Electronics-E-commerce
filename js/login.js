// ***************************************
// ***************************************
// **************FireBase*****************
// ***************************************
// ***************************************
import { app } from "./firebase.js";
import { getDatabase, get,set, ref, update,child} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword,} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const database = getDatabase(app);
const auth = getAuth();

import popupError from "./popup.js";
let popup=document.getElementById("popup");


let userdetails=[]
let userPhone

      let submit = document.getElementById("submit");
      submit.addEventListener("click", (e) => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        if(email !=0 && password !=0){

          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              const dbRef=ref(database)
    
    
              get(child(dbRef,"users/"+user.uid))
              .then((snapshot)=>{
                
                
                snapshot.forEach((childsnapshot)=>{
                      // console.log(childsnapshot.val())
                      userdetails.push(childsnapshot.val())
                      console.log(userdetails)
                      
                      
                    })
                  }).then(()=>{
                    const userData={
                      userId: user.uid,
                      loggedIn:true,
                      admin:email,
                      name:userdetails[2],
                      phone:userdetails[3],
                      userRole:userdetails[4]
  
                    }
                    localStorage.setItem("userLoggedIn", JSON.stringify(userData));
                  })
                  
  
              const dt = new Date();
              update(ref(database, "users/" + user.uid), {
                last_login: dt,
              });
  
              popupError('Logged In Successfully!','#74e555','../index.html');
              
  
  
              // alert("user logged In successfully");
            })
            .catch((error) => {
              const errorcode = error.code;
              const errormsg = error.message;
              // alert(errormsg);
              popupError(errormsg,'#e55555')
            });
        }else{

              popupError('please fill the fields','#e55555')

        }
      });
