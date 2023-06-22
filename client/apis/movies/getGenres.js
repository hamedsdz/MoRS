import { useQuery } from "@tanstack/react-query";
import { getMovieGenres } from "./index";

export default function useGetMovieGenres() {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["getMovieGenres"],
    () => getMovieGenres(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  if (isLoading) return { data: null, error: null, loading: true, refetch };

  if (isError) return { data: null, error: error, loading: false };

  return { data: data, error: null, loading: false, refetch };
}
