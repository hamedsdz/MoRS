import { useState, useCallback } from "react";
// redux
import { useDispatch } from "react-redux";
import { LOGIN } from "store/names";
// locale
import { translateText } from "components/translate";
// api
import AxiosInstance from "../instance";
// components
import { message } from "antd";

export default function useLoginUser(next) {
  const dispatch = useDispatch();
  const [data, setData] = useState({ data: null, error: null, loading: false });

  const apiCall = useCallback((body) => {
    if (!body) return;

    setData({ ...data, loading: true });

    AxiosInstance.post("/api/auth/login", body)
      .then((res) => {
        setData({ data: res.data, error: null, loading: false });
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        if (next) next();
      })
      .catch((err) => {
        setData({ data: null, error: err, loading: false });
        err.response.data.errors.map((code) => message.error(translateText(code.msg)));
      });
  }, []); // eslint-disable-line

  return [data, apiCall];
}
