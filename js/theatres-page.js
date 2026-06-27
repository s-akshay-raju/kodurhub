import {movies} from './movies.js';

let url = new URL(window.location.href)

let movieId = Number(url.searchParams.get('id'));

const currentMovie = movies.find((movie) => {
    return movie.id === movieId;
});


if (!currentMovie) {

    document.querySelector('.movie-detail-header').innerHTML = '<p>Movie not found.</p>'

}

else{
    renderMovieHeader(currentMovie);

    renderTheatresContainer(currentMovie);
}


function renderMovieHeader(currentMovie){

    let movieHeaderHTML = '';
   
    movieHeaderHTML = `
        <div class="movie-poster">
            <img src=${currentMovie.poster} alt="${currentMovie.title}">
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${currentMovie.title}</h3>
            
            <div class="movie-meta">
                <span class="movie-rating">${currentMovie.rating}</span>
                <span class="movie-dot">·</span>
                <span class="movie-duration">${currentMovie.duration}</span>
                <span class="movie-dot">·</span>
                <span class="movie-genre">${currentMovie.genre}</span>
            </div>

            <div class="theatre-count">${currentMovie.theatres.length} theatres showing this movie</div>
        </div>
    `


    document.querySelector('.movie-detail-header').innerHTML = movieHeaderHTML;

}



function renderTheatresContainer(currentMovie){


    let theatresContainerHTML = '';

    currentMovie.theatres.forEach((theatre) => {

        let showsHTML = '';

        theatre.shows.forEach((show) => {
            showsHTML += `<span class="show-timings" data-theatre="${theatre.name}" data-show-timing="${show}">${show}</span>`
        })

        theatresContainerHTML += `
            <div class="theatre">
                <div class="theatre-name">
                    <h4>${theatre.name}</h4>
                </div>
                <div class="theatre-shows"> ${showsHTML} 
                </div>   
            </div>
        `;
    } );


    document.querySelector('.theatres-container').innerHTML = theatresContainerHTML;

    addEventListenerToShows();
}


function addEventListenerToShows(){
    document.querySelectorAll('.show-timings').forEach((show) => {
        show.addEventListener('click', () => {
            window.location.href = `seats.html?id=${movieId}&theatre=${encodeURIComponent(show.dataset.theatre)}&show=${encodeURIComponent(show.dataset.showTiming)}`       
        })
    })

    
}






