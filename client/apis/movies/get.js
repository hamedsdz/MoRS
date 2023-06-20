import { useQuery } from "@tanstack/react-query";
import { getMovies } from "./index";

export default function useGetMovies({ page, search, limit }) {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["getMovies", { page, search, limit }],
    () => getMovies({ page, search, limit }),
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
