import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/tmdb.js";
import useLocalList from "../hooks/useLocalList.js";
import MovieDetail from "../components/MovieDetail.jsx";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [_, setError] = useState(null);

  const {
    add: addWatched,
    has: hasWatched,
    remove: removeWatched,
  } = useLocalList("watchedMovies", { initial: [] });
  const {
    add: addWatchlist,
    has: hasInWatchlist,
    remove: removeFromWatchlist,
  } = useLocalList("watchlistMovies", { initial: [] });

  function handleToggleWatched() {
    if (hasWatched(Number(id))) {
      removeWatched(Number(id));
    } else {
      addWatched(Number(id));
      if (hasInWatchlist(Number(id))) {
        removeFromWatchlist(Number(id));
      }
    }
  }

  function handleToggleWatchlist() {
    if (hasInWatchlist(Number(id))) {
      removeFromWatchlist(Number(id));
    } else {
      addWatchlist(Number(id));
    }
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      setError(null);
      try {
        const data = await getMovieDetails(id);
        if (!data) {
          setMovie(null);
          setError("not_found");
        } else {
          setMovie(data);
        }
      } catch (err) {
        setError(err.message || "fetch_error");
        setMovie(null);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p></p>;

  return (
    <MovieDetail
      movie={movie}
      id={id}
      hasWatched={hasWatched}
      hasInWatchlist={hasInWatchlist}
      handleToggleWatched={handleToggleWatched}
      handleToggleWatchlist={handleToggleWatchlist}
    />
  );
}

export default Movie;
