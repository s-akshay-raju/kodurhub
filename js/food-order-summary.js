const cart = JSON.parse(sessionStorage.getItem('cart'));

if (!cart){
    window.location.href = 'restaurants.html';
}
const restaurant = JSON.parse(cart.restaurant);

const deliveryCharge = 30;

console.log(cart.restaurant);

function renderRestaurantInfo(){
    document.querySelector('.restaurant-info-row').innerHTML = `
        <span class="restaurant-name-text">${restaurant.name}</span>
        <span class="delivery-time-badge">${restaurant.deliveryTime}</span>
    `;
}

function renderOrderItemsList(){
    let orderItemsListHTML = ``;


    cart.items.forEach((item) => {
        orderItemsListHTML += `
            <div class="order-item-row">

                <div class="item-meta">
                    <span class="item-qty">${item.quantity} x</span>
                    <span class="item-name">${item.itemName}</span>
                </div>

                <span class="item-subtotal">₹${item.itemPrice * item.quantity}</span>
            </div>
        `
    })


    document.querySelector('.order-items-list').innerHTML = orderItemsListHTML;
}


function renderOrderTotal(){
    document.querySelector('.order-total-row').innerHTML = `
        <span>Items Total</span>
        <span>₹${cart.total}</span>
    `;

    document.querySelector('.order-delivery-charge-row').innerHTML = `
        <span>Delivery Charge</span>
        <span>₹${deliveryCharge}</span>
    `;

    document.querySelector('.grand-total-row').innerHTML = `
        <span>Total</span>
        <span>₹${cart.total + deliveryCharge}</span>
    `;

    document.querySelector('.place-order-btn').textContent = `Place Order — ₹${cart.total + deliveryCharge}`;
}

renderRestaurantInfo();
renderOrderItemsList();
renderOrderTotal();




document.querySelector('.place-order-btn').addEventListener('click', () => {
    const name = document.querySelector('#delivery-name').value
    const phone = document.querySelector('#delivery-phone').value
    const address = document.querySelector('#delivery-address').value
    const landmark = document.querySelector('#delivery-landmark').value

    if (!name || !phone || !address){
        alert('Please fill in all delivery details')
        return
    }

    sessionStorage.setItem('confirmedFoodOrder',JSON.stringify(
        {
            ...cart,
            total: cart.total + deliveryCharge,
            deliveryName: name,
            deliveryPhone: phone,
            deliveryAddress: address,
            deliveryLandmark: landmark, 
            orderId: 'KH' + Date.now().toString().slice(-8)
        }
    ))

    sessionStorage.removeItem('cart')
    window.location.href = '../html/food-payment.html';
})