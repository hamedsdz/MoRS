import { useRouter } from "next/router";
import { useEffect } from "react";
// redux
import { useDispatch } from "react-redux";
// api
import AxiosInstance from "apis/instance";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// locale
import fa_IR from "antd/lib/locale/fa_IR";
// ant
import { ConfigProvider } from "antd";

const queryClient = new QueryClient();

export default function MORS({ Component, ...pageProps }) {
  const GetLayout = Component.getLayout || ((page) => page);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    AxiosInstance.interceptors.response.use((res) => {
      if (res.status === 403 || res.status === 401) dispatch({ type: LOGOUT });
      else if (res.status === 500) return router.replace("/500");
      else if (res.status === 404) return router.replace("/404");

      return res;
    });
  }, []); // eslint-disable-line

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={fa_IR} direction="rtl">
        {GetLayout(<Component {...pageProps} />)}
      </ConfigProvider>
    </QueryClientProvider>
  );
}
