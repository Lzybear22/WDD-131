const STORAGE_KEY = "cinelist-movies";

const defaultMovies = [
  { id: 1, title: "Interstellar", genre: "Sci-Fi", year: 2014, watched: false },
  { id: 2, title: "The Dark Knight", genre: "Action", year: 2008, watched: true },
  { id: 3, title: "The Truman Show", genre: "Comedy", year: 1998, watched: false },
  { id: 4, title: "Inception", genre: "Sci-Fi", year: 2010, watched: false },
  { id: 5, title: "Whiplash", genre: "Drama", year: 2014, watched: false }
];

const state = {
  genre: "All",
  search: ""
};

function loadMovies() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn("Could not read saved movies:", error);
  }
  return defaultMovies;
}

function saveMovies() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.warn("Could not save movies:", error);
  }
}

let movies = loadMovies();

const movieList = document.querySelector("#movieList");
const movieStats = document.querySelector("#movieStats");
const emptyMessage = document.querySelector("#emptyMessage");
const movieForm = document.querySelector("#movieForm");
const titleInput = document.querySelector("#titleInput");
const genreInput = document.querySelector("#genreInput");
const yearInput = document.querySelector("#yearInput");
const formError = document.querySelector("#formError");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll(".filter");

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.classList.add("movie-card");

  // Conditional branching for status text/class
  const statusText = movie.watched ? "Watched" : "Not watched";
  const statusClass = movie.watched ? "watched" : "not-watched";
  const buttonLabel = movie.watched ? "Mark unwatched" : "Mark watched";

  card.innerHTML = `
    <h3>${movie.title}</h3>
    <p>Genre: ${movie.genre}</p>
    <p>Year: ${movie.year}</p>
    <p class="status ${statusClass}">Status: ${statusText}</p>
    <div class="card-actions">
      <button type="button" class="watch-button ${movie.watched ? "watched" : ""}">${buttonLabel}</button>
      <button type="button" class="remove-button">Remove</button>
    </div>
  `;

  card.querySelector(".watch-button").addEventListener("click", () => {
    toggleWatched(movie.id);
  });

  card.querySelector(".remove-button").addEventListener("click", () => {
    removeMovie(movie.id);
  });

  return card;
}

function displayMovies(list) {
  movieList.innerHTML = "";

  list.forEach(movie => {
    movieList.appendChild(createMovieCard(movie));
  });

  if (list.length === 0) {
    emptyMessage.hidden = false;
  } else {
    emptyMessage.hidden = true;
  }
}

function getVisibleMovies() {
  return movies.filter(movie => {
    const matchesGenre = state.genre === "All" || movie.genre === state.genre;
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(state.search.trim().toLowerCase());
    return matchesGenre && matchesSearch;
  });
}

function updateStats() {
  const total = movies.length;
  const watchedCount = movies.filter(movie => movie.watched).length;

  // reduce() used to total up "watched" movies as an alternate example
  const watchedViaReduce = movies.reduce((count, movie) => {
    return movie.watched ? count + 1 : count;
  }, 0);

  const remaining = total - watchedViaReduce;

  movieStats.textContent =
    `Total: ${total} | Watched: ${watchedCount} | Remaining: ${remaining}`;
}

function render() {
  const visible = getVisibleMovies();
  displayMovies(visible);
  updateStats();
}

function toggleWatched(id) {
  const movie = movies.find(m => m.id === id);
  if (movie) {
    movie.watched = !movie.watched;
    saveMovies();
    render();
  }
}

function removeMovie(id) {
  movies = movies.filter(movie => movie.id !== id);
  saveMovies();
  render();
}

function addMovie(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const genre = genreInput.value;
  const year = Number(yearInput.value);

  if (title === "" || Number.isNaN(year) || year < 1888) {
    formError.textContent = "Please enter a movie title and a valid release year.";
    formError.hidden = false;
    return;
  }

  formError.hidden = true;

  const nextId = movies.reduce((max, movie) => Math.max(max, movie.id), 0) + 1;

  const newMovie = {
    id: nextId,
    title,
    genre,
    year,
    watched: false
  };

  movies.push(newMovie);
  saveMovies();
  movieForm.reset();
  titleInput.focus();
  render();
}

movieForm.addEventListener("submit", addMovie);

searchInput.addEventListener("input", () => {
  state.search = searchInput.value;
  render();
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    state.genre = button.dataset.genre;

    filterButtons.forEach(btn => {
      const isActive = btn === button;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    render();
  });
});

document.querySelector("#startButton").addEventListener("click", () => {
  document.querySelector("#movieList").scrollIntoView({ behavior: "smooth" });
});

render();