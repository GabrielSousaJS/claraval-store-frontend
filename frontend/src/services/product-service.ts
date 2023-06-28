import { AxiosRequestConfig } from "axios";
import { requestBackend } from "utils/requests";

export function findAll(productName: string) {

  const config: AxiosRequestConfig = {
    url: `api/products?name=${productName}`
  }
  return requestBackend(config);
}

export function findProdutsByCategory(id: number) {

  const config: AxiosRequestConfig = {
    url: `api/products/filtercategory/${id}`
  }

  return requestBackend(config);
}