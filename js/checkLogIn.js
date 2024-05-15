var checkLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
console.log(checkLoggedIn);

const loginBtn = document.getElementById("loginBtn");
const logOutBtn = document.getElementById("logoutBtn");
if (checkLoggedIn == null) {

  window.location.href = "./login.html";
  
}else{
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


