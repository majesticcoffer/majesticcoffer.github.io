/* ==========================================
   MAJESTIC COFFER — product.js
========================================== */

"use strict";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const product = products.find(p => p.id === id);
const container = document.getElementById("product-details");

if (!container) {
    console.error("Product container not found.");
} else if (!product) {
    container.innerHTML = `
        <div class="empty-cart">
            <h2>Product Not Found</h2>
            <p>This product may have been removed.</p>
            <br>
            <a href="index.html" class="back-btn">← Back to Home</a>
        </div>
    `;
} else {
    let stars = "";
    for (let i = 1; i <= 5; i++) stars += i <= product.rating ? "★" : "☆";

    container.innerHTML = `
    <div class="product-container">
        <div class="product-image">
            <div class="frame">
                <img src="${product.image}" alt="${product.name}">
            </div>
        </div>

        <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h1>${product.name}</h1>
            <div class="product-rating">${stars} <span>(${product.rating}.0)</span></div>
            <div class="product-price">${product.price}</div>
            <p class="product-description">${product.description}</p>
            <p class="stock">${product.stock ? "🟢 In Stock" : "🔴 Out of Stock"}</p>
            <p class="delivery">🚚 Delivery: ${product.delivery}</p>

            <div class="qty-box">
                <button id="minus">−</button>
                <span id="qty">1</span>
                <button id="plus">+</button>
            </div>

            <div class="product-buttons">
                <button id="addCart" class="btn">
                    <i class="fa-solid fa-cart-shopping"></i> Add to Cart
                </button>
                <button id="buyNow" class="btn-outline">⚡ Buy Now</button>
                <button onclick="addToWishlist(${product.id})" class="btn-outline">❤️ Wishlist</button>
                <a href="index.html#products" class="back-btn">← Back</a>
            </div>
        </div>
    </div>
    `;

    let quantity = 1;
    const qty = document.getElementById("qty");

    document.getElementById("plus").addEventListener("click", () => {
        quantity++;
        qty.textContent = quantity;
    });

    document.getElementById("minus").addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            qty.textContent = quantity;
        }
    });

    document.getElementById("addCart").addEventListener("click", () => {
        for (let i = 0; i < quantity; i++) addToCart(product.id);
    });

    document.getElementById("buyNow").addEventListener("click", () => {
        for (let i = 0; i < quantity; i++) addToCart(product.id);
        window.location.href = "cart.html";
    });
}
