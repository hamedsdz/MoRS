import { useMutation, useQueryClient } from "@tanstack/react-query";
// locale
import { translateText } from "components/translate";
// api
import AxiosInstance from "../instance";
// components
import { message } from "antd";

export default function useRatingMovie({ key, id }) {
  const queryClient = useQueryClient();

  const { isError, error, mutate, isLoading } = useMutation(
    (body) => {
      if (!body && !!body?.rate) return;

      return AxiosInstance.post(`/api/ratings`, body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([key, id]);
      },
    }
  );

  if (isError) return message.error(translateText(error));

  return { mutate, loading: isLoading };
}
