import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getMovieDetails} from "../services/tmdb.js";

const posterBaseURL = "https://image.tmdb.org/t/p/w1920"

function Movie() {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMovieDetails() {
            const data = await getMovieDetails(id);
            setMovie(data);
            setLoading(false)
        }

        fetchMovieDetails();
    }, [id]);


    if (loading) return <p>Loading...</p>;
    if (!movie) return <p>Movie not found</p>;

    return (
        <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
            {/* Poster Section */}
            <div className="flex-shrink-0 md:w-1/3">
                <img
                    className="w-full rounded-2xl shadow-md"
                    src={posterBaseURL + movie.poster_path}
                    alt="Movie Poster"
                />
            </div>

            {/* Details Section */}
            <div className="flex-1 p-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{movie.title}</h1>
                <p className="mb-4">{movie.overview}</p>
                <p className="mb-2">Release Date: {movie.release_date}</p>
                <p className="mb-2">Rating: {Math.round(movie.vote_average * 10)}</p>
                <p className="mb-2">Genres: {movie.genres.map(g => g.name).join(", ")}</p>
                <p className="mb-2">Runtime: {movie.runtime} minutes</p>
                {movie.budget > 0 && (
                    <p className="mb-2">Budget: ${movie.budget.toLocaleString()}</p>
                )}
                {movie.revenue > 0 && (
                    <p className="mb-2">Revenue: ${movie.revenue.toLocaleString()}</p>
                )}
            </div>
        </div>

    );
}

export default Movie;
