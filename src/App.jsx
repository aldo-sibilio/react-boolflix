import { useState } from "react";

function App() {
  // stato per il valore della searchbar
  const [query, setQuery] = useState("");

  // stato per i risultati dei film
  const [movies, setMovies] = useState([]);

  // funzione che chiama l'API
  function searchMovies() {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${query}&language=it-IT`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Risultati:", data.results);
        setMovies(data.results);
      })
      .catch((error) => {
        console.error("Errore:", error);
      });
  }

 return (
    <div>

      {/* searchbar */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca un film..."
      />
      <button onClick={searchMovies}>Cerca</button>

      {/* lista risultati */}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <p>Titolo: {movie.title}</p>
            <p>Titolo originale: {movie.original_title}</p>
            <p>Lingua: {movie.original_language}</p>
            <p>Voto: {movie.vote_average}</p>
          </li>
        ))}
      </ul>

    </div>
  );
}
export default App