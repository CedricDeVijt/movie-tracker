import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail.jsx";
import { getMovieDetails } from "../services/tmdb.js";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [_, setError] = useState(null);

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

  return <MovieDetail movie={movie} id={id} />;
}

export default Movie;
