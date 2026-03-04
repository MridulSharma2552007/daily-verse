const OMDB_API_KEY = "b25bedfd";

async function loadMovies() {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=movie&type=movie`,
    );

    const data = await response.json();
    console.log(data);

    const container = document.getElementById("movie-container");

    container.innerHTML = data.Search.map(
      (movie) => `
      <div class="movie-card">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}" alt="${movie.Title} poster" loading="lazy">
        <div class="movie-content">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
          <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" rel="noopener noreferrer">
            Check More...
          </a>
        </div>
      </div>
    `,
    ).join("");
  } catch (error) {
    console.error("Movie error:", error);
  }
}

loadMovies();
