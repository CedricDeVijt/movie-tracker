import MovieCard from "./MovieCard.jsx";
import {getMovieDetails} from "../services/tmdb.js";
import {useEffect, useState} from "react";

function MovieGrid({movieIDs}) {

    // Fetch movie details based on movieIDs using getMovieDetails()
    let [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            const movieDetails = await Promise.all(movieIDs.map(id => getMovieDetails(id)));
            setMovies(movieDetails);
        }

        fetchMovies();
    }, [movieIDs]);

    return (
        <div className="w-full px-4">
            {movies.length === 0 ? (
                <p className="text-center text-gray-500 p-8">No movies to display.</p>
            ) : (
                <div
                    className="grid grid-cols-[repeat(auto-fit,minmax(208px,1fr))] gap-4 justify-center mx-auto max-w-full pt-4">
                    {movies.map((movie, idx) => (
                        <MovieCard key={movie.id || idx} movie={movie}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MovieGrid