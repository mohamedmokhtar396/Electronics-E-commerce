const chatContainer = document.getElementById('chat-container');
const chatHeader = document.getElementById('chat-header');
const expandBtn = document.getElementById('expand-btn');
const chatDisplay = document.getElementById('chat-display');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
// var aa=window.location.href='./products.html'
// Define responses based on user input
const responses = {
    'hello': 'Hi there! How can I help you?',
    'how are you': 'I am just a bot, but thanks for asking!',
    'bye': 'Goodbye! Have a great day.',
    'what is your name': 'I am a chatbot created to assist you.',
    'who created you': 'I was created by Mohamed Mokhtar.',
    'tell me a joke': 'Why don’t scientists trust atoms? Because they make up everything!',
    'what time is it': `I'm sorry, I don't have access to the current time.`,
    'products': `there are many categories at products page              
    phones,
    laptops,
    headphones,
    accessories`,
    'add product': 'If you are a seller, you can add new products on the "Add Product" page.',
    'edit product': 'Sellers have the ability to edit product details on the "Edit Product" page.',
    'delete product': 'To remove a product, sellers can navigate to the "Delete Product" section.',
    'filter products': 'You can filter products by category on our products page to find what you need more easily.',
    'single product': 'View detailed information about a specific product on its individual page.',
    'comment section': 'Leave your feedback and thoughts about a product in the comments section.',
    'find serial owner': 'Enter the serial number to find the owner details of a product.',
    'contact us': 'Reach out to us with any inquiries or issues through our contact form on the "Contact Us" page.',
    'login': 'Sign in to access your account and manage your orders and preferences.',
    'signup': 'Create a new account to start shopping and enjoy exclusive benefits.',
    'forgot password': 'Forgot your password? No worries! You can reset it easily on the "Forgot Password" page.',
    'track order': 'To track your order, go to the "Track Order" page and enter your order details.',
    'shipping information': 'Find information about shipping rates, delivery times, and policies on our "Shipping Information" page.',
    'return policy': 'Learn about our return policy and procedures on the "Return Policy" page.',
    'privacy policy': 'Read our privacy policy to understand how we collect, use, and protect your personal information.',
    'terms and conditions': 'Review our terms and conditions for using our website and services on the "Terms and Conditions" page.',
    'about us': 'Discover more about our company, mission, and values on the "About Us" page.',
    'FAQs': 'Check our frequently asked questions (FAQs) for answers to common inquiries on the "FAQs" page.',
    'wishlist': 'Save your favorite products for later by adding them to your wishlist.',
    'compare products': 'Compare features, prices, and specifications of different products side by side.',
    'featured products': 'Explore our curated selection of featured products on the homepage.',
    'best sellers': 'Discover our top-selling products based on customer preferences and reviews.',
    'new arrivals': 'Stay updated with our latest product arrivals and releases.',
    'discounts and offers': 'Take advantage of special discounts, promotions, and offers available on selected products.',
    'customer reviews': 'Read reviews and ratings from other customers to make informed purchasing decisions.',
    'customer support': 'Reach out to our customer support team for assistance with orders, returns, or any other inquiries.',
    'gift cards': 'Purchase gift cards for your friends and family to let them choose their favorite products.',
    'subscribe to newsletter': 'Stay informed about our latest updates, promotions, and exclusive offers by subscribing to our newsletter.',
    'social media': 'Follow us on social media platforms to get the latest news, updates, and behind-the-scenes content.',
    'site navigation': 'Use the navigation menu to explore different sections of our website easily.',
    'search products': 'Use the search bar to find specific products or categories quickly.',
    'account settings': 'Manage your account settings, preferences, and personal information in the "Account Settings" section.',
    'order history': 'View your past orders, track shipments, and manage returns in the "Order History" section.',
    'payment methods': 'Add, edit, or remove payment methods for faster and secure checkout.',
    'security measures': 'Learn about the security measures we implement to protect your data and transactions.',
    'site accessibility': 'We strive to make our website accessible to all users. Contact us if you encounter any accessibility issues.',
    'customer feedback': 'We value your feedback! Share your suggestions, compliments, or concerns with us through our feedback form.',
    'product availability': 'Check the availability status of a product before placing an order to ensure timely delivery.',
    'product specifications': 'Find detailed specifications and technical information about a product on its product page.',
    'product reviews': 'Read reviews and ratings from other customers to learn more about the quality and performance of a product.',
    'product images': 'View high-quality images of a product from different angles to get a better understanding of its appearance.',
    'product videos': 'Watch product demonstration videos to see the product in action and understand its features.',
    'product price': 'Compare prices of similar products to find the best deal and value for your money.',
    'product warranty': 'Check the warranty information provided for each product to understand the coverage and terms.',
    'product ratings': 'Take into account the overall rating and customer reviews when making a purchasing decision.',
    'product availability': 'Check the availability status of a product before placing an order to ensure timely delivery.',
    'product description': 'Read the detailed product description to understand its features, benefits, and uses.',
    'product recommendations': 'Discover similar or related products based on your browsing history and preferences.',
    'product promotions': 'Take advantage of special promotions, discounts, or offers available for specific products.',
    'product customization': 'Some products may offer customization options such as color, size, or configuration.',
    'product bundling': 'Save money by purchasing products as part of a bundle or package deal.',
    'product comparison': 'Compare features, specifications, and prices of different products to make an informed decision.',
    'product availability': 'Check the availability status of a product before placing an order to ensure timely delivery.',
    'product delivery': 'Learn about the delivery options, shipping methods, and estimated delivery times for your orders.',
    'product returns': 'Familiarize yourself with our return policy and procedures in case you need to return or exchange a product.',
    'product recommendations': 'Receive personalized product recommendations based on your browsing history and purchase behavior.',
    'product notifications': 'Stay informed about product restocks, price drops, or new arrivals through notifications and alerts.',
    'product ratings and reviews': 'Read honest reviews and ratings from other customers to make informed purchasing decisions.',
    'product warranty': 'Check the warranty coverage and terms for each product to ensure peace of mind with your purchase.',

    'unrecognized': 'I apologize, but I didn\'t understand that. How can I assist you today?',

    
    
};

