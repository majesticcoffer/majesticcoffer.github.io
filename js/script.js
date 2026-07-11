/* ==========================================
   MAJESTIC COFFER — script.js
========================================== */

"use strict";

/* ---------- LOADER ---------- */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 500);
    }
});

/* ---------- CART COUNT ---------- */
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const badge = document.getElementById("cart-count");
    if (!badge) return;

    let total = 0;
    cart.forEach(item => { total += Number(item.quantity || 1); });
    badge.textContent = total;
}
updateCartCount();

/* ---------- SEARCH ---------- */
const search = document.getElementById("search-input");
if (search) {
    search.addEventListener("keyup", () => {
        const value = search.value.toLowerCase();
        document.querySelectorAll(".product-card").forEach(card => {
            const name = card.querySelector("h3").innerText.toLowerCase();
            card.style.display = name.includes(value) ? "" : "none";
        });
    });
}

/* ---------- HEADER SHADOW ON SCROLL ---------- */
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) header.classList.toggle("sticky", window.scrollY > 30);
});

/* ---------- BACK TO TOP ---------- */
const topBtn = document.createElement("button");
topBtn.id = "topBtn";
topBtn.innerHTML = "↑";
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 400 ? "flex" : "none";
});
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

/* ==========================================
   DYNAMIC PRODUCT GRID (home page)
========================================== */
const productsContainer = document.getElementById("productsContainer");

function renderProducts() {
    if (!productsContainer) return;

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let html = "";

    products.forEach(product => {
        const inCart = cart.some(item => item.id === product.id);
        const inWishlist = wishlist.some(item => item.id === product.id);

        html += `
        <div class="product-card">
            <span class="badge">${product.badge}</span>

            <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
            </a>

            <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
            <p class="cat">${product.category}</p>
            <p class="price">${product.price}</p>

            <div class="product-buttons">
                <button class="cart-btn ${inCart ? 'added' : ''}" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-cart-shopping"></i>
                    ${inCart ? 'Added' : 'Add to Cart'}
                </button>

                <button class="wish-btn ${inWishlist ? 'active' : ''}" onclick="addToWishlist(${product.id})">
                    <i class="${inWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                </button>
            </div>
        </div>
        `;
    });

    productsContainer.innerHTML = html;
}
renderProducts();

console.log("Majestic Coffer — site ready");
