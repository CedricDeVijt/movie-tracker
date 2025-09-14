import { useRef } from "react";
import MovieCard from "./MovieCard.jsx";

function MovieCarousel({ movies }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (movies.length === 0) {
    return <></>;
  }

  return (
    <div className="relative w-full">
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-gray-200"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
      >
        &#8592;
      </button>
      <div
        ref={scrollRef}
        className="flex overflow-y-hidden overflow-x-auto space-x-4 scrollbar-hide px-10"
        style={{ scrollBehavior: "smooth" }}
      >
        {movies.map((movie, idx) => (
          <MovieCard key={movie.id || idx} movie={movie} index={idx} />
        ))}
      </div>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-gray-200"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
      >
        &#8594;
      </button>
    </div>
  );
}

export default MovieCarousel;
