let count =JSON.parse(localStorage.getItem('userLoggedIn'))
console.log('wish ',count.wish)
console.log('cart ',count.cart)
let cartCount=document.getElementById('cart-items-count')
let wishCount=document.getElementById('wish-items-count')
   if (count.wish) {
       wishCount.innerHTML=count.wish 
   }
   if (count.cart) {
       cartCount.innerHTML=count.cart
   }


