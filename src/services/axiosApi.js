import axios from "axios";
import { getStoredAuthToken, setStoredAuthToken } from "../utils/authToken";
import authServices from "./authServices";

const axiosApi = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token on refresh
axiosApi.interceptors.request.use(function (config) {
  const token = getStoredAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token after expire
axiosApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("api/auth/author/refresh")
    ) {
      originalRequest._retry = true;
      try {
        const { accessToken: newToken } = await authServices.refreshToken(
          "api/auth/refresh",
          {},
        );
        setStoredAuthToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosApi(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosApi;
