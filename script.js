// Function to handle adding products to the cart
function addToCart(productName, price, imagePath) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const imageName = imagePath ? imagePath.split('/').pop() : 'image-not-available';
    const existingItemIndex = cartItems.findIndex(item => (
        item.productName === productName
        && Number(item.price) === Number(price)
        && item.imagePath === imagePath
    ));

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity = Number(cartItems[existingItemIndex].quantity || 1) + 1;
    } else {
        cartItems.push({
            productName,
            price,
            imagePath,
            imageName,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert('Product added to cart!');
}

// Event listener for the "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        const card = this.closest('.pro');
        const imageElement = card ? card.querySelector('img') : null;
        const imagePath = imageElement ? imageElement.getAttribute('src') : '';
        const imageName = imagePath ? imagePath.split('/').pop() : '';

        const dataProductName = this.getAttribute('data-product');
        const derivedName = imageName ? imageName.replace(/\.[^/.]+$/, '') : 'Product';
        const productName = dataProductName || derivedName;
        const price = parseFloat(this.getAttribute('data-price')) || 0;

        addToCart(productName, price, imagePath);
    });
});

// Function to display cart items on the cart page
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');

    if (!cartItemsContainer || !totalAmountElement) {
        return;
    }

    cartItemsContainer.innerHTML = '';

    let totalAmount = 0;

    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'cart-item';

        const thumb = document.createElement('img');
        thumb.className = 'cart-item-thumb';
        thumb.src = item.imagePath || 'img/product/p1.webp';
        thumb.alt = item.productName;

        const details = document.createElement('div');
        details.className = 'cart-item-details';

        const title = document.createElement('h4');
        title.className = 'cart-item-title';
        title.textContent = item.productName;

        const fileName = document.createElement('p');
        fileName.className = 'cart-item-image-name';
        fileName.textContent = `Image: ${item.imageName || 'Not available'}`;

        const price = document.createElement('p');
        price.className = 'cart-item-price';
        const quantity = Number(item.quantity || 1);
        const itemTotal = Number(item.price || 0) * quantity;
        price.textContent = `$${itemTotal.toFixed(2)}`;

        const actions = document.createElement('div');
        actions.className = 'cart-item-actions';

        const decrementButton = document.createElement('button');
        decrementButton.className = 'qty-btn';
        decrementButton.type = 'button';
        decrementButton.textContent = '-';
        decrementButton.setAttribute('data-action', 'decrement');
        decrementButton.setAttribute('data-index', index);

        const quantityText = document.createElement('span');
        quantityText.className = 'qty-count';
        quantityText.textContent = `Qty: ${quantity}`;

        const incrementButton = document.createElement('button');
        incrementButton.className = 'qty-btn';
        incrementButton.type = 'button';
        incrementButton.textContent = '+';
        incrementButton.setAttribute('data-action', 'increment');
        incrementButton.setAttribute('data-index', index);

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-item-btn';
        removeButton.type = 'button';
        removeButton.textContent = 'Remove';
        removeButton.setAttribute('data-action', 'remove');
        removeButton.setAttribute('data-index', index);

        actions.appendChild(decrementButton);
        actions.appendChild(quantityText);
        actions.appendChild(incrementButton);
        actions.appendChild(removeButton);

        details.appendChild(title);
        details.appendChild(fileName);
        details.appendChild(price);
        details.appendChild(actions);

        listItem.appendChild(thumb);
        listItem.appendChild(details);
        cartItemsContainer.appendChild(listItem);

        totalAmount += itemTotal;
    });

    if (cartItems.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'cart-empty-message';
        emptyMessage.textContent = 'Your cart is empty.';
        cartItemsContainer.appendChild(emptyMessage);
    }

    totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
}

function updateItemQuantity(index, action) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cartItems[index]) {
        return;
    }

    if (action === 'increment') {
        cartItems[index].quantity = Number(cartItems[index].quantity || 1) + 1;
    }

    if (action === 'decrement') {
        const currentQty = Number(cartItems[index].quantity || 1);
        if (currentQty <= 1) {
            cartItems.splice(index, 1);
        } else {
            cartItems[index].quantity = currentQty - 1;
        }
    }

    if (action === 'remove') {
        cartItems.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems();
}

// Function to handle the checkout process
function checkout() {
    localStorage.removeItem('cart');
    alert('Thank you for your purchase! Your cart has been cleared.');
    window.location.href = 'index.html';
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem('cart');
    displayCartItems();
}

window.addEventListener('load', () => {
    displayCartItems();

    const checkoutButton = document.getElementById('checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkout);
    }

    const clearCartButton = document.getElementById('clear-cart-button');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', event => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }

            const action = target.getAttribute('data-action');
            const index = Number(target.getAttribute('data-index'));

            if (!action || Number.isNaN(index)) {
                return;
            }

            updateItemQuantity(index, action);
        });
    }
});
