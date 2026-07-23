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
    let total = 0;
    cart.forEach(item => { total += Number(item.quantity || 1); });

    const badge = document.getElementById("cart-count");
    if (badge) badge.textContent = total;

    const bbBadge = document.getElementById("bb-cart-count");
    if (bbBadge) bbBadge.textContent = total;
}
updateCartCount();

/* ---------- TOAST ---------- */
let toastTimer;
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------- SEARCH ---------- */
const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("searchBar");
const searchClose = document.getElementById("search-close");
const search = document.getElementById("search-input");

if (searchBtn && searchBar) {
    searchBtn.onclick = () => {
        searchBar.classList.toggle("active");
        if (searchBar.classList.contains("active") && search) {
            setTimeout(() => search.focus(), 300);
        }
    };
}
if (searchClose && searchBar) {
    searchClose.onclick = () => searchBar.classList.remove("active");
}
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
topBtn.setAttribute("aria-label", "Back to top");
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
                <img src="${product.image}" alt="${product.name}" width="600" height="600" loading="lazy">
            </a>

            <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
            <p class="cat">${product.category}</p>
            <p class="price">${product.price}</p>

            <div class="product-buttons">
                <button class="order-now-btn" onclick="orderNow(${product.id})">
                    <i class="fa-brands fa-whatsapp"></i> Order Now
                </button>
                <div class="product-buttons-row">
                    <button class="cart-btn ${inCart ? 'added' : ''}" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-shopping"></i>
                        ${inCart ? 'Added' : 'Add to Cart'}
                    </button>

                    <button class="wish-btn ${inWishlist ? 'active' : ''}" onclick="addToWishlist(${product.id})" aria-label="${inWishlist ? 'Remove' : 'Add'} ${product.name} ${inWishlist ? 'from' : 'to'} wishlist">
                        <i class="${inWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
    });

    productsContainer.innerHTML = html;
}
renderProducts();

/* ---------- CATEGORY FILTER ---------- */
const categoryCards = document.querySelectorAll(".category-card");
categoryCards.forEach(card => {
    card.addEventListener("click", () => {
        const categoryName = card.querySelector("h3").innerText.trim();

        const alreadyActive = card.classList.contains("active");
        categoryCards.forEach(c => c.classList.remove("active"));

        document.querySelectorAll(".product-card").forEach(pCard => {
            const cat = pCard.querySelector(".cat")?.innerText.trim();
            if (alreadyActive) {
                pCard.style.display = "";
            } else {
                pCard.style.display = (cat === categoryName) ? "" : "none";
            }
        });

        if (!alreadyActive) card.classList.add("active");

        document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

console.log("Majestic Coffer — site ready");

/* ==========================================
   FEATURE INFO MODAL
========================================== */
const featureContent = {
    handcrafted: {
        icon: "fa-solid fa-hand-holding-heart",
        title: "Handcrafted",
        text: "Every piece is shaped on the wheel and carved by hand by artisans in Bangladesh. Because nothing is machine-made, small variations in texture and shape are normal — that's the mark of a real handmade piece, not a flaw."
    },
    clay: {
        icon: "fa-solid fa-gem",
        title: "Natural Clay",
        text: "We use genuine terracotta clay, not synthetic materials or mass-produced ceramic. The natural earthy color and texture you see is the real clay itself, fired the traditional way."
    },
    packaging: {
        icon: "fa-solid fa-box-open",
        title: "Safe Packaging",
        text: "Clay is delicate, so every order is individually wrapped and cushioned before it goes in the box. We pack each order by hand to make sure it reaches you in one piece."
    },
    whatsapp: {
        icon: "fa-brands fa-whatsapp",
        title: "Order on WhatsApp",
        text: "No account, no signup. Add items to your cart, enter your name, phone and address, and tap 'Order on WhatsApp' — your order details are sent straight to us to confirm and arrange delivery."
    }
};

function openFeatureModal(key) {
    const data = featureContent[key];
    if (!data) return;

    document.getElementById("featureModalIcon").className = data.icon;
    document.getElementById("featureModalTitle").textContent = data.title;
    document.getElementById("featureModalText").textContent = data.text;
    document.getElementById("featureModal").classList.add("active");
}

function closeFeatureModal() {
    document.getElementById("featureModal")?.classList.remove("active");
}

document.getElementById("featureModal")?.addEventListener("click", (e) => {
    if (e.target.id === "featureModal") closeFeatureModal();
});
