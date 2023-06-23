import { useQuery } from "@tanstack/react-query";
import { getSingleMovie } from "./index";

export default function useGetSingleMovie(id) {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["getSingleMovie", id],
    () => getSingleMovie(id),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: !!id,
      retry: 0,
    }
  );

  if (isLoading) return { data: null, error: null, loading: true, refetch };

  if (isError) return { data: null, error: error, loading: false };

  return { data: data, error: null, loading: false, refetch };
}
