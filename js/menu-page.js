import {restaurants} from '../js/restaurants.js';


const url = new URL(decodeURIComponent(window.location.href));

const restaurantId = url.searchParams.get('restaurantId');

const restaurant = restaurants.find((restaurant) => {
    return restaurant.id === Number(restaurantId);
});

console.log(restaurant);


function renderRestaurantMenu(){
    let menuHTML = ``;

    restaurant.menu.forEach((menuSection) => {

        let itemsHTML = ``;

        menuHTML += `<h2 class="menu-category"></h2>`;

        menuSection.items.forEach((item) => {

            const vegIcon = item.isVeg ? '🟢' : '🔴';
            const itemImage = item.image ? `<img class="item-image" src="${item.image}" alt="${item.name}">` : '';
             
            itemsHTML += `
        
                <div class="menu-item-card" data-id="${item.id}">
                    <div class="item-left">
                        <span class="veg-indicator">${vegIcon}</span>
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-price">₹${item.price}</p>
                        <p class="item-description">${item.description}</p>
                    </div>
                    <div class="item-right">
                        ${itemImage}
                        <button class="add-btn js-add-to-cart-btn" 
                                data-id="${item.id}"
                                data-name="${item.name}"
                                data-price="${item.price}"
                                data-image="${item.image}">
                            ADD
                        </button>
                    </div>
                </div>
            `;
        });

        menuHTML += `
            <div class="menu-category-section">
                <h2 class="category-title">${menuSection.category}</h2>
                <div class="menu-items-list">
                    ${itemsHTML}
                </div>
            </div>
        `
    }); 
    
    document.querySelector('.menu-wrapper').innerHTML = menuHTML;
    addCartListeners();
}

renderRestaurantMenu();


function renderRestaurantHeader(){
    
    let restaurantHeaderHTML = `
        <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-cover-image">
        <div class="restaurant-header-info">
            <h1 class="restaurant-name">${restaurant.name}</h1>
            <p class="restaurant-cuisine">${restaurant.cuisine}</p>
            <div class="restaurant-meta">
                <span class="rating">${restaurant.rating}</span>
                <span class="dot">•</span>
                <span class="delivery-time">${restaurant.deliveryTime}</span>
            </div>
            <p class="min-order">Min order: ₹${restaurant.minOrder}</p>
        </div>
    `;


    document.querySelector('.restaurant-header').innerHTML = restaurantHeaderHTML;
}

renderRestaurantHeader();


let cart = [];
let cartTotal = 0;


function addCartListeners(){
    document.querySelectorAll('.js-add-to-cart-btn').forEach((button) => {

        const itemId = button.dataset.id;
        const itemName = button.dataset.name;
        const itemPrice = button.dataset.price;
        const itemImage = button.dataset.image;

        button.addEventListener('click',() => {
            
            let itemInCart = cart.find((cartItem) => {
                return cartItem.itemId === itemId;
            })
            

            if (!itemInCart){
                cart.push({
                    itemId : itemId,
                    itemName : itemName,
                    itemPrice : Number(itemPrice),
                    itemImage : itemImage,
                    quantity : 1
                })
                button.classList.add('added');
                button.textContent = 'ADD AGAIN';
            }

            else{
                itemInCart.quantity += 1;
                
            }


            cartTotal += Number(itemPrice);

            document.querySelector('.cart-bar').classList.add('visible');

            let cartLength = 0;
            cart.forEach((cartItem) => {
                cartLength += cartItem.quantity;
            })

            updateCartBar(cartLength,cartTotal);
        })
    })
}


function updateCartBar(cartLength,cartTotal){

    document.querySelector('.cart-count').innerHTML = `${cartLength} item${cartLength > 1 ? 's' : ''}`

    document.querySelector('.cart-total').innerHTML = `₹${cartTotal}`
}


document.querySelector('.view-cart-btn').addEventListener('click',() => {
    openCartPanel();
})

function openCartPanel(){

    document.querySelector('.cart-overlay').classList.add('visible');
    document.querySelector('.cart-panel').classList.add('open');
    
    document.querySelector('.js-cart-restaurant-name').textContent = restaurant.name;

    renderCartItems();

    document.querySelector('.js-cart-footer-total').textContent = `₹${cartTotal}`


}

function renderCartItems(){
    let cartItemsHTML = ``; 

    cart.forEach((item) => {
        cartItemsHTML += `
            <div class="cart-item-row" data-name="${item.itemName}">
                <img src="${item.itemImage}" alt="" class="cart-item-image">
                <span class="cart-item-name">${item.itemName}</span>
                <div class="cart-item-qty-controls">
                    <button class="qty-btn js-qty-minus" data-item-name="${item.itemName}">−</button>
                    <span class="qty-count">${item.quantity}</span>
                    <button class="qty-btn js-qty-plus" data-item-name="${item.itemName}">+</button>
                </div>
                <span class="cart-item-price">₹${item.itemPrice * item.quantity}</span>
            </div>
        ` 
    });

    document.querySelector('.js-cart-items-list').innerHTML = cartItemsHTML;
    addQuantityListeners()
}


function addQuantityListeners(){
    document.querySelectorAll('.js-qty-minus').forEach((btn) => {
        btn.addEventListener('click', () => {
            const itemName = btn.dataset.itemName;

            const item = cart.find((item) => item.itemName === itemName)

            if (item.quantity > 1){
                item.quantity -= 1
                cartTotal -= item.itemPrice
            }

            else{
                cart = cart.filter(item => item.itemName !== itemName)
                cartTotal -= item.itemPrice

                document.querySelectorAll('.js-add-to-cart-btn').forEach((btn) => {
                    if (btn.dataset.name === itemName){
                        btn.classList.remove('added');
                        btn.textContent = "Add";
                    }
                })
            }

            const totalQty = cart.reduce((sum,item) => {
                return sum+item.quantity
            },0)
            updateCartBar(totalQty, cartTotal)


            if (cart.length === 0){
                closeCart();
                document.querySelector('.cart-bar').classList.remove('visible')
            }

            else{
                renderCartItems();
            }

            document.querySelector('.js-cart-footer-total').textContent = `₹${cartTotal}`

        })
    })


    document.querySelectorAll('.js-qty-plus').forEach((btn) => {
        btn.addEventListener('click',() => {
            const itemName = btn.dataset.itemName;

            const item = cart.find((item) => item.itemName === itemName)

            
            item.quantity += 1
    
            cartTotal += item.itemPrice

            const totalQty = cart.reduce((sum,item) => {
                return sum+item.quantity
            },0)
            updateCartBar(totalQty, cartTotal)
            
            renderCartItems()

            document.querySelector('.js-cart-footer-total').textContent = `₹${cartTotal}`
            
        })
    })
}




function closeCart(){
    document.querySelector('.cart-overlay').classList.remove('visible')
    document.querySelector('.cart-panel').classList.remove('open')
}

document.querySelector('.js-close-cart').addEventListener('click', closeCart)
document.querySelector('.cart-overlay').addEventListener('click', closeCart)



document.querySelector('.js-checkout-btn').addEventListener('click',() => {
    sessionStorage.setItem('cart',JSON.stringify({
        restaurant: JSON.stringify(restaurant),
        items: cart,
        total: cartTotal
    }))

    window.location.href = 'food-order-summary.html';
})