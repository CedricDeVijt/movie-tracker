import MovieCarousel from "../components/MovieCarousel.jsx";
import {getPopularMovies} from "../services/tmdb.js";

function Home() {
    const popularMovies = getPopularMovies()

    return (
        <>
            <div>
                <h1 className="text-5xl font-extrabold mb-6 bg-clip-text drop-shadow-lg"> Popular Movies </h1>

                <MovieCarousel movies={popularMovies}/>
            </div>
        </>
    );
}

export default Home;
