// cart
export function cartColor(element,index) {
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
            removecart(products[index].id)
        } else {
            element.style.backgroundColor = 'var(--pcolor)'; // Set to red
            element.style.transform = 'rotate(1turn)'; // Rotate
            cartliveCount++
            addcart(products[index].id)
             
          }
          cartCount.innerHTML = cartliveCount;
    })
    
}

import { cartListRef } from "./userInteractions.js";
export function addcart(index) {
    console.log(index)
    addDoc(cartListRef,{
        productId: index
    })
    

    // Create subcollections for wishList, purchased, and owned
}
export function removecart(index) {
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
