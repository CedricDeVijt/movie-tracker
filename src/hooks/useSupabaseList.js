import { useState, useEffect, useCallback } from "react";
import { supabase } from "../services/supabase";
import { useAuth0 } from "@auth0/auth0-react";

export default function useSupabaseList(listType) {
  const { user, getAccessTokenSilently } = useAuth0();
  const [movieIds, setMovieIds] = useState([]);
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

  // Fetch movies for specific list type
  const fetchMovies = useCallback(async () => {
    if (!user) {
      setMovieIds([]);
      setLoading(false);
      return;
    }

    try {
      await setSupabaseAuth();

      const { data, error } = await supabase
        .from("movie_lists")
        .select("movie_id, created_at")
        .eq("user_id", user.sub)
        .eq("type", listType)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setMovieIds(data.map((item) => item.movie_id));
    } catch (error) {
      console.error(`Error fetching ${listType} movies:`, error);
      setMovieIds([]);
    } finally {
      setLoading(false);
    }
  }, [user, listType, setSupabaseAuth]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const add = useCallback(
    async (movieId) => {
      if (!user || !movieId) return;

      try {
        await setSupabaseAuth();

        // Check if already exists
        const { data: existing } = await supabase
          .from("movie_lists")
          .select("id")
          .eq("user_id", user.sub)
          .eq("type", listType)
          .eq("movie_id", movieId.toString())
          .single();

        if (existing) return; // Already exists

        const { error } = await supabase.from("movie_lists").insert({
          user_id: user.sub,
          type: listType,
          movie_id: movieId.toString(),
        });

        if (error) throw error;

        // Add to local state
        setMovieIds((prev) => [movieId.toString(), ...prev]);
      } catch (error) {
        console.error(`Error adding to ${listType}:`, error);
      }
    },
    [user, listType, setSupabaseAuth],
  );

  const remove = useCallback(
    async (movieId) => {
      if (!user || !movieId) return;

      try {
        await setSupabaseAuth();

        const { error } = await supabase
          .from("movie_lists")
          .delete()
          .eq("user_id", user.sub)
          .eq("type", listType)
          .eq("movie_id", movieId.toString());

        if (error) throw error;

        // Remove from local state
        setMovieIds((prev) => prev.filter((id) => id !== movieId.toString()));
      } catch (error) {
        console.error(`Error removing from ${listType}:`, error);
      }
    },
    [user, listType, setSupabaseAuth],
  );

  const toggle = useCallback(
    async (movieId) => {
      if (!movieId) return;

      const movieIdStr = movieId.toString();
      if (movieIds.includes(movieIdStr)) {
        await remove(movieId);
      } else {
        await add(movieId);
      }
    },
    [movieIds, add, remove],
  );

  const has = useCallback(
    (movieId) => {
      if (!movieId) return false;
      return movieIds.includes(movieId.toString());
    },
    [movieIds],
  );

  const clear = useCallback(async () => {
    if (!user) return;

    try {
      await setSupabaseAuth();

      const { error } = await supabase
        .from("movie_lists")
        .delete()
        .eq("user_id", user.sub)
        .eq("type", listType);

      if (error) throw error;

      setMovieIds([]);
    } catch (error) {
      console.error(`Error clearing ${listType}:`, error);
    }
  }, [user, listType, setSupabaseAuth]);

  return {
    list: movieIds,
    add,
    remove,
    toggle,
    has,
    clear,
    loading,
    refetch: fetchMovies,
  };
}
