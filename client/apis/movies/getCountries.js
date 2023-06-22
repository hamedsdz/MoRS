import { useQuery } from "@tanstack/react-query";
import { getMovieCountries } from "./index";

export default function useGetMovieCountries() {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["getMovieCountries"],
    () => getMovieCountries(),
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
