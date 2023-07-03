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

export function insert(id: number, data: any) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: `url/categories/${id}`,
    data,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function update(id: number, data: any) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `api/categories/${id}`,
    data,
    withCredentials: true,
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
