const order = JSON.parse(sessionStorage.getItem('confirmedFoodOrder'))
const restaurant = JSON.parse(order.restaurant);

console.log(order);
function renderFoodConfirmation(){
    

    if (!order){
        window.location.href = 'restaurants.html';
        return
    }


    const itemsHTML = order.items.map(item => `
        <div class="detail-row">
            <span class="detail-label">${item.quantity} x ${item.itemName}</span>
            <span class="detail-value">₹${item.itemPrice * item.quantity}</span>
        </div>
    `).join('');


    document.querySelector('.js-confirmation').innerHTML = `
        
        <div class="booking-info">
            <div class="success-icon">✓</div>
            <h1>Order Placed</h1>
            <p class="confirmation-subtitle">Your food is being prepared</p>
        </div>

        <div class="ticket-divider"></div>

        <div class="booking-details">

            <div class="detail-row">
                <span class="detail-label">Restaurant</span>
                <span class="detail-value">${restaurant.name}</span>
            </div>

            ${itemsHTML}

            <div class="detail-row">
                <span class="detail-label">Deliver to</span>
                <span class="detail-value">${order.deliveryName}</span>
            </div>

            <div class="detail-row">
                <span class="detail-label">Phone</span>
                <span class="detail-value">${order.deliveryPhone}</span>
            </div>

            <div class="detail-row">
                <span class="detail-label">Address</span>
                <span class="detail-value">${order.deliveryAddress}</span>
            </div>


            ${order.deliveryLandmark ? `
                    <div class="detail-row">
                        <span class="detail-label">Landmark</span>
                        <span class="detail-value">
                            ${order.deliveryLandmark}
                        </span>
                    </div>
                ` : ''
            }
            
            <div class="detail-row">
                <span class="detail-label">Amount Paid</span>
                <span class="detail-value">₹${order.total}</span>
            </div>
        </div>

        <div class="booking-id">
            <p>Order ID: ${order.orderId}</p>
        </div>

        <div class="delivery-eta">
            <i class="fa-solid fa-motorcycle"></i>
            <span>Estimated delivery: ${restaurant.deliveryTime || "30-45 minutes"}</span>
        </div>

        <button class="go-home-btn" onclick="window.location.href='../index.html'">
            Back to Home
        </button>
    `;
   
}

renderFoodConfirmation();