import { useState } from "react";

function App() {
  // stato per il valore della searchbar
  const [query, setQuery] = useState("");

  // stato per i risultati dei film
  const [movies, setMovies] = useState([]);

  // stato per i risultati delle serie TV
  const [series, setSeries] = useState([]);

  // funzione che chiama l'API
  function search() {

    // chiamata per i film
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${query}&language=it-IT`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error("Errore film:", error);
      });

    // chiamata per le serie TV
    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${query}&language=it-IT`)
      .then((response) => response.json())
      .then((data) => {
        setSeries(data.results);
      })
      .catch((error) => {
        console.error("Errore serie:", error);
      });
  }

  // funzione che converte il codice lingua in una bandiera emoji
  function getFlag(language) {
    const flags = {
      en: "🇬🇧",
      it: "🇮🇹",
      fr: "🇫🇷",
      de: "🇩🇪",
      es: "🇪🇸",
      ja: "🇯🇵",
      ko: "🇰🇷",
      zh: "🇨🇳",
      pt: "🇵🇹",
      ru: "🇷🇺",
    };

    // se non troviamo la bandiera, mostriamo il codice lingua
    return flags[language] || language;
  }

  // funzione che converte il voto da 1-10 in stelle da 1-5
  function getStars(vote) {
    return Math.ceil(vote / 2);
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
      <button onClick={search}>Cerca</button>

      {/* lista risultati */}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title} />
            <p>Titolo: {movie.title}</p>
            <p>Titolo originale: {movie.original_title}</p>
            <p>Lingua: {getFlag(movie.original_language)}</p>
            {/* creiamo un array di 5 elementi e per ogni elemento mostriamo una stella piena o vuota in base al voto */}
            <p>Voto:
              {Array.from({ length: 5 }, (_, i) => (
                <i key={i} className={i < getStars(movie.vote_average) ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
              ))}
            </p>
            <p>Tipo: 🎬 Film</p>
          </li>
        ))}
        
      </ul>
      {/* lista serie TV */}
      <ul>
        {series.map((serie) => (
          <li key={serie.id}>
            <img src={`https://image.tmdb.org/t/p/w342${serie.poster_path}`} alt={serie.name} />
            <p>Titolo: {serie.name}</p>
            <p>Titolo originale: {serie.original_name}</p>
            <p>Lingua: {getFlag(serie.original_language)}</p>
            {/* creiamo un array di 5 elementi e per ogni elemento mostriamo una stella piena o vuota in base al voto */}
            <p>Voto:
              {Array.from({ length: 5 }, (_, i) => (
                <i key={i} className={i < getStars(serie.vote_average) ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
              ))}
            </p>
            <p>Tipo: 📺 Serie TV</p>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App