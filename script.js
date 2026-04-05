// Function to handle adding products to the cart
function addToCart(productName, price) {
    // Retrieve existing cart items from local storage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new item to the cart
    cartItems.push({ productName, price });

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Alert the user that the product has been added to the cart (you can replace this with any other user feedback)
    alert('Product added to cart!');
}

// Event listener for the "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(event) {
        // Prevent default behavior (e.g., following the link)
        event.preventDefault();

        // Retrieve product name and price from the button's data attributes
        const productName = this.getAttribute('data-product');
        const price = parseFloat(this.getAttribute('data-price'));
        
        // Call the addToCart function with the product details
        addToCart(productName, price);
    });
});

// Function to display cart items on the cart page
function displayCartItems() {
    // Retrieve cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Select the cart items container
    const cartItemsContainer = document.getElementById('cart-items');

    // Clear previous contents
    cartItemsContainer.innerHTML = '';

    // Initialize total amount
    let totalAmount = 0;

    // Iterate over each cart item and display it
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.productName} - $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(listItem);

        // Update total amount
        totalAmount += item.price;
    });

    // Update total amount on the page
    const totalAmountElement = document.getElementById('total-amount');
    totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
}

// Call the displayCartItems function when the page loads
window.addEventListener('load', displayCartItems);

// Function to handle the checkout process
function checkout() {
    // Clear the cart (remove all items from local storage)
    localStorage.removeItem('cart');
    // Show a confirmation message
    alert('Thank you for your purchase! Your cart has been cleared.');
    // Redirect to the home page or any other desired page after checkout
    window.location.href = 'index.html'; // Change 'index.html' to the desired page
}

// Add event listener to the checkout button
const checkoutButton = document.getElementById('checkout-button');
if (checkoutButton) {
    checkoutButton.addEventListener('click', checkout);
}

// Function to clear the cart
function clearCart() {
    // Clear the cart (remove all items from local storage)
    localStorage.removeItem('cart');
    // Update the displayed cart items
    displayCartItems();
}

// Add event listener to the clear cart button
const clearCartButton = document.getElementById('clear-cart-button');
if (clearCartButton) {
    clearCartButton.addEventListener('click', clearCart);
}
