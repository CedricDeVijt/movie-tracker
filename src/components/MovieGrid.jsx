import MovieCard from "./MovieCard.jsx";
import { getMovieDetails } from "../services/tmdb.js";
import { useEffect, useState } from "react";

function MovieGrid({ movieIDs }) {
  let [movies, setMovies] = useState([]);
  let [loading, setLoading] = useState(true);

  const moviesWithImages = movies.filter((movie) => movie.poster_path);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      const movieDetails = await Promise.all(
        movieIDs.map((id) => getMovieDetails(id)),
      );
      setMovies(movieDetails);
      setLoading(false);
    }

    fetchMovies();
  }, [movieIDs]);

  return (
    <div className="w-full px-4">
      {loading ? (
        <p className="text-center text-gray-500 p-8">Loading movies...</p>
      ) : moviesWithImages.length === 0 && movieIDs.length > 0 ? (
        <p className="text-center text-gray-500 p-8">No movies to display.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(208px,max-content))] gap-4 justify-start mx-auto max-w-full pt-4">
          {moviesWithImages.map((movie, idx) => (
            <MovieCard key={movie.id || idx} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieGrid;
