import { AxiosRequestConfig } from "axios";
import { requestBackend } from "utils/requests";

export function findAll(productName: string) {
  const config: AxiosRequestConfig = {
    url: `api/products?name=${productName}`,
  };
  return requestBackend(config);
}

export function findById(id: number) {
  const config: AxiosRequestConfig = {
    url: `api/products/${id}`,
  };

  return requestBackend(config);
}

export function findProdutsByCategory(id: number, productName: string) {
  const config: AxiosRequestConfig = {
    url: `api/products/filtercategory/${id}?name=${productName}`,
  };

  return requestBackend(config);
}

export function updateProduct(id: number, data: any) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `api/products/${id}`,
    withCredentials: true,
    data
  };

  return requestBackend(config);
}

export function deleteProductById(id: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `api/products/${id}`,
    withCredentials: true,
  };

  return requestBackend(config);
}
