import { OrderItem } from "./order-items";
import { Payment } from "./payment";

export type Order = {
    id?: number,
    moment: string,
    orderStatus: string;
    clientId: number;
    items: OrderItem[];
    getTotal?: number;
    payment?: Payment;
}