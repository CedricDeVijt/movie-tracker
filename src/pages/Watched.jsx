import MovieGrid from "../components/MovieGrid";
import useLocalList from "../hooks/useLocalList";

function Watched() {
  const initial = [];
  const { list: movieIDs } = useLocalList("watchedMovies", { initial });

  return <MovieGrid movieIDs={movieIDs} />;
}

export default Watched;
