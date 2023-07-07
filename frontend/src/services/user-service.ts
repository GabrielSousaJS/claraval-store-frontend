import { AxiosRequestConfig } from "axios";
import { requestBackend } from "utils/requests";

export function insertUser(data: any) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "api/users",
    data,
  };

  return requestBackend(config);
}

export function getById(id: number) {
  const config: AxiosRequestConfig = {
    url: `api/users/${id}`,
    withCredentials: true,
  };

  return requestBackend(config);
}