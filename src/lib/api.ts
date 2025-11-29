import { Storage } from "@/constants";
import { IToken } from "@/types";
import { getStorage, setStorage } from "@/utils/storage";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
});

const refreshTokenApi = (refreshToken: string) =>
  axios.post(
    `${BASE_URL}/auth/refresh`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

const onResponseSuccess = (response: AxiosResponse) => {
  return response.data;
};

const onResponseError = async (error: AxiosError) => {
  if (error.response) {
    return Promise.reject(error.response);
  }
  return Promise.reject(error);
};

api.interceptors.response.use(onResponseSuccess, onResponseError);

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getStorage<IToken>(Storage.token);
    if (token) {
      config.headers.Authorization = `Bearer ${token.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    originalRequest._retry = true;
    if (error.status === 401) {
      const token = getStorage<IToken>(Storage.token);
      const refreshToken = token?.refresh_token;
      if (refreshToken) {
        const { data } = await refreshTokenApi(refreshToken);
        const { access_token, refresh_token } = data;
        setStorage(Storage.token, { access_token, refresh_token });
        originalRequest.headers = {
          Authorization: "Bearer " + access_token,
        };
        originalRequest._retry = false;
        return api(originalRequest);
      }
    }
    return Promise.reject(error?.data);
  }
);
