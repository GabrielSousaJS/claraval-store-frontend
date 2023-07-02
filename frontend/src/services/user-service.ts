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
