import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { parseCookies, setCookie } from "nookies";
const baseURL = process.env.REACT_APP_API_URL;

export const setUpApiClient = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseURL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const cookies = parseCookies();
      const token = cookies.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response && !originalRequest._retry) {
        originalRequest._retry = true;
        const newToken = await refreshAuthToken();

        if (newToken) {
          setCookie(null, "token", newToken, {
            maxAge: 30 * 24 * 60 * 60, // Set cookie expiration (30 days in this example)
            path: "/",
          });
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      }

      return Promise.reject(error);
    }
  );

  const jsonService = axiosInstance;
  const formDataService = axiosInstance;
  formDataService.defaults.headers.common["Content-Type"] =
    "multipart/form-data";

  return { jsonService, formDataService };
};

async function refreshAuthToken(): Promise<string> {
  const cookies = parseCookies();
  const token = cookies.token;

  return token;
}
