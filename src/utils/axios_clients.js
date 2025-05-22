/* eslint-disable no-undef */
import axios from "axios";

// Base URL from environment variables
const BASE_URL_SERVER = process.env.STRAPI_BE_URL_SERVER || "";
const BASE_URL_CLIENT = process.env.NEXT_PUBLIC_STRAPI_BE_URL_CLIENT || "";

// Server-side Axios instance
export const serverAxios = axios.create({
  baseURL: BASE_URL_SERVER,
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_ACCESS_TOKEN || ""}`,
    "x-server-security-key": process.env.SERVER_SECURITY_KEY || "",
    "x-server-request": process.env.SERVER_REQUEST_SIGNATURE || "",
    "Content-Type": "application/json",
  },
  cache: "no-cache",
  //   timeout: 30000, // 30 seconds timeout
});

// Client-side Axios instance
export const clientAxios = axios.create({
  baseURL: BASE_URL_CLIENT,
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_POST_TOKEN || ""}`,
    "x-client-request": process.env.NEXT_PUBLIC_CLIENT_REQUEST_SIGNATURE || "",
    "x-client-security-key": process.env.NEXT_PUBLIC_CLIENT_SECURITY_KEY || "",
    "Content-Type": "application/json",
  },
  //   timeout: 30000, // 30 seconds timeout
});

// Add request interceptor for additional security measures
serverAxios.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent replay attacks
    config.headers["x-request-timestamp"] = Date.now().toString();
    return config;
  },
  (error) => Promise.reject(error)
);

clientAxios.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent replay attacks
    config.headers["x-request-timestamp"] = Date.now().toString();
    return config;
  },
  (error) => Promise.reject(error)
);

const responseInterceptor = (response) => {
  return response;
};

const errorInterceptor = (error) => {
  console.error("API Request Error:", error.message);

  // Handle specific error cases
  if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
  } else if (error.request) {
    // The request was made but no response was received
    console.error("No response received:", error.request);
  }

  return Promise.reject(error);
};

serverAxios.interceptors.response.use(
  (response) => {
    // Ensure data structure is consistent
    if (!response.data) {
      response.data = { data: [] };
    } else if (!response.data.data && !Array.isArray(response.data)) {
      response.data = { data: [] };
    }
    return response;
  },
  (error) => {
    console.error("API Request Error:", error.message || "Unknown error");
    // Return a consistent error response
    return Promise.reject(error);
  }
);
clientAxios.interceptors.response.use(responseInterceptor, errorInterceptor);

export const createFormDataConfig = (token, isServer = false) => {
  const headers = {
    Authorization: `Bearer ${token || ""}`,
    "Content-Type": "multipart/form-data",
  };

  if (isServer) {
    headers["x-server-security-key"] = process.env.SERVER_SECURITY_KEY || "";
    headers["x-server-request"] = process.env.SERVER_REQUEST_SIGNATURE || "";
  } else {
    headers["x-client-request"] = process.env.CLIENT_REQUEST_SIGNATURE || "";
    headers["x-client-security-key"] = process.env.CLIENT_SECURITY_KEY || "";
  }

  return { headers };
};
