import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // stato per il valore della searchbar
  const [query, setQuery] = useState("");

  // stato per i risultati dei film
  const [movies, setMovies] = useState([]);

  // stato per i risultati delle serie TV
  const [series, setSeries] = useState([]);

  // stato per i film popolari
  const [popularMovies, setPopularMovies] = useState([]);

  // stato per le serie popolari
  const [popularSeries, setPopularSeries] = useState([]);

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

  // al caricamento della pagina carichiamo i film e le serie popolari
  useEffect(() => {

    // chiamata per i film popolari
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=it-IT`)
      .then((response) => response.json())
      .then((data) => {
        setPopularMovies(data.results);
      })
      .catch((error) => {
        console.error("Errore film popolari:", error);
      });

    // chiamata per le serie popolari
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=it-IT`)
      .then((response) => response.json())
      .then((data) => {
        setPopularSeries(data.results);
      })
      .catch((error) => {
        console.error("Errore serie popolari:", error);
      });

  }, []); // array vuoto = eseguito solo al caricamento

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

      {/* header con titolo e searchbar */}
      <header>
        <h1>BoolFlix</h1>
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca un film..."
          />
          <button onClick={search}>Cerca</button>
        </div>
      </header>

      {/* main con le card */}
      <main>

        {/* carosello film popolari */}
        <div className="carousel-section">
          <h2>Film Popolari</h2>
          <div className="carousel">
            {popularMovies.map((movie) => (
              <div className="card" key={movie.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${movie.poster_path})` }}>
                <div className="card-info">
                  <p>Titolo: {movie.title}</p>
                  <p>Titolo originale: {movie.original_title}</p>
                  <p>Lingua: {getFlag(movie.original_language)}</p>
                  <p>Voto:
                    {Array.from({ length: 5 }, (_, i) => (
                      <i key={i} className={i < getStars(movie.vote_average) ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                    ))}
                  </p>
                  <p>Tipo: 🎬 Film</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* carosello serie popolari */}
        <div className="carousel-section">
          <h2>Serie TV Popolari</h2>
          <div className="carousel">
            {popularSeries.map((serie) => (
              <div className="card" key={serie.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${serie.poster_path})` }}>
                <div className="card-info">
                  <p>Titolo: {serie.name}</p>
                  <p>Titolo originale: {serie.original_name}</p>
                  <p>Lingua: {getFlag(serie.original_language)}</p>
                  <p>Voto:
                    {Array.from({ length: 5 }, (_, i) => (
                      <i key={i} className={i < getStars(serie.vote_average) ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                    ))}
                  </p>
                  <p>Tipo: 📺 Serie TV</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* card film */}
        {movies.map((movie) => (
          <div className="card" key={movie.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${movie.poster_path})` }}>
            <div className="card-info">
              <p>Titolo: {movie.title}</p>
              <p>Titolo originale: {movie.original_title}</p>
              <p>Lingua: {getFlag(movie.original_language)}</p>
              <p>Voto:
                {/* creiamo un array di 5 elementi e per ogni elemento mostriamo una stella piena o vuota in base al voto */}
                {Array.from({ length: 5 }, (_, i) => (
                  <i key={i} className={i < getStars(movie.vote_average) ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                ))}
              </p>
              <p>Tipo: 🎬 Film</p>
            </div>
          </div>
        ))}

        {/* card serie TV */}
        {series.map((serie) => (
          <div className="card" key={serie.id} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${serie.poster_path})` }}>
            <div className="card-info">
              <p>Titolo: {serie.name}</p>
              <p>Titolo originale: {serie.original_name}</p>
              <p>Lingua: {getFlag(serie.original_language)}</p>
              <p>Voto:
                {/* creiamo un array di 5 elementi e per ogni elemento mostriamo una stella piena o vuota in base al voto */}
                {Array.from({ length: 5 }, (_, i) => (
                  <i key={i} className={i < getStars(serie.vote_average) ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                ))}
              </p>
              <p>Tipo: 📺 Serie TV</p>
            </div>
          </div>
        ))}

      </main>

    </div>
  );
}

export default App