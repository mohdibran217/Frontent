
const searchInput = document.querySelector(".text");
const addButtons = document.querySelectorAll(".add");
const cartButton = document.querySelector(".cart");
const products = document.querySelectorAll(".box");




addButtons.forEach((button, index) => {

    button.addEventListener("click", function () {

        const box = products[index];

        const name = box.querySelector("h3").textContent;
        const price = box.querySelector(".Newrupees").textContent;
        const image = box.querySelector(".photo").src;

        const numericPrice = Number(price.replace(/[^\d]/g, ""));

        
        const existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: numericPrice,
                image: image,
                quantity: 1
            });

        }

        updateCart();

        button.textContent = "ADDED";

        setTimeout(() => {
            button.textContent = "ADD";
        }, 700);

    });

});

searchInput.addEventListener("input", function () {

    const searchValue = searchInput.value.toLowerCase();

    products.forEach(box => {

        const name = box.querySelector("h3").textContent.toLowerCase();

        if (name.includes(searchValue)) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }

    });

});


function updateCart() {

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartButton.textContent = `🛒 My Cart (${totalQuantity})`;

}


cartButton.addEventListener("click", function () {

    showCart();

});


function showCart() {
    
    const oldCart = document.querySelector(".cart-window");

    if (oldCart) {
        oldCart.remove();
    }

    const cartWindow = document.createElement("div");

    cartWindow.className = "cart-window";

    cartWindow.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        width: 90%;
        max-width: 450px;
        max-height: 80vh;
        overflow-y: auto;
        padding: 25px;
        border-radius: 15px;
        box-shadow: 0 0 0 100vw rgba(0,0,0,0.5);
        z-index: 1000;
    `;

    let cartHTML = `
        <h2 style="margin-bottom:20px">My Shopping Cart</h2>
    `;

    if (cart.length === 0) {

        cartHTML += `<p style="color:black">Your cart is empty!</p>`;

    } else {

        cart.forEach((item, index) => {

            cartHTML += `
                <div style="
                    display:flex;
                    align-items:center;
                    gap:10px;
                    margin-bottom:15px;
                    border-bottom:1px solid #ddd;
                    padding-bottom:10px;
                ">

                    <img src="${item.image}"
                        style="width:60px;height:60px;object-fit:cover">

                    <div style="flex:1;color:black">
                        <h4>${escapeHTML(item.name)}</h4>
                        <p style="color:black;background:white;border:none;padding:5px">
                            ₹${item.price} × ${item.quantity}
                        </p>
                    </div>

                    <button onclick="removeItem(${index})"
                        style="padding:8px;background:red;color:white">
                        Remove
                    </button>

                </div>
            `;

        });

        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        cartHTML += `
            <h3 style="margin-top:20px">Total: ₹${total}</h3>
        `;

    }

    cartHTML += `
        <button onclick="closeCart()"
            style="margin-top:20px;padding:12px;background:green;color:white">
            Close Cart
        </button>
    `;

    cartWindow.innerHTML = cartHTML;

    document.body.appendChild(cartWindow);

}

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

    showCart();

}


function closeCart() {

    const cartWindow = document.querySelector(".cart-window");

    if (cartWindow) {
        cartWindow.remove();
    }

}


function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function (char) {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];

    });

}