import AxiosInstance from "apis/instance";

import useGetMovies from "./get";
import useSearchMovies from "./search";
import useGetPopularMovies from "./getPopular";
import useGetRandomMovies from "./getRandom";
import useGetRecommendation from "./getRecommendation";
import useGetMovieGenres from "./getGenres";
import useGetMovieCountries from "./getCountries";
import useGetSingleMovie from "./single";
import useRatingMovie from "./rating";

const getMovies = ({ search, limit, page, genre, country }) =>
  AxiosInstance.get("/api/movies", { params: { search, limit, page, genre, country } }).then(
    ({ data }) => data
  );

const getPopularMovies = () =>
  AxiosInstance.get("/api/movies/all/popular").then(({ data }) => data);

const getRandomMovies = () => AxiosInstance.get("/api/movies/all/random").then(({ data }) => data);

const getRecommendation = () =>
  AxiosInstance.get("/api/movies/recommendation/list").then(({ data }) => data);

const getMovieGenres = () => AxiosInstance.get("/api/movies/all/genres").then(({ data }) => data);

const getMovieCountries = () =>
  AxiosInstance.get("/api/movies/all/countries").then(({ data }) => data);

const getSingleMovie = (id) => AxiosInstance.get(`/api/movies/${id}`).then(({ data }) => data);

export {
  getMovies,
  getPopularMovies,
  getRandomMovies,
  getRecommendation,
  getMovieGenres,
  getMovieCountries,
  getSingleMovie,
  useGetMovies,
  useSearchMovies,
  useGetPopularMovies,
  useGetRandomMovies,
  useGetRecommendation,
  useGetMovieGenres,
  useGetMovieCountries,
  useGetSingleMovie,
  useRatingMovie,
};
