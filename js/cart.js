/* ==========================================
   MAJESTIC COFFER — cart.js
========================================== */

"use strict";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (typeof updateCartCount === "function") updateCartCount();
}

/* ---------- Add / Toggle Cart Item ---------- */
function addToCart(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        cart = cart.filter(item => item.id !== id);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    if (typeof renderProducts === "function") renderProducts();
    if (typeof renderCart === "function") renderCart();
}

/* ---------- Render Cart Page ---------- */
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    if (!cartItems || !totalPrice) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty</h2>
                <p>Browse our handcrafted collection and add something you love.</p>
            </div>
        `;
        totalPrice.textContent = "৳0";
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach(item => {
        const price = Number(item.price.replace(/[^\d]/g, ""));
        total += price * item.quantity;

        html += `
        <div class="cart-card">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
                <div class="qty-box">
                    <button onclick="changeQty(${item.id},-1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${item.id},1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeCart(${item.id})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        `;
    });

    cartItems.innerHTML = html;
    totalPrice.textContent = "৳" + total;
}
renderCart();

/* ---------- Change Quantity ---------- */
function changeQty(id, value) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity += value;
    if (item.quantity <= 0) cart = cart.filter(p => p.id !== id);

    saveCart();
    renderCart();
}

/* ---------- Remove ---------- */
function removeCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    if (typeof renderProducts === "function") renderProducts();
    renderCart();
}

/* ---------- Clear Cart ---------- */
const clearBtn = document.getElementById("clear-cart");
if (clearBtn) {
    clearBtn.onclick = () => {
        if (cart.length === 0) return;
        if (!confirm("Clear your entire cart?")) return;
        cart = [];
        saveCart();
        renderCart();
    };
}

/* ---------- WhatsApp Order ---------- */
function orderWhatsApp() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    if (!name || !phone || !address) {
        alert("Please fill in your name, phone and address so we can deliver your order.");
        return;
    }

    let message = "🛍️ New Order — Majestic Coffer\n\n";
    message += "👤 Customer Information\n";
    message += "Name: " + name + "\n";
    message += "Phone: " + phone + "\n";
    message += "Address: " + address + "\n\n";
    message += "🛒 Ordered Products\n\n";

    let total = 0;

    cart.forEach((item, index) => {
        const price = Number(item.price.replace(/[^\d]/g, ""));
        total += price * item.quantity;

        message += `${index + 1}. ${item.name}\n`;
        message += `   Price: ${item.price}  x${item.quantity}\n\n`;
    });

    message += "━━━━━━━━━━━━━━━━━━━━\n";
    message += "💰 Total: ৳" + total + "\n\n";
    message += "📌 Please confirm my order.\n";
    message += "Thank you — Majestic Coffer ❤️";

    const whatsappNumber = "8801345030520";

    window.open("https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message), "_blank");
}

const orderBtn = document.getElementById("order-btn");
if (orderBtn) orderBtn.onclick = orderWhatsApp;
