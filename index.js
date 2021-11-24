const API_KEY = "api_key=e51d8358eb50d3a2ed7e17d1c2840036";

const BASE_URL = "https://api.themoviedb.org/3/";

const API_URL_MOVIES = `${BASE_URL}discover/movie?sort_by=popularity.desc&${API_KEY}`;

const API_URL_SERIES = `${BASE_URL}discover/tv?sort_by=popularity.desc&${API_KEY}`;

const IMAGE_URL = "https://image.tmdb.org/t/p/w1280";

const SEARCH_URL = `${BASE_URL}search/multi?${API_KEY}`;


const MOVIES = document.getElementById("movies");
const FORM = document.getElementById("form");
const SEARCH = document.getElementById("search");

async function getData(url, type) {
  const response = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      type === "movie" ? showMovies(data.results) : showSeries(data.results);
    });
}

async function getAllData(url) {
  const response = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showAll(data.results);
    });
}

async function getImage(url) {
  var image;

  const response = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.backdrops);
      image = data.backdrops;
    });

  return image;
}

///////////////////////////////////////////
//////////////////// Show ALl MOVIES & SERIES
///////////////////////////////////////////

function showAll(series) {
  console.log(series);
  MOVIES.innerHTML = "";

  !document.getElementById("movies").classList.contains("row-cols-2") &&
    document
      .getElementById("movies")
      .classList.add(
        "row",
        "row-cols-2",
        "row-cols-md-3",
        "row-cols-lg-4",
        "g-3"
      );

  series.forEach((serie) => {
    if (serie.backdrop_path) {
      if (serie.media_type === "tv") {
        const {
          id,
          name,
          overview,
          poster_path,
          vote_average,
          first_air_date,
        } = serie;

        const seriesElement = document.createElement("div");
        seriesElement.classList.add("col");

        seriesElement.innerHTML = `
          <div class="card h-100 cards" onclick="seriesInfo('${id}', \'${name.replace(
          /['"]+/g,
          ""
        )}'\, \'${overview.replace(
          /['"]+/g,
          ""
        )}\', \'${poster_path}'\, \'${vote_average}'\, '${first_air_date}')">

              <img src="${
                IMAGE_URL + poster_path
              }" class="card-img-top img-fluid cards"  alt="Movie poster">
              <p class="card-text votes"> ${vote_average}</p>
              <p class="card-text movie_title"> ${name}</p>
              <p class="card-text movie_title description"> ${overview.substring(
                0,
                150
              )}...</p>

          </div>
          `;

        MOVIES.appendChild(seriesElement);
      } else if (serie.media_type === "movie") {
        const { id, title, overview, poster_path, vote_average, release_date } =
          serie;

        const movieElement = document.createElement("div");
        movieElement.classList.add("col");

        movieElement.innerHTML = `
              <div class="card h-100 cards" onclick="movieInfo('${id}', \'${title.replace(
          /['"]+/g,
          ""
        )}'\, \'${overview.replace(
          /['"]+/g,
          ""
        )}\', \'${poster_path}'\, \'${vote_average}'\, '${release_date}')">
      
                  <img src="${
                    IMAGE_URL + poster_path
                  }" class="card-img-top img-fluid cards"  alt="Movie poster">
                  <p class="card-text votes"> ${vote_average}</p>
                  <p class="card-text movie_title"> ${title}</p>
                  <p class="card-text movie_title description"> ${overview.substring(
                    0,
                    150
                  )}...</p>
      
              </div>
              `;

        MOVIES.appendChild(movieElement);
      }
    }
  });
}

///////////////////////////////////////////
//////////////////// Show Series
///////////////////////////////////////////

function showSeries(series) {
  console.log(series);
  MOVIES.innerHTML = "";

  !document.getElementById("movies").classList.contains("row-cols-2") &&
    document
      .getElementById("movies")
      .classList.add(
        "row",
        "row-cols-2",
        "row-cols-md-3",
        "row-cols-lg-4",
        "g-3"
      );

  series.forEach((serie) => {
    if (serie.backdrop_path) {
      const { id, name, overview, poster_path, vote_average, first_air_date } =
        serie;

      const seriesElement = document.createElement("div");
      seriesElement.classList.add("col");

      seriesElement.innerHTML = `
          <div class="card h-100 cards" onclick="seriesInfo('${id}', \'${name.replace(
        /['"]+/g,
        ""
      )}'\, \'${overview.replace(
        /['"]+/g,
        ""
      )}\', \'${poster_path}'\, \'${vote_average}'\, '${first_air_date}')">

              <img src="${ IMAGE_URL + poster_path
              }" class="card-img-top img-fluid cards"  alt="Movie poster">
              <p class="card-text votes"> ${vote_average}</p>
              <p class="card-text movie_title"> ${name}</p>
              <p class="card-text movie_title description"> ${overview.substring(
                0,
                150
              )}...</p>

          </div>
          `;

      MOVIES.appendChild(seriesElement);
    }
  });
}

