import { motion } from "framer-motion";

const posterBaseURL = "https://image.tmdb.org/t/p/w500";

function MovieDetail({
  movie,
  id,
  hasWatched,
  hasInWatchlist,
  handleToggleWatched,
  handleToggleWatchlist,
}) {
  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Poster Section */}
      <div className="flex-shrink-0 md:w-1/3">
        <motion.img
          className="w-full rounded-2xl shadow-md"
          src={posterBaseURL + movie.poster_path}
          alt="Movie Poster"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>
      {/* Details Section */}
      <div className="flex-1 p-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {movie.title}{" "}
          {[...Array(5)].map((_, i) => {
            const starValue = Math.round(movie.vote_average * 10) / 20;
            return (
              <span key={i} className="text-yellow-400 text-3xl">
                {i < Math.round(starValue) ? "★" : "☆"}
              </span>
            );
          })}
        </h1>
        <p className="mb-4">{movie.overview}</p>
        <p className="mb-2">Release Date: {movie.release_date}</p>
        <p className="mb-2">
          Rating: {Math.round(movie.vote_average * 10) / 10}
        </p>
        <p className="mb-2">
          Genres: {movie.genres.map((g) => g.name).join(", ")}
        </p>
        <p className="mb-2">Runtime: {movie.runtime} minutes</p>
        {movie.budget > 0 && (
          <p className="mb-2">Budget: ${movie.budget.toLocaleString()}</p>
        )}
        {movie.revenue > 0 && (
          <p className="mb-2">Revenue: ${movie.revenue.toLocaleString()}</p>
        )}
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
      </div>
    </div>
  );
}

export default MovieDetail;
