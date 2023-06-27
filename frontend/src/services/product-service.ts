import axios from "axios";
import { BASE_URL } from "utils/system";

export function findAll(productName: string) {
  return axios.get(`${BASE_URL}api/products?name=${productName}`);
}

export function findProdutsByCategory(id: number) {
  return axios.get(`${BASE_URL}api/products/filtercategory/${id}`);
}