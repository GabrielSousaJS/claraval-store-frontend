import { Order } from "types/order";
import { OrderItem } from "types/order-items";
import { Product } from "types/product";
import { getAuthData } from "./storage";

export const hasOpenOrder = (orders: Array<Order>) => {
  let openOrder = orders.find(
    (order) => order.orderStatus === "WAITING_PAYMENT"
  );
  return openOrder;
};

export const createOrderItem = (
  order: Order,
  product: Product,
  quantity: number
) => {
  let item: OrderItem = {
    orderId: order.id,
    product,
    quantity,
  };

  return item;
};

export const createNewOrderItem = (product: Product, quantity: number) => {
  let item: OrderItem = {
    product,
    quantity,
  };

  return item;
};

export const createOrder = (items: Array<OrderItem>) => {
  let order = {
    moment: String(new Date().toISOString()),
    orderStatus: "WAITING_PAYMENT",
    clientId: getAuthData().userId,
    items,
  };

  return order;
};
