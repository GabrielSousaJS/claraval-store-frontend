import { AxiosRequestConfig } from "axios";
import { Order } from "types/order";
import { OrderItem } from "types/order-items";
import { requestBackend } from "utils/requests";

export async function saveOrder(data: Order) {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "api/orders",
    data,
    withCredentials: true,
  };

  return await requestBackend(config);
}

export async function getOrdersFromClient() {
  const config: AxiosRequestConfig = {
    url: "api/orders",
    withCredentials: true,
  };

  return await requestBackend(config);
}

export async function getAllOrders() {
  const config: AxiosRequestConfig = {
    url: "api/orders/all-orders",
    withCredentials: true,
  };

  return await requestBackend(config);
}

export async function addItemToOrder(id: number, data: OrderItem) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `api/orders/${id}/add-item`,
    data,
    withCredentials: true,
  };

  return await requestBackend(config);
}

export async function updateItem(
  orderId: number,
  productId: number,
  quantity: number
) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `api/orders/${orderId}/update-item?productId=${productId}&quantity=${quantity}`,
    withCredentials: true,
  };

  return await requestBackend(config);
}

export async function deleteItem(orderId: number, productId: number) {
  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: `api/orders/delete-item?orderId=${orderId}&productId=${productId}`,
    withCredentials: true,
  };

  return await requestBackend(config);
}

export async function finalizeOrder(id: number, data: any) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `api/orders/${id}/payment`,
    data,
    withCredentials: true,
  };

  return await requestBackend(config);
}

export async function updateOrderStatus(id: number, status: string) {
  const config: AxiosRequestConfig = {
    method: "PUT",
    url: `/api/orders/${id}/status?orderStatus=${status}`,
    withCredentials: true,
  };

  return await requestBackend(config);
}
