import { useState, useEffect, useCallback } from "react";
import { supabase } from "../services/supabase";
import { useAuth0 } from "@auth0/auth0-react";

export default function useMovieList(movieId) {
  const { user, getAccessTokenSilently } = useAuth0();
  const [watchedMovies, setWatchedMovies] = useState(new Set());
  const [watchlistMovies, setWatchlistMovies] = useState(new Set());
  const [loading, setLoading] = useState(true);

  // Set Auth0 JWT token for Supabase
  const setSupabaseAuth = useCallback(async () => {
    if (user) {
      try {
        const token = await getAccessTokenSilently();
        await supabase.auth.setSession({
          access_token: token,
          refresh_token: null,
        });
      } catch (error) {
        console.error("Error setting Supabase auth:", error);
      }
    }
  }, [user, getAccessTokenSilently]);

  // Fetch user's movie lists
  const fetchMovieLists = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      await setSupabaseAuth();

      const { data, error } = await supabase
        .from("movie_lists")
        .select("type, movie_id")
        .eq("user_id", user.sub);

      if (error) throw error;

      const watched = new Set();
      const watchlist = new Set();

      data.forEach((item) => {
        if (item.type === "watched") {
          watched.add(item.movie_id);
        } else if (item.type === "watchlist") {
          watchlist.add(item.movie_id);
        }
      });

      setWatchedMovies(watched);
      setWatchlistMovies(watchlist);
    } catch (error) {
      console.error("Error fetching movie lists:", error);
    } finally {
      setLoading(false);
    }
  }, [user, setSupabaseAuth]);

  useEffect(() => {
    fetchMovieLists();
  }, [fetchMovieLists]);

  const addToList = useCallback(
    async (movieId, type) => {
      if (!user) return;

      try {
        await setSupabaseAuth();

        const { error } = await supabase.from("movie_lists").insert({
          user_id: user.sub,
          type,
          movie_id: movieId.toString(),
        });

        if (error) throw error;

        // Update local state
        if (type === "watched") {
          setWatchedMovies((prev) => new Set([...prev, movieId.toString()]));
        } else if (type === "watchlist") {
          setWatchlistMovies((prev) => new Set([...prev, movieId.toString()]));
        }
      } catch (error) {
        console.error(`Error adding to ${type}:`, error);
      }
    },
    [user, setSupabaseAuth],
  );

  const removeFromList = useCallback(
    async (movieId, type) => {
      if (!user) return;

      try {
        await setSupabaseAuth();

        const { error } = await supabase
          .from("movie_lists")
          .delete()
          .eq("user_id", user.sub)
          .eq("type", type)
          .eq("movie_id", movieId.toString());

        if (error) throw error;

        // Update local state
        if (type === "watched") {
          setWatchedMovies((prev) => {
            const newSet = new Set(prev);
            newSet.delete(movieId.toString());
            return newSet;
          });
        } else if (type === "watchlist") {
          setWatchlistMovies((prev) => {
            const newSet = new Set(prev);
            newSet.delete(movieId.toString());
            return newSet;
          });
        }
      } catch (error) {
        console.error(`Error removing from ${type}:`, error);
      }
    },
    [user, setSupabaseAuth],
  );

  const handleToggleWatched = useCallback(async () => {
    if (!movieId) return;

    const movieIdStr = movieId.toString();
    const isWatched = watchedMovies.has(movieIdStr);
    const isInWatchlist = watchlistMovies.has(movieIdStr);

    if (isWatched) {
      await removeFromList(movieId, "watched");
    } else {
      await addToList(movieId, "watched");
      // If movie is in watchlist, remove it when marking as watched
      if (isInWatchlist) {
        await removeFromList(movieId, "watchlist");
      }
    }
  }, [movieId, watchedMovies, watchlistMovies, addToList, removeFromList]);

  const handleToggleWatchlist = useCallback(async () => {
    if (!movieId) return;

    const movieIdStr = movieId.toString();
    const isInWatchlist = watchlistMovies.has(movieIdStr);

    if (isInWatchlist) {
      await removeFromList(movieId, "watchlist");
    } else {
      await addToList(movieId, "watchlist");
    }
  }, [movieId, watchlistMovies, addToList, removeFromList]);

  return {
    hasWatched: () => watchedMovies.has(movieId?.toString() || ""),
    hasInWatchlist: () => watchlistMovies.has(movieId?.toString() || ""),
    handleToggleWatched,
    handleToggleWatchlist,
    loading,
    watchedMovies: Array.from(watchedMovies),
    watchlistMovies: Array.from(watchlistMovies),
  };
}
