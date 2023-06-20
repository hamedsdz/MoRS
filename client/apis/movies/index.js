import AxiosInstance from "apis/instance";

import useGetMovies from "./get";
import useSearchMovies from "./search";

const getMovies = ({ search, limit, page }) =>
  AxiosInstance.get("/api/movies", { search, limit, page }).then(({ data }) => data);

export { getMovies, useGetMovies, useSearchMovies };
