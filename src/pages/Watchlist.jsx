import MovieGrid from "../components/MovieGrid";
import useLocalList from "../hooks/useLocalList";

function Watchlist() {
  const initial = [];
  const { list: movieIDs } = useLocalList("watchlistMovies", { initial });

  return <MovieGrid movieIDs={movieIDs} />;
}

export default Watchlist;
