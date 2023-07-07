import "./styles.css";

import * as orderService from "../../../services/order-service";
import { Order } from "types/order";
import { useEffect, useState } from "react";
import { hasClosedOrders } from "utils/orders";
import OrderCard from "./OrderCard";
import IdentificationInfo from "./IdentificationInfo";

export default function Orders() {
  const [orders, setOrders] = useState<Array<Order>>();

  useEffect(() => {
    getAllOrders();
  }, []);

  async function getAllOrders() {
    await orderService.getAllOrders().then((response) => {
      const list = response.data;
      const closedOrders = hasClosedOrders(list);
      setOrders(closedOrders);
    });
  }

  return (
    <div className="order-crud-container">
      <div className="order-crud-bar-container">
        <div className="order-crud-title">
          <h4>Lista de pedidos</h4>
        </div>
      </div>
      <IdentificationInfo />
      <div className="row">
        {orders?.map((order) => (
          <div className="col-12" key={order.id}>
            <OrderCard order={order} />
          </div>
        ))}
      </div>
    </div>
  );
}
