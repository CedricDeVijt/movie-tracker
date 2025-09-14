import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../services/tmdb.js";
import MovieGrid from "../components/MovieGrid.jsx";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResult() {
  const [movieIDs, setMovieIDs] = useState([]);
  const [loading, setLoading] = useState(false);
  const query = useQuery().get("query");

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchMovies(query)
        .then((results) => setMovieIDs(results.map((movie) => movie.id)))
        .finally(() => setLoading(false));
    }
  }, [query]);

  return (
    <div>
      {loading ? (
        <p className="text-center p-8">Loading...</p>
      ) : (
        <MovieGrid movieIDs={movieIDs} />
      )}
    </div>
  );
}

export default SearchResult;
