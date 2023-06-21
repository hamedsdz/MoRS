import { useQuery } from "@tanstack/react-query";
import { getRecommendation } from "./index";

export default function useGetRecommendation() {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["getRecommendation"],
    () => getRecommendation(),
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
