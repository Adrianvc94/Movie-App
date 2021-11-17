const API_KEY = "api_key=e51d8358eb50d3a2ed7e17d1c2840036";

const BASE_URL = "https://api.themoviedb.org/3/";

const API_URL = `${BASE_URL}discover/movie?sort_by=popularity.desc&${API_KEY}`;

async function getData(url) {
    const response = await fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
    });

}

function showMovies(movies) {

    
    movies.forEach(movie => {
        const {tittle, overview, poster_path, vote_average} = movies;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `

        `
    });

}

getData(API_URL);


function DisplayNavbar() {



    document.getElementById('navbar').classList.contains('show') ? document.getElementById('navbar').classList.remove('show') : document.getElementById('navbar').classList.add('show');



}

