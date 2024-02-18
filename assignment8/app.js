let iconcart = document.querySelector('.iconcart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconcart.addEventListener('click', () => {
    if (cart.style.right == '-100%') {
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    } else {
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})

close.addEventListener('click', () => {
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0px)';
})


let products = null;

async function addProduct() {
    const productFromJSON = await fetch('product.json');
    const dataReceived = await productFromJSON.json();

    products = dataReceived;
    addDataToHTML();
}

addProduct(); //calling async function

function addDataToHTML() {
    let listProductHTML = document.querySelector('.listProduct')
    listProductHTML.innerHTML = '';

    if (products != null) {
        products.forEach(product => {
            if (product) {
                let newProduct = document.createElement('div');
                newProduct.classList.add('item');
                newProduct.innerHTML =
                    `
                <img src=${product.image}>
                <h2>${product.name}</h2>
                <div class="price">${product.price}</div>
                <button onclick="addCart(${product.id})">Add To Cart</button>
                `;

                listProductHTML.appendChild(newProduct);
            }

        })
    }
}

let listCart = []

function checkCart() {
    var cookieValue = document.cookie
        .split(';')
        .find(row => row.startsWith("listCart="));

    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split("=")[1]);
    }
}

checkCart()

function addCart(productId) {
    //deep copy
    let productCopy = JSON.parse(JSON.stringify(products));

    //if there is no product in the cart
    //this array is treated like the object where each data can be retrieved by using the key
    if (!listCart[productId]) {
        let dataProduct = productCopy.filter(
                product => product.id == productId
            )[0]
            //add data product in cart
        listCart[productId] = dataProduct;
        listCart[productId].quantity = 1;
    } else {
        listCart[productId].quantity++;
    }
    let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
    document.cookie = "listCart=" + JSON.stringify(listCart) + ";" + timeSave + ";path=/;"
    addCartToHTML();
}

addCartToHTML();


function addCartToHTML() {
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    if (listCart) {
        listCart.forEach(product => {

            if (product) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML =
                    `  
                <img src=${product.image}>
                <div class="content">
                    <div class="name">
                        ${product.name}
                    </div>
                    <div class="price">
                        ${product.price}/1 product
                    </div>
                </div>
                <div class="quantity">
                    <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    <span class="value">${product.quantity}</span>
                    <button onclick="changeQuantity(${product.id}, '-')">-</button>
                </div>
            `;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }

        });
    }

    totalHTML.innerText = totalQuantity;
}

function changeQuantity(productId, type) {
    switch (type) {
        case '-':
            listCart[productId].quantity--;
            if (listCart[productId].quantity <= 0) {
                delete listCart[productId];
            }
            break;
        case '+':
            listCart[productId].quantity++;

            break;

        default:
            break;
    }

    let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
    document.cookie = "listCart=" + JSON.stringify(listCart) + ";" + timeSave + ";path=/;"
    addCartToHTML(); //need to reload for instant functioning
}