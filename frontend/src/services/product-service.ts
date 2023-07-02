import { AxiosRequestConfig } from "axios";
import { requestBackend } from "utils/requests";

export function findAll(productName: string) {
  const config: AxiosRequestConfig = {
    url: `api/products?name=${productName}`,
  };
  return requestBackend(config);
}

export function findProdutsByCategory(id: number, productName: string) {
  const config: AxiosRequestConfig = {
    url: `api/products/filtercategory/${id}?name=${productName}`,
  };

  return requestBackend(config);
}

export function deleteProductById(id: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `api/products/${id}`,
    // Adicionar credenciais
  };

  return requestBackend(config);
}
