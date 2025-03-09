import MovieCard from "../components/MovieCard";
import { FormEvent, useEffect, useState } from "react";
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../services/api";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("ფილმების ჩატვირთვისას დაფიქსირდა შეცდომა...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError("");
    } catch (err) {
      console.log(err);
      setError("ფილმების ძებნისას დაფიქსირდა შეცდომა...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="მოძებნეთ ფილმი"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />        
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">იტვირთება...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
