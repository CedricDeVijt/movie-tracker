import useMovieList from "../hooks/useMovieList.js";
import { useAuth0 } from "@auth0/auth0-react";

function ListButtons({ id }) {
  const {
    hasWatched,
    hasInWatchlist,
    handleToggleWatched,
    handleToggleWatchlist,
  } = useMovieList(id);
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated)
    return (
      <div className="bg-blue-300 w-3/12 rounded-md p-2 text-center">
        <p className="text-white">Login to add to list</p>
      </div>
    );

  return (
    <>
      <button
        onClick={handleToggleWatched}
        className={`px-3 py-2 rounded-md mr-4 ${
          hasWatched(Number(id))
            ? "bg-gray-200 text-blue-600 border border-blue-600 hover:bg-gray-300"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {hasWatched(Number(id)) ? "Remove from Watched" : "Add to Watched"}
      </button>
      {!hasWatched(Number(id)) && (
        <button
          onClick={handleToggleWatchlist}
          className={`px-3 py-2 rounded-md ${
            hasInWatchlist(Number(id))
              ? "bg-gray-200 text-blue-600 border border-blue-600 hover:bg-gray-300"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {hasInWatchlist(Number(id))
            ? "Remove from Watchlist"
            : "Add to Watchlist"}
        </button>
      )}
    </>
  );
}

export default ListButtons;
