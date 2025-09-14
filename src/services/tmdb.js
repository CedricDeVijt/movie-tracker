import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (query) => {
  if (!API_KEY) {
    console.log("API key not found");
  }

  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query.replace(" ", "%")}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );
  return response.data.results;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};

export const getPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data.results;
};

export const getTopRatedMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data.results;
};

export const getUpcomingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data.results;
};
