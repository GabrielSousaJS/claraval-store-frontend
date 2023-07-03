import { AxiosRequestConfig } from "axios";
import { requestBackend } from "utils/requests";

export function findAll() {
  const config: AxiosRequestConfig = {
    url: "api/categories",
  };

  return requestBackend(config);
}

export function findById(id: number) {
  const config: AxiosRequestConfig = {
    url: `api/categories/${id}`,
  };

  return requestBackend(config);
}

export function deleteById(id: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `api/categories/${id}`,
    withCredentials: true,
  };

  return requestBackend(config);
}
