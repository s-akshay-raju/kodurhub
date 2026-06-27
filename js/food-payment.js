const order = JSON.parse(sessionStorage.getItem('confirmedFoodOrder'));

const restaurant = JSON.parse(order.restaurant);

const deliveryCharge = 30;

document.querySelector('.pay-btn').innerHTML = `<i class="fa-solid fa-lock"></i> Pay ₹${order.total + deliveryCharge}`;




function renderFoodSummary(){


    const itemsHTML = order.items.map(item => `

        <div class="summary-row">
            <div class="item-meta">
                    <span class="item-qty">${item.quantity} x</span>
                    <span class="item-name">${item.itemName}</span>
                </div>

            <span class="detail-value">₹${item.itemPrice * item.quantity}</span></span>
        </div>

    `).join('');


    document.querySelector('.js-order-summary').innerHTML = `

        <div class="booking-details">

            <div class="summary-row restaurant-details">
                <span class="label">Restaurant</span>
                <span class="value">${restaurant.name}</span>
            </div>

            <div class="summary-row order-title">
                <span class="label">Your Order</span>
            </div>

            ${itemsHTML}


            <div class="bill-breakdown-section">
                <div class="summary-row items-total">
                    <span class="label">Order Total</span>
                    <span class="value">₹${order.total}</span>
                </div>

                <div class="summary-row delivery-charges">
                    <span class="label">Delivery Charges</span>
                    <span class="value">₹${deliveryCharge}</span>
                </div>

                <div class="summary-row">
                    <span class="label">Amount To Be Paid</span>
                    <span class="value">₹${order.total + deliveryCharge}</span>
                </div>
            </div>
        </div>
    `;
    
}

function managePaymentTabs(){

    document.querySelectorAll('.js-payment-tab').forEach((paymentTab) => {
        paymentTab.addEventListener('click',() => {

            document.querySelectorAll('.js-payment-tab').forEach((tab) => {
                tab.classList.remove('active');
            })

            paymentTab.classList.add('active');

            document.querySelectorAll('.js-payment-method').forEach((paymentMethod) => {
                paymentMethod.classList.remove('active');
            })

            const sectionTab = `${paymentTab.dataset.method}-section`;
            document.querySelector(`.${sectionTab}`).classList.add('active');
        })
    })
}


function renderDeliveryDetails(){
    document.querySelector('.delivery-details').innerHTML = `

        <div class="summary-row">
            <span class="label">Deliver to</span>
            <span class="value">${order.deliveryName}</span>
        </div>

        <div class="summary-row">
            <span class="label">Phone</span>
            <span class="value">${order.deliveryPhone}</span>
        </div>

        <div class="summary-row">
            <span class="label">Address</span>
            <span class="value address-value">${order.deliveryAddress}</span>
        </div>


        ${order.deliveryLandmark ? `
                <div class="summary-row">
                    <span class="label">Landmark</span>
                    <span class="value">
                        ${order.deliveryLandmark}
                    </span>
                </div>
            ` : ''
        }
    `;
}


renderFoodSummary();
managePaymentTabs();
renderDeliveryDetails();



document.querySelector('.pay-btn').addEventListener('click',() => {
    sessionStorage.setItem('confirmedBooking',JSON.stringify(order))
    window.location.href = `../html/food-confirmation.html`;
})



