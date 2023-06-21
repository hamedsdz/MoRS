import { useState, useCallback } from "react";
// locale
import { translateText } from "components/translate";
// api
import AxiosInstance from "../instance";
// components
import { message } from "antd";

export default function useSearchMovies(next) {
  const [data, setData] = useState({ data: null, error: null, loading: false });

  const apiCall = useCallback((body) => {
    if (!body) return;

    setData({ ...data, loading: true });

    AxiosInstance.get(
      `/api/movies/all/search?title=${body?.search}&page=${body?.page}&limit=${body?.limit}`
    )
      .then((res) => {
        setData({ data: res.data, error: null, loading: false });
        if (next) next();
      })
      .catch((err) => {
        setData({ data: null, error: err, loading: false });
        err.response.data.errors.map((code) => message.error(translateText(code.msg)));
      });
  }, []); // eslint-disable-line

  return [data, apiCall];
}
