import { OrderItem } from "./order-items";

export type Order = {
    id?: number,
    moment: string,
    orderStatus: string;
    clientId: number;
    items: OrderItem[];
    getTotal?: number;
}