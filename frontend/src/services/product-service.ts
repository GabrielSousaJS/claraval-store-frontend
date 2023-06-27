import axios, { AxiosRequestConfig } from "axios";
import { requestBackend } from "utils/requests";
import { BASE_URL } from "utils/system";

export function findAll(productName: string) {

  const config: AxiosRequestConfig = {
    url: `api/products?${productName}`
  }
  return requestBackend(config);
}

export function findProdutsByCategory(id: number) {

  const config: AxiosRequestConfig = {
    url: `api/products/filtercategory/${id}`
  }

  return requestBackend(config);
}