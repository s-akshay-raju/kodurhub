const bookingInfo = JSON.parse(sessionStorage.getItem('pendingBooking'));

const movieName = bookingInfo.movie;
const theatreName = bookingInfo.theatre;
const showTiming = bookingInfo.show;
const seats = bookingInfo.seats;
const showId = bookingInfo.showId;
const totalPrice = bookingInfo.total;

document.querySelector('.pay-btn').textContent= `Pay ₹${totalPrice}`;

const seatIds = seats.map((seat) => {
    return seat.id;
});


function renderOrderSummary(){

    document.querySelector('.js-order-summary').innerHTML = `
        <h2 class="summary-heading">Order Summary</h2>

        <div class="summary-row">
            <span class="label">Movie</span>
            <span class="value">${movieName}</span>
        </div>

        <div class="summary-row">
            <span class="label">Theatre</span>
            <span class="value">${theatreName}</span>
        </div>

        <div class="summary-row">
            <span class="label">Show</span>
            <span class="value">${showTiming}</span>
        </div>

        <div class="summary-row">
            <span class="label">Seats</span>
            <span class="value">${seatIds.join(', ')}</span>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-total">
            <span>Total</span>
            <span>₹${totalPrice}</span>
        </div>
    `
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


renderOrderSummary();
managePaymentTabs();




document.querySelector('.pay-btn').addEventListener('click',() => {

    sessionStorage.setItem('confirmedBooking',JSON.stringify(bookingInfo))
    window.location.href = `confirmation.html`
})



