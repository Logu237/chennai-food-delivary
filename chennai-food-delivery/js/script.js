```javascript
/* =====================================
   CART DATA
===================================== */

let cart = [];


/* =====================================
   FOOD DATA
===================================== */

const foodItems = [

    {
        name: "Chicken Biryani",
        price: 220,
        emoji: "🍛"
    },

    {
        name: "Mutton Biryani",
        price: 280,
        emoji: "🍲"
    },

    {
        name: "Masala Dosa",
        price: 90,
        emoji: "🥞"
    },

    {
        name: "Idli Sambar",
        price: 70,
        emoji: "🥣"
    },

    {
        name: "Paneer Pizza",
        price: 260,
        emoji: "🍕"
    },

    {
        name: "Chicken Burger",
        price: 190,
        emoji: "🍔"
    },

    {
        name: "Chicken Noodles",
        price: 180,
        emoji: "🍜"
    },

    {
        name: "Chocolate Cake",
        price: 150,
        emoji: "🍰"
    }

];


/* =====================================
   MOBILE MENU
===================================== */

function toggleMobileMenu() {

    const menu = document.getElementById("mobileMenu");

    if (menu.style.display === "block") {

        menu.style.display = "none";

    } else {

        menu.style.display = "block";

    }

}


/* =====================================
   CATEGORY FILTER
===================================== */

function filterCategory(category) {

    const cards =
        document.querySelectorAll(".restaurant-card");

    const categories =
        document.querySelectorAll(".category");

    categories.forEach(item => {

        item.classList.remove("active");

    });

    event.currentTarget.classList.add("active");


    cards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* =====================================
   SEARCH
===================================== */

function searchFood() {

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const cards =
        document.querySelectorAll(".restaurant-card");

    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        if (text.includes(search)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* =====================================
   CATEGORY SCROLL
===================================== */

function scrollCategories(direction) {

    const container =
        document.getElementById("categoryContainer");

    container.scrollBy({
        left: direction * 250,
        behavior: "smooth"
    });

}


/* =====================================
   FAVOURITE
===================================== */

function toggleFavorite(button) {

    button.classList.toggle("liked");

    const icon =
        button.querySelector("i");

    if (button.classList.contains("liked")) {

        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");

        showToast("Added to favourites ❤️");

    } else {

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");

        showToast("Removed from favourites");

    }

}


/* =====================================
   MENU
===================================== */

function viewMenu(restaurantName) {

    document.getElementById(
        "menuRestaurantName"
    ).textContent = restaurantName;

    const menu =
        document.getElementById("foodMenu");

    menu.innerHTML = "";

    foodItems.forEach(food => {

        const item = document.createElement("div");

        item.className = "food-item";

        item.innerHTML = `

            <div class="food-image">
                ${food.emoji}
            </div>

            <div class="food-details">

                <h4>
                    ${food.name}
                </h4>

                <p>
                    Freshly prepared and delicious
                </p>

                <div class="food-price">
                    ₹${food.price}
                </div>

            </div>

            <button
                class="add-food-btn"
                onclick="addToCart(
                    '${food.name}',
                    ${food.price},
                    '${food.emoji}'
                )">

                ADD

            </button>

        `;

        menu.appendChild(item);

    });

    document
        .getElementById("menuModal")
        .classList.add("active");

}


/* =====================================
   CLOSE MENU
===================================== */

function closeMenu() {

    document
        .getElementById("menuModal")
        .classList.remove("active");

}


/* =====================================
   ADD TO CART
===================================== */

function addToCart(name, price, emoji) {

    const existingItem =
        cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            name: name,
            price: price,
            emoji: emoji,
            quantity: 1

        });

    }

    updateCart();

    showToast(`${name} added to cart 🛒`);

}


/* =====================================
   REMOVE FROM CART
===================================== */

function decreaseQuantity(name) {

    const item =
        cart.find(item => item.name === name);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                cartItem =>
                    cartItem.name !== name
            );

    }

    updateCart();

}


/* =====================================
   INCREASE QUANTITY
===================================== */

function increaseQuantity(name) {

    const item =
        cart.find(item => item.name === name);

    if (item) {

        item.quantity++;

    }

    updateCart();

}


/* =====================================
   UPDATE CART
===================================== */

function updateCart() {

    const cartContainer =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const subtotalElement =
        document.getElementById("subtotal");

    const deliveryElement =
        document.getElementById("deliveryFee");

    const taxElement =
        document.getElementById("tax");

    const totalElement =
        document.getElementById("total");


    let itemCount = 0;
    let subtotal = 0;


    cart.forEach(item => {

        itemCount += item.quantity;

        subtotal +=
            item.price * item.quantity;

    });


    cartCount.textContent = itemCount;

    subtotalElement.textContent =
        `₹${subtotal}`;


    let deliveryFee = subtotal > 499 ? 0 : 40;

    deliveryElement.textContent =
        deliveryFee === 0
            ? "FREE"
            : `₹${deliveryFee}`;


    const tax =
        Math.round(subtotal * 0.05);

    taxElement.textContent =
        `₹${tax}`;


    const total =
        subtotal + deliveryFee + tax;

    totalElement.textContent =
        `₹${total}`;


    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some delicious food
                    to get started.
                </p>

            </div>

        `;

        return;

    }


    cartContainer.innerHTML = "";


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div class="cart-item-image">
                ${item.emoji}
            </div>

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price * item.quantity}
                </p>

                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(
                            '${item.name}'
                        )">
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(
                            '${item.name}'
                        )">
                        +
                    </button>

                </div>

            </div>

        `;

        cartContainer.appendChild(cartItem);

    });

}


/* =====================================
   OPEN CART
===================================== */

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("active");

    document
        .getElementById("overlay")
        .classList.add("active");

}


/* =====================================
   CLOSE CART
===================================== */

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("active");

    document
        .getElementById("overlay")
        .classList.remove("active");

}


/* =====================================
   CHECKOUT
===================================== */

function openCheckout() {

    if (cart.length === 0) {

        showToast("Your cart is empty!");

        return;

    }

    closeCart();

    document
        .getElementById("checkoutModal")
        .classList.add("active");

}


function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("active");

}


/* =====================================
   PLACE ORDER
===================================== */

function placeOrder(event) {

    event.preventDefault();

    const name =
        document.getElementById("customerName").value;

    closeCheckout();

    cart = [];

    updateCart();

    showToast(
        `Thank you ${name}! Your order has been placed 🎉`
    );

}


/* =====================================
   LOGIN
===================================== */

function openLogin() {

    document
        .getElementById("loginModal")
        .classList.add("active");

}


function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.remove("active");

}


function loginUser() {

    closeLogin();

    showToast(
        "OTP sent to your mobile number 📱"
    );

}


/* =====================================
   COUPON
===================================== */

function copyCoupon() {

    navigator.clipboard
        .writeText("CHENNAI150")
        .then(() => {

            showToast(
                "Coupon CHENNAI150 copied!"
            );

        });

}


/* =====================================
   VIEW ALL
===================================== */

function showAllRestaurants() {

    const cards =
        document.querySelectorAll(".restaurant-card");

    cards.forEach(card => {

        card.style.display = "block";

    });

    window.location.hash = "restaurants";

}


/* =====================================
   TOAST
===================================== */

let toastTimer;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =====================================
   CLOSE MODALS ON OUTSIDE CLICK
===================================== */

window.addEventListener("click", function(event) {

    const menuModal =
        document.getElementById("menuModal");

    const checkoutModal =
        document.getElementById("checkoutModal");

    const loginModal =
        document.getElementById("loginModal");


    if (event.target === menuModal) {

        closeMenu();

    }

    if (event.target === checkoutModal) {

        closeCheckout();

    }

    if (event.target === loginModal) {

        closeLogin();

    }

});


/* =====================================
   INITIAL CART
===================================== */

updateCart();
```
