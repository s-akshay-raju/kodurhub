const bookingInfo = JSON.parse(sessionStorage.getItem('confirmedBooking'));

const seatIds = bookingInfo.seats.map(seat => {
    return seat.id;
});

const bookingId = 'KH' + Date.now().toString().slice(-8);

console.log(bookingId) // KH1781797382707

renderBookingDetails();

function renderBookingDetails(){

    document.querySelector('.booking-details').innerHTML = `
        <div class="detail-row">
            <span class="detail-label">Movie</span>
            <span class="detail-value">${bookingInfo.movie}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Theatre</span>
            <span class="detail-value">${bookingInfo.theatre}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Show</span>
            <span class="detail-value">${bookingInfo.show}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Seats</span>
            <span class="detail-value">${seatIds}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Amount Paid</span>
            <span class="detail-value">₹${bookingInfo.total}</span>
        </div>
    `
}

console.log(bookingInfo)



document.querySelector('.js-booking-id').textContent = `Booking ID: ${bookingId}`

document.querySelector('.go-home-btn').addEventListener('click',() => {
    window.location.href = '../index.html';
})


const qrData = encodeURIComponent(`TicketID:${bookingId}|Movie:${bookingInfo.movie}|Seats:${seatIds.join(',')}`);


function generateQRCode(){
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}`;

    document.querySelector('.qr-code').innerHTML = `
        <img src=${url} alt="Booking QR">
        <p class="qr-label">Scan at theatre</p>
    `
}

window.addEventListener('load',() => {
    generateQRCode();
})
