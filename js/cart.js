document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
        alert("You have not login yet!");
        window.location.href = "login.html";
        return;
    }

    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItemsContainer || !cartTotal) {
        console.error("Không tìm thấy cart-items-container hoặc cart-total trong HTML!");
        return;
    }

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            cartTotal.textContent = "$0.00";
            return;
        }

        cart.forEach(item => {
            const template = document.getElementById('cart-item-template').content.cloneNode(true);
            const price = parseFloat(item.price);

            template.querySelector('.cart-item-image').src = `http://localhost:5000/${item.image.startsWith('images/') ? item.image : 'images/' + item.image}`;
            template.querySelector('.cart-item-title').textContent = item.name;
            template.querySelector('.cart-item-quantity').textContent = item.quantity;
            template.querySelector('.cart-item-price').textContent = `$${(price * item.quantity).toFixed(2)}`;

            total += price * item.quantity;

            const decreaseBtn = template.querySelector('.decrease-btn');
            const increaseBtn = template.querySelector('.increase-btn');
            const deleteBtn = template.querySelector('.delete-btn');

            decreaseBtn.onclick = () => updateQuantity(item.id, item.quantity - 1);
            increaseBtn.onclick = () => updateQuantity(item.id, item.quantity + 1);
            deleteBtn.onclick = () => deleteItem(item.id);

            cartItemsContainer.appendChild(template);
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    function updateQuantity(productId, newQuantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === productId);

        if (itemIndex > -1) {
            if (newQuantity <= 0) {
                cart.splice(itemIndex, 1);
            } else {
                cart[itemIndex].quantity = newQuantity;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }

    function deleteItem(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    renderCart();
});
