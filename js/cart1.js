document.addEventListener("DOMContentLoaded", async () => {
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

    async function fetchCart() {
        try {
            const response = await fetch(`http://localhost:5000/cart/${user.id}`);
            if (!response.ok) throw new Error("Failed to fetch cart");
            const cart = await response.json();
            renderCart(cart);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }

    function renderCart(cart) {
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

            decreaseBtn.onclick = () => updateQuantity(item.product_id, item.quantity - 1);
            increaseBtn.onclick = () => updateQuantity(item.product_id, item.quantity + 1);
            deleteBtn.onclick = () => deleteItem(item.product_id);

            cartItemsContainer.appendChild(template);
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    async function updateQuantity(productId, newQuantity) {
        try {
            await fetch(`http://localhost:5000/cart/${user.id}/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: newQuantity })
            });
            fetchCart();
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    }

    async function deleteItem(productId) {
        try {
            await fetch(`http://localhost:5000/cart/${user.id}/${productId}`, { method: 'DELETE' });
            fetchCart();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }

    fetchCart();
});
