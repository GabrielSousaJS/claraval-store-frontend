import { AxiosRequestConfig } from "axios";
import { Order } from "types/order";
import { OrderItem } from "types/order-items";
import { requestBackend } from "utils/requests";

export function saveOrder(data: Order) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "api/orders",
    data,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function getOrdersFromClient() {
  const config: AxiosRequestConfig = {
    url: "api/orders",
    withCredentials: true,
  };

  return requestBackend(config);
}

export function addItemToOrder(id: number, data: OrderItem) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `api/orders/${id}/add-item`,
    data,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function updateItem(
  orderId: number,
  productId: number,
  quantity: number
) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `api/orders/${orderId}/update-item?productId=${productId}&quantity=${quantity}`,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function deleteItem(orderId: number, productId: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `api/orders/delete-item?orderId=${orderId}&productId=${productId}`,
    withCredentials: true,
  };

  return requestBackend(config);
}

export function deleteOrder(id: number) {
    const config: AxiosRequestConfig = {
        method: "DELETE",
        url: `api/orders/${id}`,
        withCredentials: true,
    }

    return requestBackend(config);
}