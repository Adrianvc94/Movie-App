const API_KEY = "api_key=e51d8358eb50d3a2ed7e17d1c2840036";

const BASE_URL = "https://api.themoviedb.org/3/";

const API_URL = `${BASE_URL}discover/movie?sort_by=popularity.desc&${API_KEY}`;

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MOVIES = document.getElementById("movies");

async function getData(url) {
  const response = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(movies) {
  MOVIES.innerHTML = "";

  movies.forEach((movie) => {
    const { title, overview, poster_path, vote_average } = movie;


    const movieElement = document.createElement("div");
    movieElement.classList.add("col");
    movieElement.innerHTML = `
        <div class="card h-100 cards"">
            <img src="${
              IMAGE_URL + poster_path
            }" class="card-img-top img-fluid cards"  alt="Movie poster">
           
            <p class="card-text votes"> ${vote_average}</p>
            <p class="card-text movie_title"> ${title}</p>
            <p class="card-text movie_title description"> ${overview.substring(0,150)}...</p>
        </div>
        `;

    MOVIES.appendChild(movieElement);
  });
}

getData(API_URL);


function movieInfo(movieObject) {
  MOVIES.innerHTML = "";

  const movieDesc = document.createElement('div');

  movieDesc.innerHTML = `
      <div class="card h-100">
        <img src="${
          IMAGE_URL + movieObject.poster_path
        }" class="card-img-top img-fluid cards"  alt="Movie poster">
      
        <p class="card-text votes"> ${movieObject.vote_average}</p>
        <p class="card-text movie_title"> ${movieObject.title}</p>
      </div>
  `;

  MOVIES.appendChild(movieDesc);

}

function DisplayNavbar() {
  document.getElementById("navbar").classList.contains("show")
    ? document.getElementById("navbar").classList.remove("show")
    : document.getElementById("navbar").classList.add("show");

  document.querySelector("body").classList.contains("stopScroll")
    ? document.querySelector("body").classList.remove("stopScroll")
    : document.querySelector("body").classList.add("stopScroll");
}