async function seriesInfo(
  id,
  name,
  overview,
  poster_path,
  vote_average,
  first_air_date
) {
  MOVIES.innerHTML = "";

  const seriesDesc = document.createElement("div");

  const poster = await getImage(BASE_URL + "tv/" + id + "/images?" + API_KEY);

  document
    .getElementById("movies")
    .classList.remove(
      "row",
      "row-cols-2",
      "row-cols-md-3",
      "row-cols-lg-4",
      "g-3"
    );

  document.getElementById("movie_container").style.display = "flex";
  document.getElementById("movie_container").style.justifyContent = "center";

  seriesDesc.innerHTML = `
      <div class="card">

       <div class="poster" style="background-image: url('${
         poster && IMAGE_URL + poster[0].file_path
       }');">
        <h1 class="poster-title">${name}</h1>
       </div>
      
       <img src=${
         IMAGE_URL + poster_path
       } style="width: 140px;" class="cover-page" alt="${name}"/>
       <div class="movie-details"> 
        <span>Votes: ${vote_average}</span>
        <span>Released: ${first_air_date}</span>
       </div>
        
      <br/>

        <p class="card-text description-tag">Description</p>
        <p class="card-text overview-tag">${overview}</p>
      </div>

    
  `;
  MOVIES.appendChild(seriesDesc);
}

///////////////////////////////////////////
//////////////////// Show Movies
///////////////////////////////////////////

function showMovies(movies) {
  MOVIES.innerHTML = "";

  !document.getElementById("movies").classList.contains("row-cols-2") &&
    document
      .getElementById("movies")
      .classList.add(
        "row",
        "row-cols-2",
        "row-cols-md-3",
        "row-cols-lg-4",
        "g-3"
      );

  movies.forEach((movie) => {
    const { id, title, overview, poster_path, vote_average, release_date } =
      movie;

    const movieElement = document.createElement("div");
    movieElement.classList.add("col");

    movieElement.innerHTML = `
        <div class="card h-100 cards" onclick="movieInfo('${id}', \'${title.replace(
      /['"]+/g,
      ""
    )}'\, \'${overview.replace(
      /['"]+/g,
      ""
    )}\', \'${poster_path}'\, \'${vote_average}'\, '${release_date}')">

            <img src="${
              IMAGE_URL + poster_path
            }" class="card-img-top img-fluid cards"  alt="Movie poster">
            <p class="card-text votes"> ${vote_average}</p>
            <p class="card-text movie_title"> ${title}</p>
            <p class="card-text movie_title description"> ${overview.substring(
              0,
              150
            )}...</p>

        </div>
        `;

    MOVIES.appendChild(movieElement);
  });
}

async function movieInfo(
  id,
  title,
  overview,
  poster_path,
  vote_average,
  release_date
) {
  MOVIES.innerHTML = "";

  const movieDesc = document.createElement("div");

  const poster = await getImage(
    BASE_URL + "movie/" + id + "/images?" + API_KEY
  );

  document
    .getElementById("movies")
    .classList.remove(
      "row",
      "row-cols-2",
      "row-cols-md-3",
      "row-cols-lg-4",
      "g-3"
    );

  document.getElementById("movie_container").style.display = "flex";
  document.getElementById("movie_container").style.justifyContent = "center";

  movieDesc.innerHTML = `
      <div class="card">

       <div class="poster" style="background-image: url('${
         IMAGE_URL + poster[0].file_path
       }');">
        <h1 class="poster-title">${title}</h1>
       </div>
      
       <img src=${
         IMAGE_URL + poster_path
       } style="width: 140px;" class="cover-page" alt="${title}"/>
       <div class="movie-details"> 
        <span>Votes: ${vote_average}</span>
        <span>Released: ${release_date}</span>
       </div>
        
      <br/>

        <p class="card-text description-tag">Description</p>
        <p class="card-text overview-tag">${overview}</p>
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

////////////////////////////////////
//////////// SEARCH
////////////////////////////////////

FORM.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchValue = SEARCH.value;

  if (searchValue) {
    getAllData(`${SEARCH_URL}&query=${searchValue}`);
  } else {
    getData(API_URL_MOVIES);
  }
});

function callMovies() {
  getData(API_URL_MOVIES, "movie");
  SEARCH.value = "";
}

function callSeries() {
  getData(API_URL_SERIES, "series");
  SEARCH.value = "";
}

callMovies();
