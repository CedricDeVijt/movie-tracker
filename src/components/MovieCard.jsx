import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const posterBaseURL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie, index = 0 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 5);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      className={`p-1 transition-all duration-500 ease-out transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="relative group w-52 rounded-2xl overflow-hidden shadow-md hover:shadow-lg">
        {/* Poster */}
        <Link to={`/movie/${movie.id}`} className="block">
          <img
            src={posterBaseURL + movie.poster_path}
            alt={movie.title}
            className="w-full h-auto"
          />
        </Link>

        {/* Meta */}
        <div className="p-2 bg-white">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <span className="bg-gray-200 rounded-full px-2 py-0.5 text-xs">
              {movie.vote_average
                ? `${Math.round(movie.vote_average * 10)}%`
                : "N/A"}
            </span>
          </div>
          <Link
            to={`/movie/${movie.id}`}
            className="block font-medium text-sm line-clamp-2"
          >
            {movie.title}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
