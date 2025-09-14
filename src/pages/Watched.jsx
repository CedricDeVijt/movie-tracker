import MovieGrid from '../components/MovieGrid';

function Watched() {

    let movieIDs = [755898, 1311031, 1311031, 1311031, 1311031, 1311031, 1311031, 1311031, 1311031, 1311031, 1311031, 1311031, 1311031];

    return (
        <MovieGrid movieIDs={movieIDs}/>
    );
}

export default Watched;
