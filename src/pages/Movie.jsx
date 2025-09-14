import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getMovieDetails} from "../services/tmdb.js";

const posterBaseURL = "https://image.tmdb.org/t/p/w500"

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
        <div className="container mx-auto p-4 flex">
            <div>

                <img className="rounded-2xl shadow-md" src={posterBaseURL + movie.poster_path} alt={"Movie Poster"}/>
            </div>
            <div className="p-8">
                <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
                <p className="mb-2">{movie.overview}</p>
                <p className="mb-2">Release Date: {movie.release_date}</p>
                <p className="mb-2">Rating: {Math.round(movie.vote_average*10)}</p>
                <p className="mb-2">Genres: {movie.genres.map(g => g.name).join(", ")}</p>
                <p className="mb-2">Runtime: {movie.runtime} minutes</p>
                {movie.budget > 0 && <p className="mb-2">Budget: ${movie.budget.toLocaleString()}</p>}
                {movie.revenue > 0 && <p className="mb-2">Revenue: ${movie.revenue.toLocaleString()}</p>}
            </div>


        </div>
    );
}

export default Movie;
