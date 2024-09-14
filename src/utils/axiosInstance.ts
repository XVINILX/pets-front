import { notification } from "antd";
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
      console.error("Request Error: ", error);
      notification.error({
        message: "Request Failed",
        description: "An error occurred while sending the request.",
      });
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      console.error("Request Error: ", error);
      notification.error({
        message: "Request Failed",
        description: "An error occurred while sending the request.",
      });
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const axiosInstanceReturn = () => {
  const jsonService = setUpApiClient();
  const formDataService = setUpApiClient();
  formDataService.defaults.headers.common["Content-Type"] =
    "multipart/form-data";

  return { jsonService, formDataService };
};

async function refreshAuthToken(): Promise<string> {
  const cookies = parseCookies();
  const token = cookies.token;

  return token;
}
