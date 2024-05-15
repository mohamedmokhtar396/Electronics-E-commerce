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
const imgs = document.getElementById('imgs')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')
const img = document.querySelectorAll('#imgs img')
console.log(img);
let idx = 0
let interval = setInterval(run, 2000)

function run() {
    idx++
    changeImage()
}

function changeImage() {
    if(idx > img.length - 1) {
        idx = 0
    } else if(idx < 0) {
        idx = img.length - 1
    }

    imgs.style.transform = `translateX(${-idx * 350}px)`
}

function resetInterval() {
    clearInterval(interval)
    interval = setInterval(run, 2000)
}

rightBtn.addEventListener('click', () => {
    idx++
    changeImage()
    resetInterval()
})

leftBtn.addEventListener('click', () => {
    idx--
    changeImage()
    resetInterval()
})

var checkLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
console.log(checkLoggedIn.userRole);
let welcomeBox=document.getElementById("sell")
if (checkLoggedIn.userRole=='seller') {
    let welcomemsg=`
                <h1>Welcome <span style="color: #eb5e28; text-transform: capitalize;"> ${checkLoggedIn.name.split(" ")[0]}</span> <br> <span style="margin-left: 2rem;">Add Your Products</span></h1>
                <a href="./addProduct.html"> <button style="width:100%;">Add Product</button> </a>
                `
    welcomeBox.innerHTML=welcomemsg
    
}else{
    let welcomemsg=`
                <h1>Welcome <span style="color: #eb5e28; text-transform: capitalize;"> ${checkLoggedIn.name.split(" ")[0]}</span> <br> <span style="margin-left: 2rem;">Discover Products</span></h1>
                <a href="./products.html"> <button style="width:100%;">Discover</button> </a>
                `
    welcomeBox.innerHTML=welcomemsg
    document.querySelector('.seller-icon').style.display='none'
    
}














