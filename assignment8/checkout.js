let listCart = [];

function checkCart() {
    var cookieValue = document.cookie
        .split(';')
        .find(row => row.startsWith("listCart="));

    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split("=")[1]);
    }
}

checkCart();
addCartToHTML();

function addCartToHTML() {
    // Clear data from HTML
    let listCartHTML = document.querySelector(".returnCart .list");
    listCartHTML.innerHTML = "";
    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');

    let totalQuantity = 0;
    let totalPrice = 0;

    if (listCart) {
        listCart.forEach(product => {

            if (product) {
                let newProduct = document.createElement('div');
                newProduct.classList.add('item');
                newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <div class="info">
                    <div class="name">${product.name}</div>
                    <div class="price">$${product.price}</div>
                </div>
                <div class="quantity">${product.quantity}</div>
                <div class="returnPrice">${product.price * product.quantity}</div>

                `;
                listCartHTML.appendChild(newProduct);
                totalQuantity += product.quantity;
                totalPrice += product.quantity * product.price
            }

        })
    }

    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}