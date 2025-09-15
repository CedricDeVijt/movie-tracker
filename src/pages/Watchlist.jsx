import { useAuth0 } from "@auth0/auth0-react";
import MovieGrid from "../components/MovieGrid";
import useSupabaseList from "../hooks/useSupabaseList";

function Watchlist() {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();
  const { list: movieIDs, loading } = useSupabaseList("watchlist");

  if (authLoading) {
    return <div>Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view your watchlist.</div>;
  }

  if (loading) {
    return <div>Loading watchlist...</div>;
  }

  return <MovieGrid movieIDs={movieIDs} />;
}

export default Watchlist;
