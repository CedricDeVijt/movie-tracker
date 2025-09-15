import useLocalList from "./useLocalList.js";

export default function useMovieList(id) {
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

  return {
    hasWatched: () => hasWatched(Number(id)),
    hasInWatchlist: () => hasInWatchlist(Number(id)),
    handleToggleWatched,
    handleToggleWatchlist,
  };
}