// Function to handle user input and generate responses
// function handleUserInput() {
//     const message = userInput.value.trim().toLowerCase();
//     // const response = responses[message] || "I'm sorry, I didn't understand that.";

    
//     // Display user message and bot response
//     // displayMessage('You', message);
//     displayUserMessage(message)
//     displayBotMessage( response);

//     // Clear input field
//     userInput.value = '';
// }

function handleUserInput() {
    const message = userInput.value.trim().toLowerCase();
    let response = responses[message];

    // Check if the user input closely matches any predefined responses
    if (!response) {
        // If not, check for similar responses
        const similarResponses = Object.keys(responses).filter(key => {
            return key.includes(message) || message.includes(key);
        });

        // If there are similar responses, pick the first one
        if (similarResponses.length > 0) {
            response = responses[similarResponses[0]];
        } else {
            // If no similar responses found, display an error message
            response = responses['unrecognized'];
        }
    }

    // Display user message and bot response
    displayUserMessage(message);
    displayBotMessage(response);

    // Clear input field
    userInput.value = '';
}






// Function to display messages in the chat
function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatDisplay.appendChild(messageElement);
}



// Event listener for sending messages
sendBtn.addEventListener('click', handleUserInput);

// Optionally, allow sending messages by pressing Enter
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleUserInput();
    }
});

let inputContainer=document.getElementById('input-container')
// Function to toggle chat container size and input visibility
function toggleChatSize() {
    // let chatDisplay=document.getElementById('chat-display')
    chatContainer.classList.toggle('chat-container-large');
    inputContainer.classList.toggle('hidden');
    chatDisplay.classList.toggle('hidden');
}

// Event listener to expand/collapse chat container
chatHeader.addEventListener('click', toggleChatSize);
expandBtn.addEventListener('click', toggleChatSize);


// Function to display bot message
// Function to display bot message
function displayBotMessage(message) {
    const chatDisplay = document.getElementById('chat-display');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.classList.add('chat-message', 'chat-message-bot'); // Add bot message class
    chatDisplay.appendChild(messageDiv);
}

// Function to display user message
function displayUserMessage(message) {
    const chatDisplay = document.getElementById('chat-display');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.classList.add('chat-message', 'chat-message-user'); // Add user message class
    chatDisplay.appendChild(messageDiv);
}

// Example usage:
// displayBotMessage("Hello! I'm the chatbot.");
// displayUserMessage("Hi there! How can I help you?");

// To test further messages:
// displayBotMessage("This is another bot message.");
// displayUserMessage("Here's another user message.");

