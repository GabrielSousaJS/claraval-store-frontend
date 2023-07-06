import "./styles.css";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useEffect, useState } from "react";
import { Order } from "types/order";
import * as orderService from "../../services/order-service";
import { hasClosedOrders } from "utils/orders";
import { useNavigate } from "react-router-dom";
import OrderItem from "./OrderItem";
import IdetificationColumn from "./IdentificationColumn";

export default function OrderHistory() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Array<Order>>();

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    const response = await orderService.getOrdersFromClient();
    let orders: Array<Order> = response.data;
    const closedOrders = hasClosedOrders(orders);
    setOrders(closedOrders);
  }

  function handleToGoBack() {
    navigate("/orders");
  }

  function hasOrders(): boolean {
    if (orders) {
      return orders.length > 0;
    }

    return false;
  }

  function ignored() {}

  return (
    <>
      <Navbar onSearch={ignored}></Navbar>
      {hasOrders() ? (<div className="history-card-container">
        <div className="history-top-container d-flex justify-content-between">
           <h1>Meus pedidos</h1>
          <button className="btn btn-secondary" onClick={handleToGoBack}>
            Voltar
          </button>
        </div>

        <IdetificationColumn />

        <div className="row">
          <div className="col-12 order-item">
            {orders?.map((item) => (
              <OrderItem order={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>) : (
        <div className="history-card-container">
          <div className="history-top-container d-flex justify-content-between">
           <h1>Histórico vazio</h1>
          <button className="btn btn-secondary" onClick={handleToGoBack}>
            Voltar
          </button>
        </div>
        </div>
      )} 
      <Footer />
    </>
  );
}
