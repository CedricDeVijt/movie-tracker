import MovieCarousel from "../components/MovieCarousel.jsx";
import {getPopularMovies, getTopRatedMovies, getUpcomingMovies} from "../services/tmdb.js";
import {useEffect, useState} from "react";

function Home() {

    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            const data = await getPopularMovies();
            setPopularMovies(data);
        }

        fetchMovies();
    }, []);

    const [topRatedMovies, setTopRatedMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            const data = await getTopRatedMovies();
            setTopRatedMovies(data);
        }

        fetchMovies();
    }, []);

    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            const data = await getUpcomingMovies();
            setUpcomingMovies(data);
        }

        fetchMovies();
    }, []);


    return (
        <>
            <div>
                <h1 className="pl-12 text-5xl font-extrabold mb-6 bg-clip-text drop-shadow-lg">Popular Movies</h1>
                <MovieCarousel movies={popularMovies}/>
            </div>

            <div>
                <h1 className="pl-12 text-5xl font-extrabold mb-6 bg-clip-text drop-shadow-lg">Top Rated Movies</h1>
                <MovieCarousel movies={topRatedMovies}/>
            </div>

            <div>
                <h1 className="pl-12 text-5xl font-extrabold mb-6 bg-clip-text drop-shadow-lg">Upcoming Movies</h1>
                <MovieCarousel movies={upcomingMovies}/>
            </div>

        </>
    );
}

export default Home;
