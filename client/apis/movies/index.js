import AxiosInstance from "apis/instance";

import useGetMovies from "./get";
import useSearchMovies from "./search";
import useGetPopularMovies from "./getPopular";
import useGetRandomMovies from "./getRandom";
import useGetRecommendation from "./getRecommendation";

const getMovies = ({ search, limit, page }) =>
  AxiosInstance.get("/api/movies", { search, limit, page }).then(({ data }) => data);

const getPopularMovies = () =>
  AxiosInstance.get("/api/movies/all/popular").then(({ data }) => data);

const getRandomMovies = () => AxiosInstance.get("/api/movies/all/random").then(({ data }) => data);

const getRecommendation = () =>
  AxiosInstance.get("/api/movies/recommendation/list").then(({ data }) => data);

export {
  getMovies,
  getPopularMovies,
  getRandomMovies,
  getRecommendation,
  useGetMovies,
  useSearchMovies,
  useGetPopularMovies,
  useGetRandomMovies,
  useGetRecommendation,
};
