import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";
import { getAuthData } from "./storage";

export function requestBackend(config: AxiosRequestConfig) {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: `Bearer ${getAuthData().access_token}`,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
}
