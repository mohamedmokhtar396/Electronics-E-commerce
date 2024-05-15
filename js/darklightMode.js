

// Check if there's a saved mode in local storage
const savedMode = localStorage.getItem('mode');

// If there's a saved mode, apply it
if (savedMode === 'dark') {
    
    enableDarkMode();
} else {
    disableDarkMode();
}



// Function to enable dark mode
function enableDarkMode() {
    console.log('enabledark')
    document.body.style.backgroundColor = "black";
    document.body.style.color = "balck";
    document.getElementById("light").style.color='';
    document.getElementById("dark").style.color='gold';
    document.getElementById("dark").style.backgroundColor='black';
    // Select all elements with the class 'card-content'
    let categories=document.querySelector('.choose-category')
    if (categories) {
        categories.style.color='white';
    }

    // Iterate over each element and apply the style
    
    
    // Save the mode preference to local storage
    localStorage.setItem('mode', 'dark');
}



// Function to disable dark mode
function disableDarkMode() {
    document.getElementById("dark").style.color='';
    document.getElementById("dark").style.backgroundColor='';
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    document.getElementById("light").style.color='gold';
        // Select all elements with the class 'card-content'
        let categories=document.querySelector('.choose-category')
        if (categories) {
            categories.style.color='';
        }
    // Save the mode preference to local storage
    localStorage.setItem('mode', 'light');
}

// Dark mode toggle event listener
document.getElementById("dark").addEventListener("click", enableDarkMode);

// Light mode toggle event listener
document.getElementById("light").addEventListener("click", disableDarkMode);

