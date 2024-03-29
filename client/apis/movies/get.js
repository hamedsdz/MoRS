import { useQuery } from "@tanstack/react-query";
import { getMovies } from "./index";

export default function useGetMovies({ page, search, limit, genre, country }) {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["getMovies", { page, search, limit, genre, country }],
    () => getMovies({ page, search, limit, genre, country }),
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
