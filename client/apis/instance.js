import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const AxiosInstance = axios.create({
  baseURL: publicRuntimeConfig.backendUrl,
  headers: {
    "Content-type": "application/json",
  },
});

export default AxiosInstance;
