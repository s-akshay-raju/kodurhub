import {movies} from './movies.js';



function renderMovies(movies){

    let moviesHTML = '';

    movies.forEach(movie => {
        moviesHTML += `
            <div class="movie-card" data-id="${movie.id}">

            <div class="movie-poster-wrapper">
                <img class="movie-poster" src="${movie.poster}" alt="${movie.title}">
                <span class="movie-language">${movie.language}</span>
            </div>

            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                
                <div class="movie-meta">
                    <span class="movie-rating">${movie.rating}</span>
                    <span class="movie-dot">·</span>
                    <span class="movie-duration">${movie.duration}</span>
                    <span class="movie-dot">·</span>
                    <span class="movie-genre">${movie.genre}</span>
                </div>

                <button class="book-btn" onclick="window.location.href='theatres.html?id=${movie.id}'">Book tickets
                </button>
            </div>
        </div>
        `
    });

    document.querySelector('.movies-grid').innerHTML = moviesHTML;
}

renderMovies(movies);


document.querySelectorAll('.js-filter-btn').forEach((filterButton) => {
    filterButton.addEventListener('click' , () => {

        removeActiveFromFilterButtons();
        addActiveToFilterButton(filterButton);

        filterMovies(filterButton.dataset.lang);


    })
})

function removeActiveFromFilterButtons(){

    document.querySelectorAll('.js-filter-btn').forEach((filterButton) => { 
        filterButton.classList.remove('active');
    });

}


function addActiveToFilterButton(filterButton){
    filterButton.classList.add('active');   
}



function filterMovies(lang){
    if (lang === 'All'){
        renderMovies(movies)
    }
    else {
        let filteredMovies = movies.filter((movie) => {
            return movie.language === lang;
        })

        renderMovies(filteredMovies);
    }
}