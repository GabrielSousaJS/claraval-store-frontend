import { AxiosRequestConfig } from "axios";
import { requestBackend } from "utils/requests";

export async function insertUser(data: any) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "api/users",
    data,
  };

  return await requestBackend(config);
}

export async function insertAdmin(data: any) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "api/users/admin",
    data,
    withCredentials: true,
  };

  return await requestBackend(config);
}

export async function getAllUsers() {
  const config: AxiosRequestConfig = {
    url: "api/users",
    withCredentials: true,
  };

  return await requestBackend(config);
}

export async function getById(id: number) {
  const config: AxiosRequestConfig = {
    url: `api/users/${id}`,
    withCredentials: true,
  };

  return await requestBackend(config);
}
