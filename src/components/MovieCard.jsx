function MovieCard({movie}) {
    const posterBaseURL = "https://image.tmdb.org/t/p/w500"

    return (
        <div className="p-1">
            <div className="relative group w-52 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
                {/* Poster */}
                <a className="block">
                    <img
                        src={posterBaseURL + movie.poster_path}
                        alt={movie.title}
                        className="w-full h-auto"
                    />
                </a>

                {/* Meta */}
                <div className="p-2 bg-white">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
          <span className="bg-gray-200 rounded-full px-2 py-0.5 text-xs">
            {movie.vote_average ? `${Math.round(movie.vote_average * 10)}%` : "N/A"}
          </span>
                    </div>
                    <a

                        className="block font-medium text-sm line-clamp-2"
                    >
                        {movie.title}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
