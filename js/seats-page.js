import {movies} from './movies.js';
import { theatresLayout } from './theatres-layout.js';

// to get url parameters
const url = new URL(window.location.href);

const movieId = Number(url.searchParams.get('id'));
const theatreName = decodeURIComponent(url.searchParams.get('theatre'));
const showTime = decodeURIComponent(url.searchParams.get('show'));



let selectedSeats = [];
let totalPrice = 0;



const movie = movies.find((movie) => {
    return movie.id === movieId;
})

const theatre = movie.theatres.find((theatre) => {
    return theatre.name === theatreName;
})

const layout = theatresLayout.find((layoutItem) => {
    return layoutItem.id === theatre.theatreId;
})


// render seats of specific theatre

function renderSeats(layout){
    let layoutHTML = '';

    layout.categories.forEach((category) => {

        let rowsHTML = '';

        Object.entries(category.rows).forEach(([rowLabel,seats]) => {

            let seatsHTML = '';

            seats.forEach((seat) => {

                if (seat === null){
                    seatsHTML += `<div class="seat-gap"></div>`;
                }
                else{
                    const isBooked = false;
                    const bookedClass = isBooked ? 'booked' : '';
                    const seatContent = isBooked ? '🗙' : seat;

                    seatsHTML += `
                        <div class="seat ${bookedClass}" 
                            data-row="${rowLabel}"
                            data-seat="${seat}"
                            data-price="${category.price}"
                            data-booked="${isBooked}">

                            ${seatContent}
                        </div>
                    `
                }
            });

            rowsHTML += `
                <div class="seat-row">
                    <span class="row-label">${rowLabel}</span>
                    ${seatsHTML}
                </div>
            `
        });

        layoutHTML += `
            <div class="seat-category">
                <div class="category-header">
                    <span class="category-name">${category.name}</span>
                    <span class="category-dot">•</span>
                    <span class="category-price">₹${category.price}</span>
                </div>
                ${rowsHTML}
            </div>
        `;
    });

    
    document.querySelector('.seat-layout').innerHTML = layoutHTML;


}


// render booking info

function renderBookingInfoBar(){
    const movieName = movie.title;


    document.querySelector('.booking-info-bar').innerHTML = `

        <span class="info-movie">${movieName}</span>
        <span class="info-dot">›</span>
        <span>${theatreName}</span>
        <span class="info-dot">›</span>
        <span class="info-show">${showTime}</span>
    `
}

// add click listeners to seats

function addSeatClickListeners(){
    document.querySelectorAll('.seat').forEach((seat) => {
        seat.addEventListener('click',() => {

            if (seat.dataset.booked === 'true'){
                return;
            }

            const seatId = `${seat.dataset.row}${seat.dataset.seat}`;
            const price = Number(seat.dataset.price);


            if (seat.classList.contains('selected')){
                seat.classList.remove('selected');
                selectedSeats = selectedSeats.filter((seats) => {
                    return seats.id !== seatId;
                })
                totalPrice -= price;
            }

            else{
                seat.classList.add('selected')
                selectedSeats.push({
                    id: seatId,
                    price: price
                })
                totalPrice += price;
            }

            updateSummary();

        })
    })
}


function updateSummary(){
    const selectedList = document.querySelector('.selected-list');
    const totalPriceElement = document.querySelector('.total-price')
    const proceedBtn = document.querySelector('.proceed-btn')


    if (selectedSeats.length === 0){
        selectedList.textContent = 'None'
        totalPriceElement.textContent = '₹0'
        proceedBtn.disabled = true
    }

    else{
        selectedList.textContent = selectedSeats.map(s => s.id).join(', ')
        totalPriceElement.textContent = `₹${totalPrice}`
        proceedBtn.disabled = false
    }
} 






renderBookingInfoBar();
renderSeats(layout);
addSeatClickListeners();
updateSummary();


function storeBookingData(){
    sessionStorage.setItem('pendingBooking',JSON.stringify({
        movie : movie.title,
        theatre : theatreName,
        show : showTime,
        seats : selectedSeats,
        showId : `${theatreName}_${showTime}`,
        total : totalPrice,
    
    }))
}


document.querySelector('.proceed-btn').addEventListener('click',() => {
    storeBookingData();
    window.location.href = `payment.html`;
})


