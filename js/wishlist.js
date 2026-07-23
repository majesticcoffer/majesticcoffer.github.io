/* ==========================================
   MAJESTIC COFFER — wishlist.js
========================================== */

"use strict";

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

/* ---------- Add / Toggle Wishlist Item ---------- */
function addToWishlist(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    const index = wishlist.findIndex(item => item.id === id);

    if (index >= 0) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
    }

    saveWishlist();
    if (typeof renderProducts === "function") renderProducts();
    renderWishlist();
}

/* ---------- Render Wishlist Page ---------- */
function renderWishlist() {
    const wishlistItems = document.getElementById("wishlist-items");
    if (!wishlistItems) return;

    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your Wishlist is Empty</h2>
                <p>Tap the heart on any product to save it here.</p>
            </div>
        `;
        return;
    }

    let html = "";

    wishlist.forEach(item => {
        html += `
        <div class="cart-card">
            <img src="${item.image}" alt="${item.name}" width="600" height="600">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
            </div>
            <button class="btn-outline" style="padding:10px 16px;" onclick="moveToCart(${item.id})">
                Move to Cart
            </button>
            <button class="remove-btn" onclick="removeWishlist(${item.id})" aria-label="Remove ${item.name} from wishlist">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        `;
    });

    wishlistItems.innerHTML = html;
}

/* ---------- Remove ---------- */
function removeWishlist(id) {
    wishlist = wishlist.filter(item => item.id !== id);
    saveWishlist();
    renderWishlist();
}

/* ---------- Move To Cart ---------- */
function moveToCart(id) {
    addToCart(id);
    removeWishlist(id);
}

renderWishlist();
