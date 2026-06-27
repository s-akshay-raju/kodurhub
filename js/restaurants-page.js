import { restaurants } from "./restaurants.js";


function renderRestaurants(){
    let restaurantsHTML = ``;

    restaurants.forEach((restaurant) => {

        restaurantsHTML += `

            <div class="restaurant-grid" data-restaurant-id="${restaurant.id}">

                <img src="${restaurant.image}" alt="">
                
                <div class="restaurant-info">
                    <div class="restaurant-name">${restaurant.name}</div>
                    <div class="restaurant-cuisine">${restaurant.cuisine}</div>

                    <div class="restaurant-meta">
                        <span class="restaurant-rating">⭐${restaurant.rating}</span>
                        <span>•</span>
                        <span class="delivery-time">${restaurant.deliveryTime}</span>
                    </div>

                    <div class="delivery-min-order">${restaurant.minOrder}</div>
                </div>

            </div>
        `
    });

    document.querySelector('.restaurants').innerHTML = restaurantsHTML;

    addMenuUrl();
}

renderRestaurants();



function addMenuUrl(){
    document.querySelectorAll('.restaurant-grid').forEach((restaurant) => {
        restaurant.addEventListener('click',() => {
            window.location.href = `menu.html?restaurantId=${restaurant.dataset.restaurantId.trim()}`;
        });
    });
}


