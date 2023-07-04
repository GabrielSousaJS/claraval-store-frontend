import { AxiosRequestConfig } from "axios";
import qs from "qs";
import { Credentials } from "types/credentials";
import { requestBackend } from "utils/requests";
import { CLIENT_ID, CLIENT_SECRET } from "utils/system";

export function loginRequest(loginData: Credentials) {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: "password",
  });

  const config: AxiosRequestConfig = {
    method: "POST",
    url: "oauth/token",
    data,
    headers,
  };

  return requestBackend(config);
}
